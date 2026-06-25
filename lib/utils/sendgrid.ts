// Minimal SendGrid v3 "mail/send" client (no SDK dependency). Each recipient is
// sent as its own personalization so they never see each other's addresses.
// Requires SENDGRID_API_KEY and a verified SENDGRID_FROM_EMAIL.

export interface SendBulkArgs {
  recipients: string[];
  subject: string;
  html: string;
  attachment: { filename: string; base64: string };
}

const SENDGRID_URL = "https://api.sendgrid.com/v3/mail/send";

const apiKey = () =>
  process.env.SENDGRID_APIKEY || process.env.SENDGRID_API_KEY || "";
const fromEmail = () =>
  process.env.MAIL_FROM_ADDRESS || process.env.SENDGRID_FROM_EMAIL || "";

export const isSendgridConfigured = () => !!apiKey() && !!fromEmail();

export async function sendBulkViaSendgrid({
  recipients,
  subject,
  html,
  attachment,
}: SendBulkArgs): Promise<void> {
  const body = {
    personalizations: recipients.map((email) => ({ to: [{ email }] })),
    from: {
      email: fromEmail(),
      name: process.env.SENDGRID_FROM_NAME || "Soower",
    },
    subject,
    content: [{ type: "text/html", value: html }],
    attachments: [
      {
        content: attachment.base64,
        filename: attachment.filename,
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  };

  const res = await fetch(SENDGRID_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  // SendGrid returns 202 Accepted on success, with an empty body.
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(friendlySendgridError(res.status, detail));
  }
}

const friendlySendgridError = (status: number, detail: string): string => {
  const lower = detail.toLowerCase();
  if (lower.includes("not authorized to send mail")) {
    return "SendGrid key is missing the 'Mail Send' permission. Create an API key with Mail Send (Full Access) enabled and update SENDGRID_APIKEY.";
  }
  if (status === 403 || lower.includes("verified sender")) {
    return "The from-address is not a verified SendGrid sender. Verify MAIL_FROM_ADDRESS (Single Sender Verification) or use an authenticated domain.";
  }
  if (status === 401) {
    return "SendGrid rejected the API key (invalid or expired). Check SENDGRID_APIKEY.";
  }
  return `SendGrid responded ${status}${detail ? `: ${detail}` : ""}`;
};
