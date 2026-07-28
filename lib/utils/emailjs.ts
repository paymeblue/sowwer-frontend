// Minimal EmailJS REST client (no SDK dependency). Server-only: the private key
// below must never reach the browser bundle, so this module is imported solely
// from the /api/bulk-email route handler.
//
// EmailJS sends one email per request, so a bulk send is a sequential loop. The
// API allows 1 request per second — SEND_INTERVAL_MS paces the loop to stay
// under that.

export interface EmailjsAttachment {
  filename: string;
  base64: string;
}

export interface SendBulkArgs {
  recipients: string[];
  subject: string;
  html: string;
  text: string;
  attachment: EmailjsAttachment;
}

export interface BulkSendResult {
  sent: string[];
  failed: { email: string; error: string }[];
}

const EMAILJS_URL = "https://api.emailjs.com/api/v1.0/email/send";

// Credentials, hardcoded intentionally. The public key is safe to expose; the
// private key is not, which is why it lives here rather than in the component.
const PUBLIC_KEY = "72B-NTrFjuqKEE_ph";
const PRIVATE_KEY = "GIh8EVHoxHtgTkn2e76oJ";

// From the EmailJS dashboard. "default_service" resolves to whichever service
// the account has marked as its default.
const SERVICE_ID = process.env.EMAILJS_SERVICE_ID || "default_service";
const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID || "";

// Must match the "Variable Attachment" parameter name configured on that
// template (Template editor -> Attachments -> Variable Attachment).
const ATTACHMENT_PARAM = process.env.EMAILJS_ATTACHMENT_PARAM || "attachment";

// EmailJS caps at 1 request/second; a little headroom avoids 429s.
const SEND_INTERVAL_MS = 1100;

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export const isEmailjsConfigured = () => !!TEMPLATE_ID;

export const emailjsConfigHint =
  "EmailJS template ID is not set. Add EMAILJS_TEMPLATE_ID (and EMAILJS_SERVICE_ID if the account has no default service) from the EmailJS dashboard.";

const sendOne = async (
  email: string,
  { subject, html, text, attachment }: Omit<SendBulkArgs, "recipients">
): Promise<void> => {
  const res = await fetch(EMAILJS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: PUBLIC_KEY,
      accessToken: PRIVATE_KEY,
      template_params: {
        to_email: email,
        subject,
        message: text,
        message_html: html,
        from_name: "Soower",
        attachment_name: attachment.filename,
        // Variable attachments are passed as a base64 data URL.
        [ATTACHMENT_PARAM]: `data:application/pdf;base64,${attachment.base64}`,
      },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(friendlyEmailjsError(res.status, detail));
  }
};

export async function sendBulkViaEmailjs({
  recipients,
  ...content
}: SendBulkArgs): Promise<BulkSendResult> {
  const result: BulkSendResult = { sent: [], failed: [] };

  for (let i = 0; i < recipients.length; i += 1) {
    const email = recipients[i];
    try {
      await sendOne(email, content);
      result.sent.push(email);
    } catch (err) {
      result.failed.push({
        email,
        error: err instanceof Error ? err.message : "Send failed",
      });
    }
    if (i < recipients.length - 1) await wait(SEND_INTERVAL_MS);
  }

  return result;
}

const friendlyEmailjsError = (status: number, detail: string): string => {
  const lower = detail.toLowerCase();
  if (lower.includes("non-browser applications")) {
    return "EmailJS blocks server-side calls by default. Enable 'Allow EmailJS API for non-browser applications' under Account -> Security.";
  }
  if (lower.includes("public key") || lower.includes("user_id")) {
    return "EmailJS rejected the public key. Check the key in lib/utils/emailjs.ts.";
  }
  if (lower.includes("private key") || lower.includes("access token")) {
    return "EmailJS rejected the private key. Check the key in lib/utils/emailjs.ts.";
  }
  if (lower.includes("template") && lower.includes("not found")) {
    return `EmailJS template '${TEMPLATE_ID}' was not found. Check EMAILJS_TEMPLATE_ID.`;
  }
  if (lower.includes("service") && lower.includes("not found")) {
    return `EmailJS service '${SERVICE_ID}' was not found. Check EMAILJS_SERVICE_ID.`;
  }
  if (status === 429 || lower.includes("limit")) {
    return "EmailJS rate or monthly quota limit reached. Wait, or upgrade the plan.";
  }
  return `EmailJS responded ${status}${detail ? `: ${detail}` : ""}`;
};
