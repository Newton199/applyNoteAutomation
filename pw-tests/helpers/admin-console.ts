import { expect, type Locator, type Page } from '@playwright/test';

function env(name: string, fallback?: string): string | undefined {
  const v = process.env[name];
  if (v && v.trim().length > 0) return v.trim();
  return fallback;
}

export const ADMIN_BASE_URL = env('ADMIN_BASE_URL', 'https://console.applynote.com')!;
export const ADMIN_EMAIL = env('ADMIN_EMAIL');
export const ADMIN_PASSWORD = env('ADMIN_PASSWORD');
export const ADMIN_OTP = env('ADMIN_OTP');

export async function gotoAdminLogin(page: Page) {
  await page.goto(ADMIN_BASE_URL, { waitUntil: 'domcontentloaded' });
  // If already on dashboard, this will be fine — downstream checks handle state.
}

async function firstVisible(candidates: Locator[], timeoutMs = 15_000): Promise<Locator> {
  const deadline = Date.now() + timeoutMs;
  // Poll across locators until one becomes visible.
  while (Date.now() < deadline) {
    for (const loc of candidates) {
      if (await loc.isVisible().catch(() => false)) return loc;
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  // Return the first candidate to get a useful error message from expect().
  return candidates[0];
}

export async function fillLoginForm(page: Page, email: string, password: string) {
  const emailBox = await firstVisible([
    page.getByPlaceholder(/enter email|email/i).first(),
    page.locator('input[type="email"]').first(),
    page.locator('input[name*="email" i], input[id*="email" i]').first(),
    page.getByRole('textbox', { name: /email/i }).first(),
  ]);

  const passwordBox = await firstVisible([
    page.getByPlaceholder(/enter password|password/i).first(),
    page.locator('input[type="password"]').first(),
    page.locator('input[name*="password" i], input[id*="password" i]').first(),
    page.getByRole('textbox', { name: /password/i }).first(),
  ]);

  await expect(emailBox).toBeVisible();
  await emailBox.fill(email);
  await expect(passwordBox).toBeVisible();
  await passwordBox.fill(password);
}

export async function submitLogin(page: Page) {
  const button = page
    .getByRole('button', { name: /continue|log in|login|sign in/i })
    .first();
  await expect(button).toBeVisible();
  await button.click();
}

export type OtpHandlingResult = 'not_required' | 'required_but_missing' | 'handled';

export async function maybeHandleOtp(page: Page, otp?: string): Promise<OtpHandlingResult> {
  // Detect common OTP/verification UIs.
  const otpHeading = page.getByRole('heading', { name: /verification|verify|code|otp/i }).first();
  const otpInput = page
    .getByLabel(/code|otp|verification/i)
    .first()
    .or(page.getByPlaceholder(/code|otp/i).first())
    .or(page.locator('input[autocomplete="one-time-code"]').first())
    .or(page.locator('input[maxlength="6"]').first());

  const isOtp =
    (await otpHeading.isVisible().catch(() => false)) ||
    (await otpInput.isVisible().catch(() => false));

  if (!isOtp) return 'not_required';
  await expect(otpInput).toBeVisible({ timeout: 20_000 });

  // If OTP is provided via env var, type it; otherwise wait for manual GUI entry.
  if (otp && otp.trim().length > 0) {
    await otpInput.fill(otp.trim());

    const verifyButton = page.getByRole('button', { name: /verify|continue|submit/i }).first();
    if (await verifyButton.isVisible().catch(() => false)) {
      await verifyButton.click();
    }
    return 'handled';
  }

  // Manual mode: user will type OTP in the opened Chrome window.
  // Wait until the OTP input disappears OR we leave OTP route/state.
  try {
    await expect(otpInput).toHaveCount(0, { timeout: 300_000 });
    return 'handled';
  } catch {
    return 'required_but_missing';
  }
}

export async function expectLoginFailed(page: Page) {
  // Generic, resilient error checks.
  const errorText = page.getByText(/invalid|incorrect|failed|credentials|required|error/i).first();
  await expect(errorText).toBeVisible();
}

export async function expectLoginSucceeded(page: Page) {
  // Prefer a positive signal: the login heading should disappear after success.
  // Fallback to URL change if heading is not present in some variants.
  const loginHeading = page.getByRole('heading', { name: /login to applynote/i }).first();

  // Wait a bit for navigation/transition.
  await page.waitForTimeout(500);

  if (await loginHeading.isVisible().catch(() => false)) {
    await expect(loginHeading).toHaveCount(0, { timeout: 20_000 });
    return;
  }

  // If the heading isn't detectable, at least ensure we're not on a "login-ish" URL.
  await expect(page).not.toHaveURL(/login|signin|sign-in/i, { timeout: 20_000 });
}

