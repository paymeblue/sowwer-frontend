import { ORG_CONTACT } from "@lib/siteMeta";
import {
  isSendgridConfigured,
  sendBulkViaSendgrid,
  sendgridConfigHint,
} from "@lib/sendgrid";
import { ContactUsValidation } from "lib/validations/contactUs";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(req: NextRequest): Promise<NextResponse> {
  const data = await req.formData();
  const fields = ["fullName", "phoneNumber", "email", "message"];

  const formDataValues: Partial<z.infer<typeof ContactUsValidation>> | any = {};
  fields.forEach((field) => {
    const value = data.get(field);
    if (value !== null) {
      formDataValues[field] = value as z.infer<
        typeof ContactUsValidation
      >[keyof z.infer<typeof ContactUsValidation>];
    }
  });

  const ip = req.headers.get("CF-Connecting-IP");
  const token = data.get("cf-turnstile-response");
  const dataRes = ContactUsValidation.safeParse(formDataValues);

  if (!dataRes.success) {
    // A raw ZodError isn't valid response body content — the client's
    // res.json() would fail to parse it, masking the real validation
    // message behind a generic "something went wrong" error.
    return NextResponse.json(dataRes.error.flatten().fieldErrors, {
      status: 400,
    });
  }

  const { email, fullName, message, phoneNumber } = dataRes.data;

  const formData = new FormData();
  formData.append("secret", process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY!);
  formData.append("response", token as string);
  formData.append("remoteip", ip as string);

  // Validate the token by calling the siteverify API endpoint.
  const url = process.env.CLOUDFLARE_TURNSTILE_VERIFY_API!;
  const result = await fetch(url, {
    body: formData,
    method: "POST",
  });

  const outcome = await result.json();

  if (!outcome.success) {
    return NextResponse.json(
      `Captcha token invalid!. Please refresh Captcha ${
        !outcome.success ? outcome["error-codes"][0] : null
      }`,
      {
        status: 500,
      }
    );
  }

  if (!isSendgridConfigured()) {
    return NextResponse.json(sendgridConfigHint(), { status: 500 });
  }

  const subject = `New contact form message from ${fullName}`;
  const text = [
    `Name: ${fullName}`,
    `Email: ${email}`,
    phoneNumber ? `Phone: ${phoneNumber}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");
  const html = `
    <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${
      phoneNumber
        ? `<p><strong>Phone:</strong> ${escapeHtml(phoneNumber)}</p>`
        : ""
    }
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  const { failed } = await sendBulkViaSendgrid({
    recipients: [ORG_CONTACT.email],
    subject,
    text,
    html,
    replyTo: email,
  });

  if (failed.length > 0) {
    return NextResponse.json(failed[0].error, { status: 502 });
  }

  return NextResponse.json({ message: "Message sent successfully." });
}
