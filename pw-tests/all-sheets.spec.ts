import { expect, test } from '@playwright/test';
import {
  ADMIN_EMAIL,
  ADMIN_OTP,
  ADMIN_PASSWORD,
  expectLoginFailed,
  expectLoginSucceeded,
  fillLoginForm,
  gotoAdminLogin,
  maybeHandleOtp,
  submitLogin,
} from './helpers/admin-console';
import { fetchSheetXlsx, extractTestCasesFromWorkbookXlsx } from './helpers/sheet-xlsx';

const MANUAL_OTP = (process.env.MANUAL_OTP ?? '').trim() === '1';

test.describe('Google Sheet (XLSX export): all worksheets', () => {
  test('every worksheet is readable and has 0+ TC rows', async ({ request }) => {
    let xlsx: Buffer;
    try {
      xlsx = await fetchSheetXlsx(request);
    } catch (e) {
      test.skip(true, (e as Error).message);
      return;
    }

    const bySheet = extractTestCasesFromWorkbookXlsx(xlsx);
    const names = Object.keys(bySheet);
    expect(names.length).toBeGreaterThan(0);

    // Helpful: assert at least one sheet has test cases.
    const total = names.reduce((acc, n) => acc + bySheet[n].length, 0);
    expect(total).toBeGreaterThan(0);
  });

  test.describe('Admin worksheet (TC01–TC03 if present)', () => {
    test('TC01 - Valid Admin Login', async ({ page, request }) => {
      test.skip(!ADMIN_EMAIL || !ADMIN_PASSWORD, 'Set ADMIN_EMAIL and ADMIN_PASSWORD env vars to run login tests.');

      const xlsx = await fetchSheetXlsx(request);
      const bySheet = extractTestCasesFromWorkbookXlsx(xlsx);
      const adminCases = bySheet['Admin'] ?? [];
      test.skip(adminCases.length === 0, 'Admin sheet has no TC rows (or header not detected).');
      test.skip(!adminCases.some((c) => c.testCaseId.toLowerCase() === 'tc01'), 'TC01 not found in Admin sheet.');

      await gotoAdminLogin(page);
      await fillLoginForm(page, ADMIN_EMAIL!, ADMIN_PASSWORD!);
      await submitLogin(page);
      const otpResult = await maybeHandleOtp(page, ADMIN_OTP);
      if (otpResult === 'required_but_missing') {
        if (MANUAL_OTP) {
          await page.pause();
        }
        test.skip(true, 'OTP required. Set ADMIN_OTP env var, or run with MANUAL_OTP=1 to enter OTP in the GUI.');
      }
      await expectLoginSucceeded(page);
    });

    test('TC02 - Invalid Password', async ({ page, request }) => {
      test.skip(!ADMIN_EMAIL || !ADMIN_PASSWORD, 'Set ADMIN_EMAIL and ADMIN_PASSWORD env vars to run login tests.');

      const xlsx = await fetchSheetXlsx(request);
      const bySheet = extractTestCasesFromWorkbookXlsx(xlsx);
      const adminCases = bySheet['Admin'] ?? [];
      test.skip(adminCases.length === 0, 'Admin sheet has no TC rows (or header not detected).');
      test.skip(!adminCases.some((c) => c.testCaseId.toLowerCase() === 'tc02'), 'TC02 not found in Admin sheet.');

      await gotoAdminLogin(page);
      await fillLoginForm(page, ADMIN_EMAIL!, `${ADMIN_PASSWORD!}-wrong`);
      await submitLogin(page);
      await expectLoginFailed(page);
    });

    test('TC03 - Empty Fields', async ({ page, request }) => {
      const xlsx = await fetchSheetXlsx(request);
      const bySheet = extractTestCasesFromWorkbookXlsx(xlsx);
      const adminCases = bySheet['Admin'] ?? [];
      test.skip(adminCases.length === 0, 'Admin sheet has no TC rows (or header not detected).');
      test.skip(!adminCases.some((c) => c.testCaseId.toLowerCase() === 'tc03'), 'TC03 not found in Admin sheet.');

      await gotoAdminLogin(page);
      await submitLogin(page);
      await expectLoginFailed(page);
    });
  });
});

