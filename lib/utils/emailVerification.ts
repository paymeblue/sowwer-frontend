/**
 * Server-side email verification using Disify (https://disify.com).
 *
 * Disify is a free, no-API-key service that, for a single email, reports:
 *   - format:     whether the address is syntactically valid
 *   - dns:        whether the domain resolves with mail (MX) records — i.e. a
 *                 "real" deliverable domain
 *   - disposable: whether the domain is a known throwaway / "toy" provider
 *                 (mailinator, 10minutemail, etc.)
 *
 * We map those flags onto a small status enum the UI can render and act on.
 */

export type EmailStatus = "valid" | "disposable" | "invalid";

export interface EmailVerificationResult {
  email: string;
  status: EmailStatus;
  reason: string;
}

interface DisifyResponse {
  format?: boolean;
  alias?: boolean;
  disposable?: boolean;
  dns?: boolean;
  deliverable?: boolean;
  domain?: string;
}

const DISIFY_URL = "https://disify.com/api/email";

const classify = (
  email: string,
  data: DisifyResponse
): EmailVerificationResult => {
  if (data.format === false) {
    return { email, status: "invalid", reason: "Malformed email address" };
  }
  if (data.disposable) {
    return {
      email,
      status: "disposable",
      reason: "Disposable / temporary (toy) email provider",
    };
  }
  if (data.dns === false) {
    return {
      email,
      status: "invalid",
      reason: "Domain has no mail (MX) records",
    };
  }
  return { email, status: "valid", reason: "Deliverable address" };
};

// Verify a single email. Network/parsing failures fall back to "invalid" with a
// descriptive reason rather than throwing, so one bad lookup never sinks a batch.
export const verifyEmail = async (
  email: string
): Promise<EmailVerificationResult> => {
  const trimmed = email.trim();
  try {
    const res = await fetch(`${DISIFY_URL}/${encodeURIComponent(trimmed)}`, {
      headers: { Accept: "application/json" },
      // Disify is a third-party call; keep it from caching across requests.
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        email: trimmed,
        status: "invalid",
        reason: `Verification service error (${res.status})`,
      };
    }

    const data = (await res.json()) as DisifyResponse;
    return classify(trimmed, data);
  } catch {
    return {
      email: trimmed,
      status: "invalid",
      reason: "Could not reach the verification service",
    };
  }
};

// Verify a batch of emails concurrently, de-duplicating first.
export const verifyEmails = async (
  emails: string[]
): Promise<EmailVerificationResult[]> => {
  const unique = Array.from(
    new Set(emails.map((e) => e.trim().toLowerCase()).filter(Boolean))
  );
  return Promise.all(unique.map(verifyEmail));
};
