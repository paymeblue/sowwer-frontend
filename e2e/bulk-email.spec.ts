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

const EMAIL_A = "donor.one@gmail.com";
const EMAIL_B = "donor.two@gmail.com";

const addRecipient = async (
  page: import("@playwright/test").Page,
  email: string
) => {
  const input = page
    .getByTestId("recipient-select")
    .locator("#recipient-input");
  await input.click();
  await input.pressSequentially(email);
  await input.press("Enter");
};

test.describe("Upload (bulk email)", () => {
  test.beforeEach(async ({ page }) => {
    await seedAuth(page);

    // Stand in for the /api/bulk-email handler so the UI flow is deterministic.
    await page.route("**/api/bulk-email", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Sent to 2 recipient(s)",
          sent: [EMAIL_A, EMAIL_B],
        }),
      });
    });
  });

  test("uploads a PDF, adds recipients, and sends", async ({ page }) => {
    await page.goto(PAGE_URL);

    // The page renders behind the admin/allowlist guard + redux rehydration.
    await expect(
      page.getByRole("heading", { name: "Upload", exact: true })
    ).toBeVisible();

    await page.setInputFiles('[data-testid="pdf-input"]', {
      name: "notice.pdf",
      mimeType: "application/pdf",
      buffer: SAMPLE_PDF,
    });
    await expect(page.getByTestId("pdf-preview")).toContainText("notice.pdf");

    await addRecipient(page, EMAIL_A);
    await addRecipient(page, EMAIL_B);

    const select = page.getByTestId("recipient-select");
    await expect(select).toContainText(EMAIL_A);
    await expect(select).toContainText(EMAIL_B);

    await expect(page.getByTestId("send-btn")).toContainText(
      "Send to 2 recipients"
    );

    await page.getByTestId("send-btn").click();
    await expect(
      page.getByText("Sent to 2 recipient(s)", { exact: true })
    ).toBeVisible();
  });

  test("remembers recipients after a reload", async ({ page }) => {
    await page.goto(PAGE_URL);
    await expect(
      page.getByRole("heading", { name: "Upload", exact: true })
    ).toBeVisible();

    await addRecipient(page, EMAIL_A);
    await expect(page.getByTestId("recipient-select")).toContainText(EMAIL_A);

    // Reload — the saved recipient should still be there (localStorage).
    await page.reload();
    await expect(
      page.getByRole("heading", { name: "Upload", exact: true })
    ).toBeVisible();
    await expect(page.getByTestId("recipient-select")).toContainText(EMAIL_A);
  });

  test("blocks sending without a PDF", async ({ page }) => {
    await page.goto(PAGE_URL);
    await expect(
      page.getByRole("heading", { name: "Upload", exact: true })
    ).toBeVisible();

    await addRecipient(page, EMAIL_A);

    // No PDF uploaded yet -> send is disabled.
    await expect(page.getByTestId("send-btn")).toBeDisabled();
  });
});
