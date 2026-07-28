import { NextRequest, NextResponse } from "next/server";
import { EMAIL_LOGO_CID } from "@lib/emailAssets";
import {
  isResendConfigured,
  resendConfigHint,
  sendBulkViaResend,
} from "@lib/resend";
import {
  DEFAULT_EMAIL_MESSAGE,
  DEFAULT_EMAIL_SUBJECT,
  MAX_PDF_SIZE,
  MAX_PDF_SIZE_LABEL,
  MAX_RECIPIENTS,
  parseEmailList,
} from "lib/validations/bulkEmail";

export const runtime = "nodejs";

interface ParsedBody {
  emails: string[];
  pdf: File | null;
  subject: string;
  message: string;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Branded, donor-facing HTML email. `message` is plain text; blank lines split
// paragraphs and single newlines become line breaks.
const buildHtml = (message: string) => {
  const blocks = message.split(/\n{2,}/);
  const paragraphs = blocks
    .map((p, i) => {
      // No trailing margin on the last block, or it stacks with the cell
      // padding and leaves a dead gap above the footer rule.
      const margin = i === blocks.length - 1 ? "0" : "0 0 16px";
      return `<p style="margin:${margin}">${escapeHtml(p).replace(
        /\n/g,
        "<br/>"
      )}</p>`;
    })
    .join("");

  // Tables and inline styles throughout: Outlook ignores most modern CSS, and
  // the logo is an inline (cid:) part so it renders without the recipient
  // having to unblock remote images.
  return `<div style="margin:0;padding:24px;background:#f4f6fb;font-family:Arial,Helvetica,sans-serif">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e8eaf0">
      <tr>
        <td align="center" style="padding:28px 28px 22px">
          <img src="cid:${EMAIL_LOGO_CID}" alt="Soower" width="180" style="display:block;width:180px;max-width:180px;height:auto;border:0;outline:none;text-decoration:none" />
        </td>
      </tr>
      <tr>
        <td style="height:4px;background:#FFC629;font-size:0;line-height:0">&nbsp;</td>
      </tr>
      <tr>
        <td style="padding:28px;color:#1a1a1a;font-size:15px;line-height:1.7">
          ${paragraphs}
        </td>
      </tr>
      <tr>
        <td style="padding:18px 28px;border-top:1px solid #eef0f5;color:#8a93a6;font-size:12px;line-height:1.5">
          You're receiving this email because you supported Soower. Thank you for
          standing with the widows, orphans, and missionaries we serve.
        </td>
      </tr>
    </table>
  </div>`;
};

const readBody = async (req: NextRequest): Promise<ParsedBody> => {
  const data = await req.formData();

  // `emails` may arrive as a JSON array, a delimited string, or repeated fields.
  let emails: string[] = [];
  const rawEmails = data.getAll("emails");
  if (rawEmails.length > 1) {
    emails = rawEmails.flatMap((v) => parseEmailList(String(v)));
  } else if (rawEmails.length === 1) {
    const single = String(rawEmails[0]);
    try {
      const asJson = JSON.parse(single);
      emails = Array.isArray(asJson)
        ? asJson.flatMap((v) => parseEmailList(String(v)))
        : parseEmailList(single);
    } catch {
      emails = parseEmailList(single);
    }
  }

  const pdf = data.get("pdf");
  return {
    emails: Array.from(new Set(emails)),
    pdf: pdf instanceof File ? pdf : null,
    subject: (data.get("subject") as string)?.trim() || DEFAULT_EMAIL_SUBJECT,
    message: (data.get("message") as string)?.trim() || DEFAULT_EMAIL_MESSAGE,
  };
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: ParsedBody;
  try {
    body = await readBody(req);
  } catch {
    return NextResponse.json(
      { message: "Invalid form submission" },
      { status: 400 }
    );
  }

  const { emails: recipients, pdf, subject, message } = body;

  if (recipients.length === 0) {
    return NextResponse.json(
      { message: "Add at least one recipient" },
      { status: 400 }
    );
  }
  if (recipients.length > MAX_RECIPIENTS) {
    return NextResponse.json(
      { message: `A maximum of ${MAX_RECIPIENTS} recipients is allowed` },
      { status: 400 }
    );
  }
  if (!pdf) {
    return NextResponse.json(
      { message: "A PDF file is required to send" },
      { status: 400 }
    );
  }
  if (pdf.type !== "application/pdf") {
    return NextResponse.json(
      { message: "Only PDF files are accepted" },
      { status: 400 }
    );
  }
  if (pdf.size > MAX_PDF_SIZE) {
    return NextResponse.json(
      { message: `PDF exceeds the ${MAX_PDF_SIZE_LABEL} size limit` },
      { status: 400 }
    );
  }

  // TEST MODE: explicit opt-in that reports success without contacting Resend,
  // so the UI flow can be exercised without sending real mail.
  if (process.env.BULK_EMAIL_TEST_MODE === "true") {
    return NextResponse.json({
      testMode: true,
      message: `Sent to ${recipients.length} recipient(s) (test mode — no email actually delivered)`,
      sent: recipients,
    });
  }

  if (!isResendConfigured()) {
    return NextResponse.json({ message: resendConfigHint() }, { status: 500 });
  }

  // One request per recipient (Resend's batch endpoint can't carry attachments),
  // so recipients can fail independently.
  const base64 = Buffer.from(await pdf.arrayBuffer()).toString("base64");
  const { sent, failed } = await sendBulkViaResend({
    recipients,
    subject,
    html: buildHtml(message),
    text: message,
    attachment: { filename: pdf.name || "document.pdf", base64 },
  });

  if (sent.length === 0) {
    return NextResponse.json(
      {
        provider: "resend",
        message: failed[0]?.error || "Resend delivery failed",
        failed,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    provider: "resend",
    message: failed.length
      ? `Sent to ${sent.length} of ${recipients.length} recipient(s) — ${failed.length} failed`
      : `Sent to ${sent.length} recipient(s)`,
    sent,
    failed,
  });
}
