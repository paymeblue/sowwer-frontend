// Minimal SendGrid v3 "mail/send" client (no SDK dependency).
//
// Unlike a per-recipient loop, SendGrid takes up to 1000 personalizations in a
// single request and fans them out itself, so a whole donor list goes out in
// one or two calls. Each recipient gets its own personalization, so nobody sees
// anyone else's address, and the PDF is uploaded once per request rather than
// once per recipient.

import {
  EMAIL_LOGO_BASE64,
  EMAIL_LOGO_CID,
  EMAIL_LOGO_FILENAME,
} from "./emailAssets";

export interface SendgridAttachment {
  filename: string;
  base64: string;
}

export interface SendBulkArgs {
  recipients: string[];
  subject: string;
  html: string;
  text: string;
  // Omitted in link mode, where the PDF is referenced by URL in the body.
  attachment?: SendgridAttachment;
}

export interface BulkSendResult {
  sent: string[];
  failed: { email: string; error: string }[];
}

const SENDGRID_URL = "https://api.sendgrid.com/v3/mail/send";

// SendGrid's hard ceiling is 1000 personalizations per request; stay clear of it.
const CHUNK_SIZE = 500;

const apiKey = () =>
  process.env.SENDGRID_APIKEY || process.env.SENDGRID_API_KEY || "";

// Must be a verified single sender, or any address on an authenticated domain.
const fromEmail = () =>
  process.env.MAIL_FROM_ADDRESS || process.env.SENDGRID_FROM_EMAIL || "";

const fromName = () => process.env.MAIL_FROM_NAME || "Soower";

export const isSendgridConfigured = () => !!apiKey() && !!fromEmail();

export const sendgridConfigHint = () => {
  if (!apiKey()) return "SENDGRID_APIKEY is not set.";
  return "MAIL_FROM_ADDRESS is not set. It must be a verified sender in SendGrid, or an address on an authenticated domain.";
};

const chunk = <T>(items: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size)
    out.push(items.slice(i, i + size));
  return out;
};

const sendChunk = async (
  recipients: string[],
  { subject, html, text, attachment }: Omit<SendBulkArgs, "recipients">
): Promise<void> => {
  const res = await fetch(SENDGRID_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: recipients.map((email) => ({ to: [{ email }] })),
      from: { email: fromEmail(), name: fromName() },
      subject,
      // SendGrid requires text/plain to precede text/html in this array.
      content: [
        { type: "text/plain", value: text },
        { type: "text/html", value: html },
      ],
      attachments: [
        ...(attachment
          ? [
              {
                content: attachment.base64,
                filename: attachment.filename,
                type: "application/pdf",
                disposition: "attachment",
              },
            ]
          : []),
        // Inline disposition + content_id is what makes cid: resolve in the
        // HTML, so the logo renders without the recipient unblocking images.
        {
          content: EMAIL_LOGO_BASE64,
          filename: EMAIL_LOGO_FILENAME,
          type: "image/png",
          disposition: "inline",
          content_id: EMAIL_LOGO_CID,
        },
      ],
    }),
  });

  // SendGrid returns 202 Accepted with an empty body on success.
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(friendlySendgridError(res.status, detail));
  }
};

export async function sendBulkViaSendgrid({
  recipients,
  ...content
}: SendBulkArgs): Promise<BulkSendResult> {
  const result: BulkSendResult = { sent: [], failed: [] };

  // A rejected chunk fails as a unit — SendGrid validates the whole request —
  // so the other chunks still go out and the report stays accurate.
  for (const batch of chunk(recipients, CHUNK_SIZE)) {
    try {
      await sendChunk(batch, content);
      result.sent.push(...batch);
    } catch (err) {
      const error = err instanceof Error ? err.message : "Send failed";
      result.failed.push(...batch.map((email) => ({ email, error })));
    }
  }

  return result;
}

const friendlySendgridError = (status: number, detail: string): string => {
  const lower = detail.toLowerCase();
  if (lower.includes("maximum credits exceeded")) {
    return "SendGrid has no sending credits available for this account. Either the daily quota is used up (it resets at midnight UTC) or the plan grants no sends yet — check Account Details at https://app.sendgrid.com.";
  }
  if (lower.includes("not authorized to send mail")) {
    return "SendGrid refused the send. Either the API key lacks the 'Mail Send' scope, or the account is not provisioned to send — check the key's permissions and the account status at https://app.sendgrid.com.";
  }
  if (lower.includes("does not match a verified sender")) {
    return `${fromEmail()} is not a verified SendGrid sender. Verify it under Sender Authentication, or use an address on an authenticated domain.`;
  }
  if (status === 401) {
    return "SendGrid rejected the API key (invalid or revoked). Check SENDGRID_APIKEY.";
  }
  if (status === 403) {
    return `SendGrid refused the send from ${fromEmail()}. The sender is usually unverified, or the daily limit is reached.${
      detail ? ` Detail: ${detail}` : ""
    }`;
  }
  if (status === 413) {
    return "The email exceeded SendGrid's 30MB limit. Use a smaller PDF.";
  }
  if (status === 429) {
    return "SendGrid rate limit hit. Wait a moment and retry the failed recipients.";
  }
  return `SendGrid responded ${status}${detail ? `: ${detail}` : ""}`;
};
