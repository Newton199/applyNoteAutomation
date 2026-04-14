const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

class CustomExcelReader {
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

    getAdminTestCases() {
        const rawData = this.getSheetData('Admin', { header: 1 });
        if (rawData.length < 4) return [];

        const testCases = [];
        
        // Find the header row (usually row 3)
        const headerRow = 2; // 0-indexed
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
                comments: row[6] || '',
                enabled: ['pass', 'passed', 'p', 'yes', 'true', '1'].includes(String(row[5] || '').toLowerCase().replace(/[^a-z0-9]/g, ''))
            };

            if (testCase.test_case_id && testCase.test_case_id.toString().trim()) {
                testCases.push(testCase);
            }
        }

        return testCases;
    }

    getWebsiteTestCases() {
        const rawData = this.getSheetData('Website', { header: 1 });
        if (rawData.length < 4) return [];

        const testCases = [];
        
        // Find the header row (usually row 3)
        const headerRow = 2; // 0-indexed
        const headers = rawData[headerRow].map(h => h.toString().trim().toLowerCase().replace(/\s+/g, '_'));

        for (let i = headerRow + 1; i < rawData.length; i++) {
            const row = rawData[i];
            if (!row || row.length === 0 || !row[0]) continue; // Skip empty rows

            const testCase = {
                component: row[0] || '',
                figma_design: row[1] || '',
                live_ui_observation: row[2] || '',
                match_status: row[3] || '',
                notes: row[4] || '',
                test_case_id: `WEB_${i}`,
                test_case_name: row[0] || `Website Test ${i}`,
                action: 'verifytext',
                selector: 'body',
                expected_result: row[1] || '',
                enabled: ['pass', 'passed', 'p', 'yes', 'true', '1'].includes(String(row[3] || '').toLowerCase().replace(/[^a-z0-9]/g, ''))
            };

            if (testCase.component && testCase.component.toString().trim()) {
                testCases.push(testCase);
            }
        }

        return testCases;
    }

    getStudentWebUITestCases() {
        const rawData = this.getSheetData('Student WEB UI', { header: 1 });
        if (rawData.length < 4) return [];

        const testCases = [];
        
        // Find the header row (usually row 3)
        const headerRow = 2; // 0-indexed
        const headers = rawData[headerRow].map(h => h.toString().trim().toLowerCase().replace(/\s+/g, '_'));

        for (let i = headerRow + 1; i < rawData.length; i++) {
            const row = rawData[i];
            if (!row || row.length === 0 || !row[0]) continue; // Skip empty rows

            const testCase = {
                module_component: row[0] || '',
                figma_design: row[1] || '',
                live_ui_observation: row[2] || '',
                match_status: row[3] || '',
                notes: row[4] || '',
                test_case_id: `STU_WEB_${i}`,
                test_case_name: row[0] || `Student Web UI Test ${i}`,
                action: 'verifytext',
                selector: 'body',
                expected_result: row[1] || '',
                enabled: ['pass', 'passed', 'p', 'yes', 'true', '1'].includes(String(row[3] || '').toLowerCase().replace(/[^a-z0-9]/g, ''))
            };

            if (testCase.module_component && testCase.module_component.toString().trim()) {
                testCases.push(testCase);
            }
        }

        return testCases;
    }

    getStudentApplicationTestCases() {
        const rawData = this.getSheetData('Application Student', { header: 1 });
        if (rawData.length < 4) return [];

        const testCases = [];
        
        // Find the header row (usually row 3)
        const headerRow = 2; // 0-indexed
        const headers = rawData[headerRow].map(h => h.toString().trim().toLowerCase().replace(/\s+/g, '_'));

        for (let i = headerRow + 1; i < rawData.length; i++) {
            const row = rawData[i];
            if (!row || row.length === 0 || !row[0]) continue; // Skip empty rows

            const testCase = {
                component: row[0] || '',
                figma_design: row[1] || '',
                live_ui_observation: row[2] || '',
                match_status: row[3] || '',
                notes: row[4] || '',
                test_case_id: `STU_APP_${i}`,
                test_case_name: row[0] || `Student App Test ${i}`,
                action: 'verifytext',
                selector: 'body',
                expected_result: row[1] || '',
                enabled: ['pass', 'passed', 'p', 'yes', 'true', '1'].includes(String(row[3] || '').toLowerCase().replace(/[^a-z0-9]/g, ''))
            };

            if (testCase.component && testCase.component.toString().trim()) {
                testCases.push(testCase);
            }
        }

        return testCases;
    }

    // Generic method to get test cases based on sheet name
    getTestCases(sheetName) {
        switch(sheetName) {
            case 'Admin':
                return this.getAdminTestCases();
            case 'Website':
                return this.getWebsiteTestCases();
            case 'Student WEB UI':
                return this.getStudentWebUITestCases();
            case 'Application Student':
                return this.getStudentApplicationTestCases();
            default:
                return [];
        }
    }
}

module.exports = CustomExcelReader;
