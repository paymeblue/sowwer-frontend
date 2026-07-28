// Minimal Resend client (no SDK dependency), matching the shape of the other
// integrations in this folder.
//
// Resend's batch endpoint would be faster, but it does not support attachments,
// so a bulk send is a sequential loop over the single-send endpoint. That also
// keeps recipients from seeing each other's addresses.

import {
  EMAIL_LOGO_BASE64,
  EMAIL_LOGO_CID,
  EMAIL_LOGO_FILENAME,
} from "./emailAssets";

export interface ResendAttachment {
  filename: string;
  base64: string;
}

export interface SendBulkArgs {
  recipients: string[];
  subject: string;
  html: string;
  text: string;
  attachment: ResendAttachment;
}

export interface BulkSendResult {
  sent: string[];
  failed: { email: string; error: string }[];
}

const RESEND_URL = "https://api.resend.com/emails";

// Resend allows 10 requests/second per team; pace well under it.
export const SEND_INTERVAL_MS = 150;

const apiKey = () =>
  process.env.RESEND_APIKEY || process.env.RESEND_API_KEY || "";

// Must be an address on a domain verified in the Resend dashboard.
const fromEmail = () =>
  process.env.RESEND_FROM || process.env.MAIL_FROM_ADDRESS || "";

const fromName = () => process.env.MAIL_FROM_NAME || "Soower";

const from = () => `${fromName()} <${fromEmail()}>`;

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export const isResendConfigured = () => !!apiKey() && !!fromEmail();

export const resendConfigHint = () => {
  if (!apiKey()) return "RESEND_APIKEY is not set.";
  return "RESEND_FROM is not set. It must be an address on a domain verified in the Resend dashboard.";
};

const sendOne = async (
  email: string,
  { subject, html, text, attachment }: Omit<SendBulkArgs, "recipients">
): Promise<void> => {
  const res = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: from(),
      to: [email],
      subject,
      // Both parts are sent so the admin's copy renders in HTML clients and
      // still reads correctly in plain-text ones.
      html,
      text,
      attachments: [
        {
          filename: attachment.filename,
          content: attachment.base64,
          content_type: "application/pdf",
        },
        // The logo rides along as an inline part referenced by cid: in the HTML.
        // Clients that hide it (or strip images entirely) fall back to the
        // wordmark's alt text, so the header never renders empty.
        {
          filename: EMAIL_LOGO_FILENAME,
          content: EMAIL_LOGO_BASE64,
          content_type: "image/png",
          content_id: EMAIL_LOGO_CID,
        },
      ],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(friendlyResendError(res.status, detail));
  }
};

export async function sendBulkViaResend({
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

const friendlyResendError = (status: number, detail: string): string => {
  const lower = detail.toLowerCase();
  if (
    lower.includes("domain is not verified") ||
    lower.includes("verify a domain")
  ) {
    return `The domain for ${fromEmail()} is not verified in Resend. Add and verify it at https://resend.com/domains before sending to donors.`;
  }
  if (lower.includes("testing emails to your own email")) {
    return "Resend is in testing mode: with no verified domain you can only email the account owner. Verify a domain to reach donors.";
  }
  if (status === 401 || status === 403) {
    return "Resend rejected the API key (invalid, revoked, or lacking send permission). Check RESEND_APIKEY.";
  }
  if (status === 413 || lower.includes("too large")) {
    return "The email exceeded Resend's 40MB limit. Use a smaller PDF.";
  }
  if (status === 429) {
    return "Resend rate limit hit. Wait a moment and retry the failed recipients.";
  }
  return `Resend responded ${status}${detail ? `: ${detail}` : ""}`;
};
