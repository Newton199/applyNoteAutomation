import { test } from '@playwright/test';
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
import { extractTestCasesFromCsv, fetchSheetCsv, findByTestCaseId } from './helpers/sheet';

const MANUAL_OTP = (process.env.MANUAL_OTP ?? '').trim() === '1';

test.describe('Admin Console (data-driven from Google Sheet)', () => {
  test('TC01 - Valid Admin Login (from sheet)', async ({ page, request }) => {
    test.skip(!ADMIN_EMAIL || !ADMIN_PASSWORD, 'Set ADMIN_EMAIL and ADMIN_PASSWORD env vars to run login tests.');

    const csv = await fetchSheetCsv(request);
    const cases = extractTestCasesFromCsv(csv);
    const tc = findByTestCaseId(cases, 'TC01');
    test.skip(!tc, 'TC01 not found in sheet CSV export.');

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

  test('TC02 - Invalid Password (from sheet)', async ({ page, request }) => {
    test.skip(!ADMIN_EMAIL || !ADMIN_PASSWORD, 'Set ADMIN_EMAIL and ADMIN_PASSWORD env vars to run login tests.');

    const csv = await fetchSheetCsv(request);
    const cases = extractTestCasesFromCsv(csv);
    const tc = findByTestCaseId(cases, 'TC02');
    test.skip(!tc, 'TC02 not found in sheet CSV export.');

    await gotoAdminLogin(page);
    await fillLoginForm(page, ADMIN_EMAIL!, `${ADMIN_PASSWORD!}-wrong`);
    await submitLogin(page);
    await expectLoginFailed(page);
  });

  test('TC03 - Empty Fields (from sheet)', async ({ page, request }) => {
    const csv = await fetchSheetCsv(request);
    const cases = extractTestCasesFromCsv(csv);
    const tc = findByTestCaseId(cases, 'TC03');
    test.skip(!tc, 'TC03 not found in sheet CSV export.');

    await gotoAdminLogin(page);
    await submitLogin(page);
    await expectLoginFailed(page);
  });
});

