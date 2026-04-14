import { expect, test } from '@playwright/test';
import { DEFAULT_SHEET_ID, extractTestCasesFromCsv, fetchSheetCsv } from './helpers/sheet';

const SHEET_EDIT_URL = `https://docs.google.com/spreadsheets/d/${DEFAULT_SHEET_ID}/edit?usp=sharing`;

test.describe('Google Sheet: ApplyNote QA Script', () => {
  test('loads the sheet UI and shows expected title', async ({ page }) => {
    await page.goto(SHEET_EDIT_URL, { waitUntil: 'domcontentloaded' });

    // Sheets sometimes continues loading for a while; title is a stable signal.
    await expect(page).toHaveTitle(/ApplyNote Qa Script/i);

    // Prefer stable, sheet-specific UI signals (language-independent where possible).
    await expect(page.getByRole('button', { name: 'Admin' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Website' })).toBeVisible();

    // If not authenticated, there is usually a sign-in link (localized in some regions).
    await expect(page.getByRole('link', { name: /sign in|साइन इन/i })).toBeVisible();
  });

  test('CSV export is accessible (if sheet is public) and contains expected test case table', async ({
    request,
  }) => {
    let csv = '';
    try {
      csv = await fetchSheetCsv(request);
    } catch (e) {
      test.skip(true, (e as Error).message);
    }

    const testCases = extractTestCasesFromCsv(csv);
    expect(testCases.length).toBeGreaterThan(0);
    expect(testCases.map((t) => t.testCaseId.toLowerCase())).toContain('tc01');
  });
});

