// Server-side Cloudinary signing.
//
// The browser uploads the PDF straight to Cloudinary rather than through our
// API route — Netlify rejects any function request over ~4.4MB, and a
// newsletter is bigger than that. To keep the API secret off the client, the
// browser first asks this app for a short-lived signature, then posts the file
// to Cloudinary with it.

import { createHash } from "crypto";

export const CLOUDINARY_FOLDER = "soower/newsletters";

const cloudName = () => process.env.CLOUDINARY_CLOUD_NAME || "";
const apiKey = () => process.env.CLOUDINARY_APIKEY || "";
const apiSecret = () => process.env.CLOUDINARY_SECRET || "";

export const isCloudinaryConfigured = () =>
  !!cloudName() && !!apiKey() && !!apiSecret();

export const cloudinaryConfigHint = () => {
  const missing = [
    !cloudName() && "CLOUDINARY_CLOUD_NAME",
    !apiKey() && "CLOUDINARY_APIKEY",
    !apiSecret() && "CLOUDINARY_SECRET",
  ].filter(Boolean);
  return `Cloudinary is not configured. Missing: ${missing.join(", ")}.`;
};

export interface UploadSignature {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
}

// Cloudinary signs the alphabetically-sorted, &-joined params with the secret
// appended. Only the params actually sent alongside the file may be included.
export const signUpload = (): UploadSignature => {
  const timestamp = Math.floor(Date.now() / 1000);
  const params: Record<string, string> = {
    folder: CLOUDINARY_FOLDER,
    timestamp: String(timestamp),
  };

  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");

  const signature = createHash("sha1")
    .update(toSign + apiSecret())
    .digest("hex");

  return {
    cloudName: cloudName(),
    apiKey: apiKey(),
    timestamp,
    signature,
    folder: CLOUDINARY_FOLDER,
  };
};
