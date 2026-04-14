const { chromium } = require('playwright');
const chalk = require('chalk');
const TestExcelReader = require('./test-excel-reader');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

class TestAutomation {
    constructor(options = {}) {
        this.headless = process.env.HEADLESS !== 'false';
        this.browser = null;
        this.context = null;
        this.page = null;
        this.testResults = [];
        this.screenshotDir = './screenshots';
        this.reportDir = './reports';
        
        this.credentials = {
            admin: {
                email: 'kaphlenerob@gmail.com',
                password: 'applynote123',
                url: 'https://console.applynote.com/login'
            },
            student: {
                email: 'kaphleraj98@gmail.com',
                password: 'defaultpassword',
                url: 'https://applynote.com/'
            }
        };

        // Enhanced selectors for both admin and student
        this.selectors = {
            login: {
                email: [
                    'input[type="email"]',
                    'input[name="email"]',
                    'input[placeholder*="email" i]',
                    'input[id*="email" i]',
                    'input[placeholder*="Email" i]',
                    'input[name*="email" i]',
                    'input[class*="email" i]',
                    '//input[@type="email"]',
                    '//input[contains(@placeholder, "email")]',
                    '//input[contains(@name, "email")]',
                    '//input[contains(@placeholder, "Email")]',
                    '//input[contains(@name, "email")]',
                    '//input[contains(@class, "email")]'
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
                ],
                otp: [
                    'input[placeholder*="OTP" i]',
                    'input[name="otp"]',
                    'input[id*="otp" i]',
                    'input[maxlength="6"]',
                    'input[maxlength="4"]',
                    '//input[contains(@placeholder, "OTP")]',
                    '//input[@name="otp"]',
                    '//input[contains(@id, "otp")]'
                ]
            },
            common: {
                button: [
                    'button',
                    'input[type="button"]',
                    'input[type="submit"]',
                    '.btn',
                    '//button',
                    '//input[@type="button"]',
                    '//input[@type="submit"]'
                ],
                input: [
                    'input[type="text"]',
                    'input[type="email"]',
                    'textarea',
                    'input:not([type="checkbox"]):not([type="radio"])',
                    '//input[@type="text"]',
                    '//input[@type="email"]',
                    '//textarea'
                ],
                link: [
                    'a',
                    'a[href]',
                    '//a',
                    '//a[@href]'
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

    async login(appType) {
        const creds = this.credentials[appType];
        console.log(chalk.blue(`\nLogging into ${appType} app with email: ${creds.email}`));
        
        await this.page.goto(creds.url, { waitUntil: 'networkidle', timeout: 30000 });
        await this.takeScreenshot(`${appType}-login-page`);
        
        try {
            // Find and fill email field
            const emailElement = await this.findElement(this.selectors.login.email);
            await emailElement.fill(creds.email);
            console.log(chalk.green('Email entered successfully'));
            await this.page.waitForTimeout(1000);
            
            // Find and fill password field
            const passwordElement = await this.findElement(this.selectors.login.password);
            await passwordElement.fill(creds.password);
            console.log(chalk.green('Password entered successfully'));
            await this.page.waitForTimeout(1000);
            
            // Find and click submit button
            const submitElement = await this.findElement(this.selectors.login.submit);
            await submitElement.click();
            console.log(chalk.green('Login button clicked'));
            await this.page.waitForTimeout(3000);
            
            await this.takeScreenshot(`${appType}-after-login`);
            
            // Check if OTP is required
            try {
                const otpElement = await this.findElement(this.selectors.login.otp, 2000);
                console.log(chalk.yellow('OTP required. Please enter OTP manually...'));
                console.log(chalk.cyan('You have 2 minutes to enter the OTP. Press Enter when done...'));
                
                // Wait for manual OTP entry (2 minutes)
                await this.page.waitForTimeout(120000);
                
                await this.takeScreenshot(`${appType}-after-otp`);
            } catch (e) {
                console.log(chalk.green('No OTP required - login successful'));
            }
            
            console.log(chalk.green(`Successfully logged into ${appType} app`));
            return true;
            
        } catch (error) {
            await this.takeScreenshot(`${appType}-login-error`);
            throw new Error(`Login failed: ${error.message}`);
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
                case 'hover':
                    await this.page.hover(selector, { timeout: 10000 });
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

    // Parse test steps from your Excel format
    parseTestSteps(testSteps) {
        const steps = [];
        const lines = testSteps.split('.').filter(line => line.trim());
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            const step = {
                action: '',
                selector: '',
                value: '',
                description: trimmedLine
            };
            
            // Parse different step patterns
            if (trimmedLine.toLowerCase().includes('navigate')) {
                step.action = 'navigate';
                const urlMatch = trimmedLine.match(/navigate\s+to\s+(.+?)(?:\.|$)/i);
                if (urlMatch) {
                    step.value = urlMatch[1];
                }
            } else if (trimmedLine.toLowerCase().includes('enter') || trimmedLine.toLowerCase().includes('type')) {
                step.action = 'type';
                // Extract email
                const emailMatch = trimmedLine.match(/enter\s+email:\s*(.+?)(?:\.|$)/i);
                if (emailMatch) {
                    step.value = emailMatch[1];
                    step.selector = this.selectors.login.email.join(', ');
                }
                // Extract password
                const passwordMatch = trimmedLine.match(/enter\s+password:\s*(.+?)(?:\.|$)/i);
                if (passwordMatch) {
                    step.value = passwordMatch[1];
                    step.selector = this.selectors.login.password.join(', ');
                }
            } else if (trimmedLine.toLowerCase().includes('click')) {
                step.action = 'click';
                step.selector = this.selectors.login.submit.join(', ');
            } else if (trimmedLine.toLowerCase().includes('upload')) {
                step.action = 'upload';
                step.selector = 'input[type="file"]';
            } else if (trimmedLine.toLowerCase().includes('wait')) {
                step.action = 'wait';
                step.value = '2000';
            }
            
            if (step.action) {
                steps.push(step);
            }
        }
        
        return steps;
    }

    async runTestCases(excelPath, testType = 'admin') {
        const excelReader = new TestExcelReader(excelPath);
        let testCases;
        
        if (testType === 'test') {
            testCases = excelReader.getTESTTestCases();
            console.log(chalk.cyan(`\nFound ${testCases.length} TEST 01-198 test cases`));
        } else {
            testCases = excelReader.getAdminTestCases();
            console.log(chalk.cyan(`\nFound ${testCases.length} admin test cases`));
        }
        
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
                if (testCase.test_steps) {
                    console.log(chalk.blue(`Test Steps: ${testCase.test_steps}`));
                    
                    const steps = this.parseTestSteps(testCase.test_steps);
                    console.log(chalk.blue(`Parsed ${steps.length} steps`));
                    
                    for (const step of steps) {
                        console.log(chalk.cyan(`  -> ${step.description}`));
                        
                        if (step.action === 'navigate') {
                            await this.page.goto(step.value, { waitUntil: 'networkidle' });
                        } else if (step.selector) {
                            await this.executeAction(step.action, step.selector, step.value);
                        } else {
                            await this.page.waitForTimeout(1000);
                        }
                        
                        // Take screenshot after each step
                        await this.takeScreenshot(`step-${testCase.test_case_id}-${steps.indexOf(step)}`);
                    }
                } else {
                    // Take screenshot for UI compliance tests
                    await this.takeScreenshot(`ui-check-${testCase.test_case_id}`);
                    console.log(chalk.blue('UI compliance check - screenshot taken'));
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
        console.log(chalk.cyan('           TEST EXECUTION SUMMARY        '));
        console.log(chalk.cyan('\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550'));
        console.log(chalk.white(`Total Test Cases: ${total}`));
        console.log(chalk.green(`Passed:           ${passed}`));
        console.log(chalk.red(`Failed:           ${failed}`));
        console.log(chalk.yellow(`Success Rate:     ${((passed/total)*100).toFixed(2)}%`));
        console.log(chalk.cyan('\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550'));

        const reportPath = path.join(this.reportDir, `test-report-${format(new Date(), 'yyyyMMdd-HHmmss')}.json`);
        fs.writeFileSync(reportPath, JSON.stringify(this.testResults, null, 2));
        console.log(chalk.blue(`\nFull report saved to: ${reportPath}`));
    }
}

module.exports = TestAutomation;
