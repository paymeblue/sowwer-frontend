import { NextRequest, NextResponse } from "next/server";
import { buildHtml } from "@lib/emailTemplate";
import {
  isSendgridConfigured,
  sendBulkViaSendgrid,
  sendgridConfigHint,
} from "@lib/sendgrid";
import {
  DEFAULT_EMAIL_MESSAGE,
  DEFAULT_EMAIL_SUBJECT,
  fileNameFromUrl,
  isSafePdfUrl,
  MAX_PDF_SIZE,
  MAX_PDF_SIZE_LABEL,
  MAX_RECIPIENTS,
  parseEmailList,
} from "lib/validations/bulkEmail";

export const runtime = "nodejs";

interface ParsedBody {
  emails: string[];
  pdf: File | null;
  // Link mode: the PDF is hosted elsewhere and only referenced, which keeps the
  // request tiny and sidesteps Netlify's payload limit entirely.
  pdfUrl: string;
  subject: string;
  message: string;
}

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
    pdf: pdf instanceof File && pdf.size > 0 ? pdf : null,
    pdfUrl: ((data.get("pdfUrl") as string) || "").trim(),
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

  const { emails: recipients, pdf, pdfUrl, subject, message } = body;

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
  if (!pdf && !pdfUrl) {
    return NextResponse.json(
      { message: "Attach a PDF or provide a link to one" },
      { status: 400 }
    );
  }
  if (pdfUrl && !isSafePdfUrl(pdfUrl)) {
    return NextResponse.json(
      { message: "The PDF link must be a valid http(s) URL" },
      { status: 400 }
    );
  }
  if (pdf) {
    if (pdf.type !== "application/pdf") {
      return NextResponse.json(
        { message: "Only PDF files are accepted" },
        { status: 400 }
      );
    }
    if (pdf.size > MAX_PDF_SIZE) {
      return NextResponse.json(
        {
          message: `PDF exceeds the ${MAX_PDF_SIZE_LABEL} attachment limit. Host it and send a link instead.`,
        },
        { status: 400 }
      );
    }
  }

  // TEST MODE: explicit opt-in that reports success without contacting SendGrid,
  // so the UI flow can be exercised without sending real mail.
  if (process.env.BULK_EMAIL_TEST_MODE === "true") {
    return NextResponse.json({
      testMode: true,
      message: `Sent to ${recipients.length} recipient(s) (test mode — no email actually delivered)`,
      sent: recipients,
    });
  }

  if (!isSendgridConfigured()) {
    return NextResponse.json(
      { message: sendgridConfigHint() },
      { status: 500 }
    );
  }

  // SendGrid fans out one personalization per recipient, so the whole list goes
  // out in a request or two rather than one call per donor.
  const attachment = pdf
    ? {
        filename: pdf.name || "document.pdf",
        base64: Buffer.from(await pdf.arrayBuffer()).toString("base64"),
      }
    : undefined;
  const linkName = pdfUrl ? fileNameFromUrl(pdfUrl) : undefined;

  const { sent, failed } = await sendBulkViaSendgrid({
    recipients,
    subject,
    html: buildHtml(message, pdfUrl || undefined, linkName),
    // Link mode needs the URL in the plain-text part too, or text-only clients
    // get a thank-you note with no way to reach the newsletter.
    text: pdfUrl ? `${message}\n\n${linkName}: ${pdfUrl}` : message,
    attachment,
  });

  if (sent.length === 0) {
    return NextResponse.json(
      {
        provider: "sendgrid",
        message: failed[0]?.error || "SendGrid delivery failed",
        failed,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    provider: "sendgrid",
    message: failed.length
      ? `Sent to ${sent.length} of ${recipients.length} recipient(s) — ${failed.length} failed`
      : `Sent to ${sent.length} recipient(s)`,
    sent,
    failed,
  });
}
