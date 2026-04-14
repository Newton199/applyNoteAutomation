import type { APIRequestContext } from '@playwright/test';

export const DEFAULT_SHEET_ID = '1k5ar5ZMYLizueq-aRRmdklBFssiqdXUfuTcG1_-moOk';

export type SheetTestCase = {
  module?: string;
  testCaseId: string;
  testScenario?: string;
  testSteps?: string;
  expectedResult?: string;
  status?: string;
};

function parseCsvLine(line: string): string[] {
  // Minimal CSV parser (handles quoted fields and escaped quotes).
  const out: string[] = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (inQuotes) {
      if (ch === '"') {
        const next = line[i + 1];
        if (next === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
      continue;
    }

    if (ch === ',') {
      out.push(cur);
      cur = '';
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
      continue;
    }

    cur += ch;
  }

  out.push(cur);
  return out;
}

function normalizeCell(s: string | undefined): string {
  return (s ?? '').replace(/\s+/g, ' ').trim();
}

export async function fetchSheetCsv(
  request: APIRequestContext,
  opts?: { sheetId?: string; gid?: string }
): Promise<string> {
  const sheetId = opts?.sheetId ?? DEFAULT_SHEET_ID;
  const gidParam = opts?.gid ? `&gid=${encodeURIComponent(opts.gid)}` : '';
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv${gidParam}`;
  const res = await request.get(url);

  if (!res.ok()) {
    throw new Error(`Failed to fetch sheet CSV: HTTP ${res.status()}`);
  }

  const body = await res.text();
  const contentType = (res.headers()['content-type'] || '').toLowerCase();
  if (contentType.includes('text/html') || /<html/i.test(body)) {
    throw new Error('Sheet CSV export returned HTML (likely requires auth). Publish the sheet or allow public access.');
  }

  return body;
}

export function extractTestCasesFromCsv(csv: string): SheetTestCase[] {
  const lines = csv.split(/\r?\n/).filter((l) => l.length > 0);
  const rows = lines.map(parseCsvLine);

  // Find the header row that contains "Test Case ID" and "Test Steps".
  let headerIdx = -1;
  for (let i = 0; i < rows.length; i++) {
    const joined = rows[i].map((c) => normalizeCell(c).toLowerCase()).join(' | ');
    if (joined.includes('test case id') && joined.includes('test steps')) {
      headerIdx = i;
      break;
    }
  }

  if (headerIdx === -1) return [];

  const header = rows[headerIdx].map((h) => normalizeCell(h).toLowerCase());
  const col = (name: string) => header.findIndex((h) => h === name.toLowerCase());

  const idxModule = col('module');
  const idxId = col('test case id');
  const idxScenario = col('test scanario') !== -1 ? col('test scanario') : col('test scenario');
  const idxSteps = col('test steps');
  const idxExpected = col('expected result');
  const idxStatus = col('status');

  const out: SheetTestCase[] = [];

  for (let r = headerIdx + 1; r < rows.length; r++) {
    const row = rows[r];
    const id = normalizeCell(row[idxId]);
    if (!id) continue;

    // Stop if we reached a new section header that isn't a TC row.
    if (!/^tc\d+/i.test(id)) continue;

    out.push({
      module: normalizeCell(row[idxModule]),
      testCaseId: id,
      testScenario: normalizeCell(row[idxScenario]),
      testSteps: normalizeCell(row[idxSteps]),
      expectedResult: normalizeCell(row[idxExpected]),
      status: normalizeCell(row[idxStatus]),
    });
  }

  return out;
}

export function findByTestCaseId(testCases: SheetTestCase[], id: string): SheetTestCase | undefined {
  const target = id.trim().toLowerCase();
  return testCases.find((tc) => tc.testCaseId.trim().toLowerCase() === target);
}

