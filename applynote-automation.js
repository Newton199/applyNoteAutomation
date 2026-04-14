const { chromium } = require('playwright');
const chalk = require('chalk');
const ExcelReader = require('./excel-reader');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

class ApplyNoteAutomation {
    constructor(options = {}) {
        this.headless = process.env.HEADLESS !== 'false';
        this.browser = null;
        this.context = null;
        this.page = null;
        this.testResults = [];
        this.screenshotDir = './screenshots';
        this.reportDir = './reports';
        
        this.baseUrls = {
            student: 'https://applynote.com/',
            admin: 'https://console.applynote.com/'
        };

        if (!fs.existsSync(this.screenshotDir)) {
            fs.mkdirSync(this.screenshotDir, { recursive: true });
        }
        if (!fs.existsSync(this.reportDir)) {
            fs.mkdirSync(this.reportDir, { recursive: true });
        }
    }

    async initialize() {
        this.browser = await chromium.launch({ 
            headless: this.headless,
            slowMo: 500
        });
        this.context = await this.browser.newContext({
            viewport: { width: 1280, height: 720 }
        });
        this.page = await this.context.newPage();
        return this;
    }

    async close() {
        if (this.browser) await this.browser.close();
    }

    async navigateTo(appType) {
        const url = this.baseUrls[appType];
        await this.page.goto(url, { waitUntil: 'networkidle' });
        console.log(chalk.blue(`Navigated to ${appType} app: ${url}`));
    }

    async takeScreenshot(name) {
        const timestamp = format(new Date(), 'yyyyMMdd-HHmmss');
        const filename = `${name}-${timestamp}.png`;
        await this.page.screenshot({ 
            path: path.join(this.screenshotDir, filename),
            fullPage: true 
        });
        return filename;
    }

    async executeAction(action, selector, value = '') {
        switch(action.toLowerCase().trim()) {
            case 'click':
                await this.page.click(selector);
                break;
            case 'type':
            case 'enter':
            case 'input':
                await this.page.fill(selector, value);
                break;
            case 'select':
                await this.page.selectOption(selector, value);
                break;
            case 'wait':
                await this.page.waitForTimeout(parseInt(value) || 2000);
                break;
            case 'waitfor':
                await this.page.waitForSelector(selector, { state: 'visible' });
                break;
            case 'verifytext':
                const text = await this.page.textContent(selector);
                return text.includes(value);
            case 'verifyvisible':
                return await this.page.isVisible(selector);
            case 'verifyexists':
                return await this.page.$(selector) !== null;
            case 'gettext':
                return await this.page.textContent(selector);
            case 'getvalue':
                return await this.page.inputValue(selector);
            case 'press':
                await this.page.press(selector, value);
                break;
            case 'scrollintoview':
                await this.page.$eval(selector, el => el.scrollIntoView());
                break;
            default:
                throw new Error(`Unknown action: ${action}`);
        }
        return true;
    }

    async runTestCasesFromExcel(excelPath, sheetName = 'TestCases') {
        const excelReader = new ExcelReader(excelPath);
        const testCases = excelReader.getTestCases(sheetName);
        
        console.log(chalk.cyan(`\nFound ${testCases.length} test cases in ${excelPath}`));
        
        for (const testCase of testCases) {
            if (!testCase.enabled) {
                console.log(chalk.gray(`⏭️  Skipping disabled test: ${testCase.test_case_id} - ${testCase.test_case_name}`));
                continue;
            }

            console.log(chalk.yellow(`\n▶️  Running: ${testCase.test_case_id} - ${testCase.test_case_name}`));
            
            const result = {
                ...testCase,
                status: 'passed',
                error: null,
                screenshot: null,
                startTime: new Date(),
                endTime: null
            };

            try {
                await this.executeAction(
                    testCase.action,
                    testCase.selector,
                    testCase.value || testCase.expected_result
                );

                if (testCase.expected_result && testCase.action.startsWith('verify')) {
                    const actual = await this.executeAction(
                        testCase.action,
                        testCase.selector,
                        testCase.expected_result
                    );
                    
                    if (!actual) {
                        throw new Error(`Verification failed. Expected: ${testCase.expected_result}`);
                    }
                }

                console.log(chalk.green(`✅ Passed: ${testCase.test_case_id}`));
                
            } catch (error) {
                result.status = 'failed';
                result.error = error.message;
                result.screenshot = await this.takeScreenshot(`fail-${testCase.test_case_id}`);
                console.log(chalk.red(`❌ Failed: ${testCase.test_case_id} - ${error.message}`));
            }

            result.endTime = new Date();
            result.duration = result.endTime - result.startTime;
            this.testResults.push(result);
        }

        return this.testResults;
    }

    generateReport() {
        const passed = this.testResults.filter(r => r.status === 'passed').length;
        const failed = this.testResults.filter(r => r.status === 'failed').length;
        const total = this.testResults.length;

        console.log(chalk.cyan('\n══════════════════════════════════════════'));
        console.log(chalk.cyan('           TEST EXECUTION SUMMARY        '));
        console.log(chalk.cyan('══════════════════════════════════════════'));
        console.log(chalk.white(`Total Test Cases: ${total}`));
        console.log(chalk.green(`Passed:           ${passed}`));
        console.log(chalk.red(`Failed:           ${failed}`));
        console.log(chalk.yellow(`Success Rate:     ${((passed/total)*100).toFixed(2)}%`));
        console.log(chalk.cyan('══════════════════════════════════════════'));

        const reportPath = path.join(this.reportDir, `test-report-${format(new Date(), 'yyyyMMdd-HHmmss')}.json`);
        fs.writeFileSync(reportPath, JSON.stringify(this.testResults, null, 2));
        console.log(chalk.blue(`\nFull report saved to: ${reportPath}`));
    }
}

module.exports = ApplyNoteAutomation;