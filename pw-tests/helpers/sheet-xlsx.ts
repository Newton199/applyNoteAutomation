import type { APIRequestContext } from '@playwright/test';
import * as XLSX from 'xlsx';

import { DEFAULT_SHEET_ID, type SheetTestCase } from './sheet';

function normalizeCell(s: unknown): string {
  return String(s ?? '').replace(/\s+/g, ' ').trim();
}

function toLower(s: string): string {
  return normalizeCell(s).toLowerCase();
}

export async function fetchSheetXlsx(
  request: APIRequestContext,
  opts?: { sheetId?: string }
): Promise<Buffer> {
  const sheetId = opts?.sheetId ?? DEFAULT_SHEET_ID;
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`;
  const res = await request.get(url);

  if (!res.ok()) {
    throw new Error(`Failed to fetch sheet XLSX: HTTP ${res.status()}`);
  }

  const buf = await res.body();

  // If not public, Google often returns HTML.
  const sniff = buf.subarray(0, Math.min(buf.length, 200)).toString('utf8').toLowerCase();
  if (sniff.includes('<html') || sniff.includes('service login')) {
    throw new Error('Sheet XLSX export returned HTML (likely requires auth). Publish the sheet or allow public access.');
  }

  return buf;
}

export type WorkbookTestCases = Record<string, SheetTestCase[]>;

export function extractTestCasesFromWorkbookXlsx(xlsxBuffer: Buffer): WorkbookTestCases {
  const wb = XLSX.read(xlsxBuffer, { type: 'buffer' });
  const result: WorkbookTestCases = {};

  for (const sheetName of wb.SheetNames) {
    const ws = wb.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false }) as unknown[][];

    // Find header row that contains "Test Case ID" and "Test Steps".
    let headerIdx = -1;
    for (let i = 0; i < rows.length; i++) {
      const joined = rows[i].map((c) => toLower(String(c ?? ''))).join(' | ');
      if (joined.includes('test case id') && joined.includes('test steps')) {
        headerIdx = i;
        break;
      }
    }

    if (headerIdx === -1) {
      result[sheetName] = [];
      continue;
    }

    const header = (rows[headerIdx] ?? []).map((h) => toLower(String(h ?? '')));
    const col = (name: string) => header.findIndex((h) => h === name.toLowerCase());

    const idxModule = col('module');
    const idxId = col('test case id');
    const idxScenario = col('test scanario') !== -1 ? col('test scanario') : col('test scenario');
    const idxSteps = col('test steps');
    const idxExpected = col('expected result');
    const idxStatus = col('status');

    const out: SheetTestCase[] = [];
    for (let r = headerIdx + 1; r < rows.length; r++) {
      const row = rows[r] ?? [];
      const id = normalizeCell(row[idxId]);
      if (!id) continue;
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

    result[sheetName] = out;
  }

  return result;
}

