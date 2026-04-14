const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

class ExcelReader {
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

    getTestCases(sheetName = 'TestCases') {
        const rawData = this.getSheetData(sheetName, { header: 1 });
        if (rawData.length < 2) return [];

        const headers = rawData[0].map(h => h.toString().trim().toLowerCase().replace(/\s+/g, '_'));
        const testCases = [];

        for (let i = 1; i < rawData.length; i++) {
            const row = rawData[i];
            const testCase = {};
            
            headers.forEach((header, index) => {
                testCase[header] = row[index] !== undefined ? row[index] : '';
            });

            if (testCase.test_case_id && testCase.test_case_id.toString().trim()) {
                testCase.enabled = !['no', 'false', '0', 'disabled'].includes(
                    String(testCase.enabled || 'yes').toLowerCase()
                );
                testCases.push(testCase);
            }
        }

        return testCases;
    }

    getTestData(sheetName = 'TestData') {
        const rawData = this.getSheetData(sheetName, { header: 1 });
        if (rawData.length < 2) return {};

        const testData = {};
        for (let i = 1; i < rawData.length; i++) {
            const key = String(rawData[i][0] || '').trim();
            const value = rawData[i][1];
            if (key) testData[key] = value;
        }
        return testData;
    }
}

module.exports = ExcelReader;