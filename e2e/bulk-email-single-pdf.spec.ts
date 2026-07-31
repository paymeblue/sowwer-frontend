import { expect, test } from "@playwright/test";
import { seedAuth } from "./fixtures/auth";

const SAMPLE_PDF = Buffer.from(
  `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
trailer<</Root 1 0 R>>
%%EOF`
);

const CLOUD_URL =
  "https://res.cloudinary.com/test-cloud/image/upload/v1/soower/newsletters/first.pdf";

test.describe("Upload — exactly one PDF per newsletter", () => {
  test.beforeEach(async ({ page }) => {
    await seedAuth(page);
    await page.route("**/api/cloudinary-sign", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          cloudName: "test-cloud",
          apiKey: "k",
          timestamp: 1700000000,
          signature: "s",
          folder: "soower/newsletters",
        }),
      })
    );
    await page.route("https://api.cloudinary.com/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ secure_url: CLOUD_URL, bytes: 1024 }),
      })
    );
  });

  test("a second PDF cannot be added while one is present", async ({
    page,
  }) => {
    await page.goto("/bulk-email");
    await expect(
      page.getByRole("heading", { name: "Upload", exact: true })
    ).toBeVisible();

    await page.setInputFiles('[data-testid="pdf-input"]', {
      name: "first.pdf",
      mimeType: "application/pdf",
      buffer: SAMPLE_PDF,
    });
    await expect(page.getByTestId("pdf-preview")).toContainText("uploaded");

    // The link field is gone, so it cannot compete with the uploaded file.
    await expect(page.getByTestId("pdf-url-input")).toHaveCount(0);

    // The dropzone is gone too — there is no second input to populate.
    await expect(page.locator('[data-testid="pdf-input"]')).toHaveCount(0);

    // Removing restores both entry points.
    await page.getByTestId("pdf-remove").click();
    await expect(page.locator('[data-testid="pdf-input"]')).toHaveCount(1);
    await expect(page.getByTestId("pdf-url-input")).toHaveCount(1);
  });

  test("pasting a link hides the dropzone", async ({ page }) => {
    await page.goto("/bulk-email");
    await expect(
      page.getByRole("heading", { name: "Upload", exact: true })
    ).toBeVisible();

    await expect(page.locator('[data-testid="pdf-input"]')).toHaveCount(1);

    await page.getByTestId("pdf-url-input").fill(CLOUD_URL);
    // Dropzone is unmounted once a link is in play, so no file can be added.
    await expect(page.locator('[data-testid="pdf-input"]')).toHaveCount(0);

    // Clearing the link brings it back.
    await page.getByTestId("pdf-url-input").fill("");
    await expect(page.locator('[data-testid="pdf-input"]')).toHaveCount(1);
  });
});
