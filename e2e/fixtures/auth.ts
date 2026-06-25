import type { Page } from "@playwright/test";

// Seed an authenticated session directly into redux-persist's storage so the
// route guard passes without going through the real login flow. redux-persist
// serialises every whitelisted key individually, hence the nested
// JSON.stringify calls.
//
// The Upload page is admin-only with a testing allowlist (see BulkEmailRoute).
// We deliberately seed a NON-admin donor whose email is on that allowlist, to
// prove the exception lets them in.
export async function seedAuth(page: Page) {
  const user = {
    id: "user-e2e",
    firstName: "E2E",
    lastName: "User",
    email: "uzochukwubenamara@gmail.com",
    phone: "08000000000",
    role: "donor",
    type: "donor",
    createdAt: new Date().toISOString(),
    verificationStatus: true,
  };

  const persistedAuth = {
    user: JSON.stringify(user),
    token: JSON.stringify("e2e-test-token"),
    refreshToken: JSON.stringify(null),
    context: JSON.stringify("donor"),
    _persist: JSON.stringify({ version: -1, rehydrated: true }),
  };

  await page.addInitScript((value) => {
    window.localStorage.setItem("persist:auth", value);
  }, JSON.stringify(persistedAuth));
}
