import * as z from "zod";

// Capped by the EmailJS plan's attachment limit (Professional = 2MB). Note the
// PDF is base64-encoded before sending, which inflates it by ~33%, so files
// right at the cap may still be rejected upstream — EmailJS's own error is
// surfaced verbatim when that happens.
export const MAX_PDF_SIZE = 2 * 1024 * 1024;
export const MAX_PDF_SIZE_LABEL = "2MB";
export const MAX_RECIPIENTS = 500;

// Default donor-facing email copy. Pre-filled in the UI and used as the
// fallback server-side when the admin leaves the fields blank. Written in the
// donor-centric, impact-led style of world-class NGO acknowledgements.
export const DEFAULT_EMAIL_SUBJECT =
  "Thank you — your kindness is changing lives";
export const DEFAULT_EMAIL_MESSAGE = `Dear Friend,

Thank you. Two small words that could never fully hold the gratitude we feel for your generosity.

Because of you, a widow will not carry her burdens alone. An orphan will know the warmth of being seen and cared for. A missionary will find the strength to keep serving on the frontlines of hope. Your kindness reaches people and places you may never meet — and for them, it changes everything.

At Soower, we believe no one should be forgotten. Your support turns that belief into action, restoring dignity, hope, and belonging to the most vulnerable among us — one life, one family, one community at a time.

We've attached a document for your records — a small reminder of the very real difference you are making.

You are not just a donor. You are part of the Soower family, and the heart of everything we do.

With heartfelt gratitude,
The Soower Team`;

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Invalid email address");

export const recipientsSchema = z
  .array(emailSchema)
  .min(1, "Add at least one recipient")
  .max(MAX_RECIPIENTS, `A maximum of ${MAX_RECIPIENTS} recipients is allowed`);

// Parse a free-form blob of pasted emails (comma, semicolon, space, or newline
// separated) into a clean, de-duplicated list. Used by both the chip input and
// the API route's tolerant body parsing.
export const parseEmailList = (raw: string): string[] => {
  return Array.from(
    new Set(
      raw
        .split(/[\s,;]+/)
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean)
    )
  );
};
