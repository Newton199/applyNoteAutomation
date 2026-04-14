const { chromium } = require('playwright');
const chalk = require('chalk');
const CustomExcelReader = require('./custom-excel-reader');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

class StudentQAAutomation {
    constructor(options = {}) {
        this.headless = process.env.HEADLESS !== 'false';
        this.browser = null;
        this.context = null;
        this.page = null;
        this.testResults = [];
        this.screenshotDir = './screenshots';
        this.reportDir = './reports';
        
        this.credentials = {
            student: {
                email: 'kaphleraj98@gmail.com',
                password: 'defaultpassword',
                url: 'https://applynote.com/'
            }
        };

        // Student-specific selectors
        this.selectors = {
            // Login selectors
            login: {
                email: [
                    'input[type="email"]',
                    'input[name="email"]',
                    'input[placeholder*="email" i]',
                    'input[id*="email" i]',
                    '//input[@type="email"]',
                    '//input[contains(@placeholder, "email")]',
                    '//input[contains(@name, "email")]'
                ],
                password: [
                    'input[type="password"]',
                    'input[name="password"]',
                    'input[placeholder*="password" i]',
                    'input[id*="password" i]',
                    '//input[@type="password"]',
                    '//input[contains(@placeholder, "password")]',
                    '//input[contains(@name, "password")]'
                ],
                submit: [
                    'button[type="submit"]',
                    'button:has-text("Login")',
                    'button:has-text("Sign In")',
                    'input[type="submit"]',
                    'button:has-text("Log In")',
                    '//button[@type="submit"]',
                    '//button[contains(text(), "Login")]',
                    '//button[contains(text(), "Sign In")]',
                    '//input[@type="submit"]'
                ]
            },
            // Student navigation selectors
            navigation: {
                dashboard: [
                    'nav a:has-text("Dashboard")',
                    'a:has-text("Dashboard")',
                    '//a[contains(text(), "Dashboard")]',
                    '//nav//a[contains(text(), "Dashboard")]'
                ],
                courses: [
                    'nav a:has-text("Courses")',
                    'a:has-text("Courses")',
                    'button:has-text("Courses")',
                    '//a[contains(text(), "Courses")]',
                    '//button[contains(text(), "Courses")]'
                ],
                assignments: [
                    'nav a:has-text("Assignments")',
                    'a:has-text("Assignments")',
                    'button:has-text("Assignments")',
                    '//a[contains(text(), "Assignments")]',
                    '//button[contains(text(), "Assignments")]'
                ],
                profile: [
                    'nav a:has-text("Profile")',
                    'a:has-text("Profile")',
                    'button:has-text("Profile")',
                    '//a[contains(text(), "Profile")]',
                    '//button[contains(text(), "Profile")]'
                ],
                grades: [
                    'nav a:has-text("Grades")',
                    'a:has-text("Grades")',
                    'button:has-text("Grades")',
                    '//a[contains(text(), "Grades")]',
                    '//button[contains(text(), "Grades")]'
                ]
            },
            // Student form selectors
            forms: {
                assignment_upload: [
                    'input[type="file"]',
                    'input[accept*="pdf"]',
                    'input[accept*="doc"]',
                    '//input[@type="file"]',
                    '//input[contains(@accept, "pdf")]'
                ],
                text_input: [
                    'input[type="text"]',
                    'textarea',
                    'input[type="email"]',
                    'input:not([type="checkbox"]):not([type="radio"])',
                    '//input[@type="text"]',
                    '//textarea'
                ],
                dropdown: [
                    'select',
                    'select[formcontrolname]',
                    '.dropdown',
                    '//select',
                    '//div[contains(@class, "dropdown")]'
                ],
                submit_button: [
                    'button[type="submit"]',
                    'button:has-text("Submit")',
                    'button:has-text("Upload")',
                    'input[type="submit"]',
                    '//button[@type="submit"]',
                    '//button[contains(text(), "Submit")]',
                    '//button[contains(text(), "Upload")]'
                ]
            }
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
            slowMo: 500,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        this.context = await this.browser.newContext({
            viewport: { width: 1280, height: 720 },
            ignoreHTTPSErrors: true
        });
        this.page = await this.context.newPage();
        
        this.page.on('pageerror', (error) => {
            console.log(chalk.yellow(`Page error: ${error.message}`));
        });
        
        this.page.on('requestfailed', (request) => {
            console.log(chalk.yellow(`Request failed: ${request.url()}`));
        });
        
        return this;
    }

    async close() {
        if (this.browser) await this.browser.close();
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

    async findElement(selectorList, timeout = 5000) {
        for (const selector of selectorList) {
            try {
                if (selector.startsWith('//')) {
                    const element = await this.page.waitForSelector(`xpath=${selector}`, { timeout: 1000 });
                    if (element) return element;
                } else {
                    const element = await this.page.waitForSelector(selector, { timeout: 1000 });
                    if (element) return element;
                }
            } catch (e) {
                // Continue trying next selector
            }
        }
        throw new Error(`Element not found with any selector: ${selectorList.join(', ')}`);
    }

    async login() {
        const creds = this.credentials.student;
        console.log(chalk.blue(`\nLogging into student app with email: ${creds.email}`));
        
        await this.page.goto(creds.url, { waitUntil: 'networkidle', timeout: 30000 });
        await this.takeScreenshot('student-login-page');
        
        try {
            const emailElement = await this.findElement(this.selectors.login.email);
            await emailElement.fill(creds.email);
            console.log(chalk.green('Email entered successfully'));
            await this.page.waitForTimeout(1000);
            
            const passwordElement = await this.findElement(this.selectors.login.password);
            await passwordElement.fill(creds.password);
            console.log(chalk.green('Password entered successfully'));
            await this.page.waitForTimeout(1000);
            
            const submitElement = await this.findElement(this.selectors.login.submit);
            await submitElement.click();
            console.log(chalk.green('Login button clicked'));
            await this.page.waitForTimeout(3000);
            
            await this.takeScreenshot('student-after-login');
            console.log(chalk.green('Successfully logged into student app'));
            return true;
            
        } catch (error) {
            await this.takeScreenshot('student-login-error');
            throw new Error(`Student login failed: ${error.message}`);
        }
    }

    async executeAction(action, selector, value = '') {
        console.log(chalk.blue(`Executing: ${action} on ${selector} with value: ${value}`));
        
        try {
            switch(action.toLowerCase().trim()) {
                case 'click':
                    await this.page.click(selector, { timeout: 10000 });
                    break;
                case 'type':
                case 'enter':
                case 'input':
                    await this.page.fill(selector, value, { timeout: 10000 });
                    break;
                case 'select':
                    await this.page.selectOption(selector, value, { timeout: 10000 });
                    break;
                case 'wait':
                    await this.page.waitForTimeout(parseInt(value) || 2000);
                    break;
                case 'waitfor':
                    await this.page.waitForSelector(selector, { state: 'visible', timeout: 15000 });
                    break;
                case 'verifytext':
                    const text = await this.page.textContent(selector, { timeout: 10000 });
                    console.log(chalk.blue(`Found text: "${text}"`));
                    return text.includes(value);
                case 'verifyvisible':
                    return await this.page.isVisible(selector, { timeout: 10000 });
                case 'verifyexists':
                    return await this.page.$(selector) !== null;
                case 'gettext':
                    return await this.page.textContent(selector, { timeout: 10000 });
                case 'getvalue':
                    return await this.page.inputValue(selector, { timeout: 10000 });
                case 'press':
                    await this.page.press(selector, value);
                    break;
                case 'upload':
                    await this.page.setInputFiles(selector, value);
                    break;
                default:
                    throw new Error(`Unknown action: ${action}`);
            }
            return true;
        } catch (error) {
            console.log(chalk.red(`Action failed: ${error.message}`));
            throw error;
        }
    }

    async runStudentTests(excelPath, sheetName = 'Student WEB UI') {
        const excelReader = new CustomExcelReader(excelPath);
        const testCases = excelReader.getTestCases(sheetName);
        
        console.log(chalk.cyan(`\nFound ${testCases.length} student test cases in ${sheetName}`));
        
        for (const testCase of testCases) {
            if (!testCase.enabled) {
                console.log(chalk.gray(`\u2239\ufe0f  Skipping disabled test: ${testCase.test_case_id} - ${testCase.test_case_name}`));
                continue;
            }

            console.log(chalk.yellow(`\n\u25b6\ufe0f  Running: ${testCase.test_case_id} - ${testCase.test_case_name}`));
            
            const result = {
                ...testCase,
                status: 'passed',
                error: null,
                screenshot: null,
                startTime: new Date(),
                endTime: null
            };

            try {
                // Student-specific UI compliance testing
                await this.takeScreenshot(`student-ui-${testCase.test_case_id}`);
                console.log(chalk.blue('Student UI compliance check - screenshot taken'));
                
                // Verify student-specific elements
                if (testCase.module_component) {
                    console.log(chalk.blue(`Testing component: ${testCase.module_component}`));
                    
                    // Try to find related elements
                    const componentLower = testCase.module_component.toLowerCase();
                    if (componentLower.includes('dashboard')) {
                        await this.executeAction('waitfor', this.selectors.navigation.dashboard.join(', '));
                    } else if (componentLower.includes('course')) {
                        await this.executeAction('waitfor', this.selectors.navigation.courses.join(', '));
                    } else if (componentLower.includes('assignment')) {
                        await this.executeAction('waitfor', this.selectors.navigation.assignments.join(', '));
                    } else if (componentLower.includes('profile')) {
                        await this.executeAction('waitfor', this.selectors.navigation.profile.join(', '));
                    } else if (componentLower.includes('grade')) {
                        await this.executeAction('waitfor', this.selectors.navigation.grades.join(', '));
                    }
                }

                console.log(chalk.green(`\u2705 Passed: ${testCase.test_case_id}`));
                
            } catch (error) {
                result.status = 'failed';
                result.error = error.message;
                result.screenshot = await this.takeScreenshot(`fail-${testCase.test_case_id}`);
                console.log(chalk.red(`\u274c Failed: ${testCase.test_case_id} - ${error.message}`));
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

        console.log(chalk.cyan('\n\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550'));
        console.log(chalk.cyan('         STUDENT QA TEST SUMMARY        '));
        console.log(chalk.cyan('\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550'));
        console.log(chalk.white(`Total Test Cases: ${total}`));
        console.log(chalk.green(`Passed:           ${passed}`));
        console.log(chalk.red(`Failed:           ${failed}`));
        console.log(chalk.yellow(`Success Rate:     ${((passed/total)*100).toFixed(2)}%`));
        console.log(chalk.cyan('\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550'));

        const reportPath = path.join(this.reportDir, `student-qa-report-${format(new Date(), 'yyyyMMdd-HHmmss')}.json`);
        fs.writeFileSync(reportPath, JSON.stringify(this.testResults, null, 2));
        console.log(chalk.blue(`\nStudent QA report saved to: ${reportPath}`));
    }
}

module.exports = StudentQAAutomation;
