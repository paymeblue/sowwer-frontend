import { NextRequest, NextResponse } from "next/server";
import { isSendgridConfigured, sendBulkViaSendgrid } from "@lib/sendgrid";
import {
  DEFAULT_EMAIL_MESSAGE,
  DEFAULT_EMAIL_SUBJECT,
  MAX_PDF_SIZE,
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
      { message: "PDF exceeds the 10MB size limit" },
      { status: 400 }
    );
  }

  // Preferred path: deliver for real via SendGrid when it's configured.
  if (isSendgridConfigured()) {
    const base64 = Buffer.from(await pdf.arrayBuffer()).toString("base64");
    try {
      await sendBulkViaSendgrid({
        recipients,
        subject,
        html: buildHtml(message),
        attachment: { filename: pdf.name || "document.pdf", base64 },
      });
    } catch (err) {
      return NextResponse.json(
        {
          message:
            err instanceof Error ? err.message : "SendGrid delivery failed",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      provider: "sendgrid",
      message: `Sent to ${recipients.length} recipient(s)`,
      sent: recipients,
    });
  }

  // TEST MODE: no real provider configured and the backend bulk-email endpoint
  // isn't live yet (it gates every admins/* route behind a real admin token).
  // When BULK_EMAIL_TEST_MODE is on we report success so the full flow can be
  // tested. Configure SendGrid (above) to actually deliver.
  if (process.env.BULK_EMAIL_TEST_MODE === "true") {
    return NextResponse.json({
      testMode: true,
      message: `Sent to ${recipients.length} recipient(s) (test mode — no email actually delivered)`,
      sent: recipients,
    });
  }

  // Forward the PDF and recipient list to the backend, passing the caller's auth
  // token through. Mirrors the contact-us proxy pattern.
  const forward = new FormData();
  forward.append("pdf", pdf, pdf.name || "document.pdf");
  recipients.forEach((email) => forward.append("recipients", email));

  const authHeader = req.headers.get("authorization");

  try {
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}admins/bulk-email`,
      {
        method: "POST",
        headers: authHeader ? { authorization: authHeader } : undefined,
        body: forward,
      }
    );

    const payload = await backendRes.json().catch(() => ({}));

    if (!backendRes.ok) {
      return NextResponse.json(
        {
          message:
            (payload && payload.message) ||
            "The mail service rejected the request",
        },
        { status: backendRes.status }
      );
    }

    return NextResponse.json({
      message: `Sent to ${recipients.length} recipient(s)`,
      sent: recipients,
      backend: payload,
    });
  } catch {
    return NextResponse.json(
      { message: "Could not reach the mail service" },
      { status: 502 }
    );
  }
}
