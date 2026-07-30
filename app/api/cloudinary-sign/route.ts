import { NextResponse } from "next/server";
import {
  cloudinaryConfigHint,
  isCloudinaryConfigured,
  signUpload,
} from "@lib/cloudinary";

export const runtime = "nodejs";

// Hands the browser a short-lived signature so it can upload the PDF directly
// to Cloudinary. The response is a few hundred bytes, so it is nowhere near
// Netlify's request limit — which is the whole point of not proxying the file.
export async function POST(): Promise<NextResponse> {
  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      { message: cloudinaryConfigHint() },
      { status: 500 }
    );
  }

  return NextResponse.json(signUpload());
}
