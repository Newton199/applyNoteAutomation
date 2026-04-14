const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

class TestExcelReader {
    constructor(filePath) {
        this.filePath = filePath;
        this.workbook = null;
    }

    loadFile() {
        if (!fs.existsSync(this.filePath)) {
            throw new Error(`Excel file not found: ${this.filePath}`);
        }
        this.workbook = XLSX.readFile(this.filePath);
        return this;
    }

    getSheetNames() {
        if (!this.workbook) this.loadFile();
        return this.workbook.SheetNames;
    }

    getSheetData(sheetName, options = {}) {
        if (!this.workbook) this.loadFile();
        const sheet = this.workbook.Sheets[sheetName];
        if (!sheet) throw new Error(`Sheet not found: ${sheetName}`);
        
        return XLSX.utils.sheet_to_json(sheet, {
            header: options.header || 1,
            defval: options.defval || ''
        });
    }

    getTestCases(sheetName = 'Test') {
        const rawData = this.getSheetData(sheetName, { header: 1 });
        if (rawData.length < 5) return [];

        const testCases = [];
        
        // Find header row (usually row 4)
        const headerRow = 3; // 0-indexed
        const headers = rawData[headerRow].map(h => h.toString().trim().toLowerCase().replace(/\s+/g, '_'));

        for (let i = headerRow + 1; i < rawData.length; i++) {
            const row = rawData[i];
            if (!row || row.length === 0 || !row[0]) continue; // Skip empty rows

            const testCase = {
                module: row[0] || '',
                test_case_id: row[1] || '',
                test_case_name: row[2] || '',
                test_steps: row[3] || '',
                expected_result: row[4] || '',
                status: row[5] || '',
                enabled: ['pass', 'passed', 'p', 'yes', 'true', '1'].includes(String(row[5] || '').toLowerCase().replace(/[^a-z0-9]/g, ''))
            };

            // Include all test cases, but filter for TEST pattern later
            if (testCase.test_case_id && testCase.test_case_id.toString().trim()) {
                testCases.push(testCase);
            }
        }

        return testCases;
    }

    // Get only TEST 01-198 pattern test cases
    getTESTTestCases(sheetName = 'Test') {
        const allTestCases = this.getTestCases(sheetName);
        
        // Filter for TEST pattern (TEST 01, TEST 02, etc.)
        const testPatternCases = allTestCases.filter(tc => {
            const id = tc.test_case_id.toString().trim();
            return id.match(/TEST\s*\d+/i);
        });

        // Sort by test number
        testPatternCases.sort((a, b) => {
            const numA = parseInt(a.test_case_id.toString().match(/TEST\s*(\d+)/i)?.[1] || 0);
            const numB = parseInt(b.test_case_id.toString().match(/TEST\s*(\d+)/i)?.[1] || 0);
            return numA - numB;
        });

        return testPatternCases;
    }

    // Get admin test cases (non-TEST pattern)
    getAdminTestCases(sheetName = 'Test') {
        const allTestCases = this.getTestCases(sheetName);
        
        // Filter out TEST pattern cases
        const adminCases = allTestCases.filter(tc => {
            const id = tc.test_case_id.toString().trim();
            return !id.match(/TEST\s*\d+/i);
        });

        return adminCases;
    }
}

module.exports = TestExcelReader;
