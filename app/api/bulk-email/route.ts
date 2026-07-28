import { NextRequest, NextResponse } from "next/server";
import {
  emailjsConfigHint,
  isEmailjsConfigured,
  sendBulkViaEmailjs,
} from "@lib/emailjs";
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
  const paragraphs = message
    .split(/\n{2,}/)
    .map(
      (p) =>
        `<p style="margin:0 0 16px">${escapeHtml(p).replace(
          /\n/g,
          "<br/>"
        )}</p>`
    )
    .join("");

  return `<div style="margin:0;padding:24px;background:#f4f6fb;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e8eaf0">
      <div style="background:#FFC629;padding:22px 28px">
        <span style="font-size:20px;font-weight:800;color:#1a1a1a;letter-spacing:.5px">SOOWER</span>
      </div>
      <div style="padding:28px;color:#1a1a1a;font-size:15px;line-height:1.7">
        ${paragraphs}
      </div>
      <div style="padding:18px 28px;border-top:1px solid #eef0f5;color:#8a93a6;font-size:12px;line-height:1.5">
        You're receiving this email because you supported Soower. Thank you for
        standing with the widows, orphans, and missionaries we serve.
      </div>
    </div>
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

  // TEST MODE: explicit opt-in that reports success without contacting EmailJS,
  // so the UI flow can be exercised without burning the monthly quota.
  if (process.env.BULK_EMAIL_TEST_MODE === "true") {
    return NextResponse.json({
      testMode: true,
      message: `Sent to ${recipients.length} recipient(s) (test mode — no email actually delivered)`,
      sent: recipients,
    });
  }

  if (!isEmailjsConfigured()) {
    return NextResponse.json({ message: emailjsConfigHint }, { status: 500 });
  }

  // EmailJS sends one email per request at 1 request/second, so a large list
  // takes a while and individual recipients can fail independently.
  const base64 = Buffer.from(await pdf.arrayBuffer()).toString("base64");
  const { sent, failed } = await sendBulkViaEmailjs({
    recipients,
    subject,
    html: buildHtml(message),
    text: message,
    attachment: { filename: pdf.name || "document.pdf", base64 },
  });

  if (sent.length === 0) {
    return NextResponse.json(
      {
        provider: "emailjs",
        message: failed[0]?.error || "EmailJS delivery failed",
        failed,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    provider: "emailjs",
    message: failed.length
      ? `Sent to ${sent.length} of ${recipients.length} recipient(s) — ${failed.length} failed`
      : `Sent to ${sent.length} recipient(s)`,
    sent,
    failed,
  });
}
