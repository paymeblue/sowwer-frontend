// Browser-side direct upload to Cloudinary.
//
// XMLHttpRequest rather than fetch: fetch has no upload-progress event, and a
// newsletter PDF is large enough that an admin staring at a frozen button would
// reasonably assume it had hung.

interface UploadSignature {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
}

export interface UploadResult {
  url: string;
  bytes: number;
}

const friendlyUploadError = (status: number, body: string): string => {
  const lower = body.toLowerCase();
  if (lower.includes("file size too large") || status === 413) {
    return "Cloudinary rejected the file for being too large. The free plan caps uploads at 10MB.";
  }
  if (lower.includes("invalid signature")) {
    return "Cloudinary rejected the upload signature. Check CLOUDINARY_SECRET and that the server clock is correct.";
  }
  if (lower.includes("unknown api_key") || status === 401) {
    return "Cloudinary rejected the API key. Check CLOUDINARY_APIKEY and CLOUDINARY_CLOUD_NAME.";
  }
  return `Cloudinary upload failed (${status}). ${body.slice(0, 200)}`;
};

export async function uploadPdfToCloudinary(
  file: File,
  onProgress?: (percent: number) => void
): Promise<UploadResult> {
  const signRes = await fetch("/api/cloudinary-sign", { method: "POST" });
  const sig = (await signRes.json()) as UploadSignature & { message?: string };
  if (!signRes.ok) throw new Error(sig.message || "Could not sign the upload");

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", sig.apiKey);
  form.append("timestamp", String(sig.timestamp));
  form.append("signature", sig.signature);
  form.append("folder", sig.folder);

  // "auto" lets Cloudinary classify the PDF itself, which yields a URL that
  // opens inline in the browser rather than forcing a download.
  const endpoint = `https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`;

  return new Promise<UploadResult>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const json = JSON.parse(xhr.responseText);
          resolve({ url: json.secure_url, bytes: json.bytes });
        } catch {
          reject(new Error("Cloudinary returned an unreadable response"));
        }
      } else {
        reject(new Error(friendlyUploadError(xhr.status, xhr.responseText)));
      }
    };

    xhr.onerror = () => reject(new Error("Could not reach Cloudinary"));
    xhr.send(form);
  });
}
