import { expect, test } from "@playwright/test";
import { seedAuth } from "./fixtures/auth";

const PAGE_URL = "/bulk-email";

// A minimal but structurally valid single-page PDF.
const SAMPLE_PDF = Buffer.from(
  `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 200 200]>>endobj
trailer<</Root 1 0 R>>
%%EOF`
);

const REAL_EMAIL = "investor@gmail.com";
const TOY_EMAIL = "spammer@mailinator.com";

// Pull the `mode` field out of a multipart/form-data request body.
const modeFromBody = (body: string | null): "verify" | "send" => {
  const match = (body || "").match(/name="mode"\r?\n\r?\n(\w+)/);
  return match && match[1] === "send" ? "send" : "verify";
};

const VERIFY_RESULTS = [
  { email: REAL_EMAIL, status: "valid", reason: "Deliverable address" },
  {
    email: TOY_EMAIL,
    status: "disposable",
    reason: "Disposable / temporary (toy) email provider",
  },
];

const SUMMARY = { total: 2, valid: 1, disposable: 1, invalid: 0 };

test.describe("Upload (bulk email)", () => {
  test.beforeEach(async ({ page }) => {
    await seedAuth(page);

    // Deterministically stand in for the /api/bulk-email handler (which itself
    // calls the free Disify verifier) so the UI flow doesn't depend on network.
    await page.route("**/api/bulk-email", async (route) => {
      const mode = modeFromBody(route.request().postData());
      if (mode === "verify") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            mode,
            results: VERIFY_RESULTS,
            summary: SUMMARY,
          }),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            mode,
            message: "Sent to 1 recipient(s)",
            sent: [REAL_EMAIL],
            results: VERIFY_RESULTS,
            summary: SUMMARY,
          }),
        });
      }
    });
  });

  test("uploads a PDF, flags a toy email, and sends to the valid one", async ({
    page,
  }) => {
    await page.goto(PAGE_URL);

    // The page renders behind the admin guard + redux rehydration.
    await expect(
      page.getByRole("heading", { name: "Upload", exact: true })
    ).toBeVisible();

    // Step 1 — upload the PDF.
    await page.setInputFiles('[data-testid="pdf-input"]', {
      name: "notice.pdf",
      mimeType: "application/pdf",
      buffer: SAMPLE_PDF,
    });
    await expect(page.getByTestId("pdf-preview")).toContainText("notice.pdf");

    // Step 2 — add a real recipient and a throwaway/toy recipient via the
    // react-select tag input.
    const select = page.getByTestId("recipient-select");
    const emailInput = select.locator("#recipient-input");
    await emailInput.click();
    await emailInput.pressSequentially(REAL_EMAIL);
    await emailInput.press("Enter");
    await emailInput.pressSequentially(TOY_EMAIL);
    await emailInput.press("Enter");

    await expect(select.locator(`[data-email="${REAL_EMAIL}"]`)).toBeVisible();
    await expect(select.locator(`[data-email="${TOY_EMAIL}"]`)).toBeVisible();

    // Step 3 — verify. The toy address must be flagged as disposable.
    await page.getByTestId("verify-btn").click();

    await expect(
      select.locator(`[data-email="${REAL_EMAIL}"][data-status="valid"]`)
    ).toBeVisible();
    await expect(
      select.locator(`[data-email="${TOY_EMAIL}"][data-status="disposable"]`)
    ).toBeVisible();

    // The send button should advertise exactly one valid recipient.
    await expect(page.getByTestId("send-btn")).toContainText(
      "Send to 1 valid recipient"
    );

    // Step 4 — send. The toy address is skipped; success is surfaced.
    await page.getByTestId("send-btn").click();
    await expect(
      page.getByText("Sent to 1 recipient(s)", { exact: true })
    ).toBeVisible();
  });

  test("blocks sending without a PDF", async ({ page }) => {
    await page.goto(PAGE_URL);
    await expect(
      page.getByRole("heading", { name: "Upload", exact: true })
    ).toBeVisible();

    const emailInput = page
      .getByTestId("recipient-select")
      .locator("#recipient-input");
    await emailInput.click();
    await emailInput.pressSequentially(REAL_EMAIL);
    await emailInput.press("Enter");

    // No PDF uploaded yet -> send is disabled.
    await expect(page.getByTestId("send-btn")).toBeDisabled();
  });
});

/**
 * Integration check against the REAL verifier (Disify, the free no-key tool).
 * Hits the running route handler directly — proves that a genuine domain is
 * accepted and a disposable/toy provider is flagged. Requires network access.
 */
test.describe("Email verification (live Disify)", () => {
  test("flags a disposable provider and accepts a real domain", async ({
    request,
  }) => {
    const res = await request.post("/api/bulk-email", {
      multipart: {
        mode: "verify",
        emails: JSON.stringify([REAL_EMAIL, TOY_EMAIL]),
      },
      timeout: 30_000,
    });
    expect(res.ok()).toBeTruthy();

    const body = await res.json();
    const byEmail: Record<string, { status: string }> = Object.fromEntries(
      body.results.map((r: { email: string; status: string }) => [r.email, r])
    );

    expect(byEmail[TOY_EMAIL].status).toBe("disposable");
    expect(byEmail[REAL_EMAIL].status).toBe("valid");
  });
});
