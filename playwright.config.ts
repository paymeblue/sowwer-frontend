import { defineConfig, devices } from "@playwright/test";

// A dedicated port keeps the e2e run from colliding with — or reusing — a stale
// `next dev` that may already be running on the default 3000.
const PORT = process.env.PORT || "3210";
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // The Next dev server compiles routes on first hit; multiple workers hitting a
  // cold server at once causes compile contention. Serialise to keep it stable.
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  timeout: 90_000,
  // First cold route compile can take a while, so give assertions generous room
  // beyond the 5s default.
  expect: { timeout: 30_000 },
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `yarn dev --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
