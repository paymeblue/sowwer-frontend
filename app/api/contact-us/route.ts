import { ContactUsValidation } from "lib/validations/contactUs";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

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
    // Handle validation errors
    return new NextResponse(dataRes.error as any, { status: 400 });
  }

  const { email, fullName, message, phoneNumber } = dataRes.data;

  const body = JSON.stringify({
    message,
    email,
    fullname: fullName,
    type: "soower",
    phone: phoneNumber,
  });

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

  if (outcome.success) {
    // Now call the send the original body to the external API
    const externalApiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}contact-us`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }
    );

    const response = await externalApiResponse.json();

    if (externalApiResponse.ok) {
      const result = response;
      return NextResponse.json(result);
    } else {
      const status = externalApiResponse.status;
      const errorResponse = response;
      return NextResponse.json(errorResponse.message, { status });
    }
  } else {
    return NextResponse.json(
      `Captcha token invalid!. Please refresh Captcha ${
        !outcome.success ? outcome["error-codes"][0] : null
      }`,
      {
        status: 500,
      }
    );
  }
}
