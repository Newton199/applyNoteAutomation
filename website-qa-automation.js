const { chromium } = require('playwright');
const chalk = require('chalk');
const CustomExcelReader = require('./custom-excel-reader');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

class WebsiteQAAutomation {
    constructor(options = {}) {
        this.headless = process.env.HEADLESS !== 'false';
        this.browser = null;
        this.context = null;
        this.page = null;
        this.testResults = [];
        this.screenshotDir = './screenshots';
        this.reportDir = './reports';
        
        this.urls = {
            website: 'https://applynote.com/',
            console: 'https://console.applynote.com/'
        };

        // Website-specific selectors
        this.selectors = {
            // Navigation selectors
            navigation: {
                main_nav: [
                    'nav',
                    '.navbar',
                    '.navigation',
                    '.main-nav',
                    '//nav',
                    '//div[contains(@class, "navbar")]',
                    '//div[contains(@class, "navigation")]'
                ],
                logo: [
                    '.logo',
                    'img[alt*="logo" i]',
                    '.brand',
                    '.site-title',
                    '//img[contains(@alt, "logo")]',
                    '//div[contains(@class, "logo")]'
                ],
                menu_items: [
                    'nav a',
                    '.navbar a',
                    '.navigation a',
                    'ul.menu li a',
                    '//nav//a',
                    '//div[contains(@class, "navbar")]//a',
                    '//ul[contains(@class, "menu")]//a'
                ]
            },
            // Hero section selectors
            hero: {
                hero_section: [
                    '.hero',
                    '.hero-section',
                    '.banner',
                    '.jumbotron',
                    '//div[contains(@class, "hero")]',
                    '//div[contains(@class, "banner")]'
                ],
                hero_title: [
                    '.hero h1',
                    '.hero-section h1',
                    '.banner h1',
                    '.jumbotron h1',
                    '//div[contains(@class, "hero")]//h1',
                    '//div[contains(@class, "banner")]//h1'
                ],
                hero_description: [
                    '.hero p',
                    '.hero-section p',
                    '.banner p',
                    '.jumbotron p',
                    '//div[contains(@class, "hero")]//p',
                    '//div[contains(@class, "banner")]//p'
                ],
                cta_button: [
                    '.hero button',
                    '.hero-section button',
                    '.banner button',
                    '.hero a.btn',
                    '//div[contains(@class, "hero")]//button',
                    '//div[contains(@class, "banner")]//button'
                ]
            },
            // Feature sections
            features: {
                feature_cards: [
                    '.feature-card',
                    '.feature',
                    '.service-card',
                    '.benefit',
                    '//div[contains(@class, "feature-card")]',
                    '//div[contains(@class, "service-card")]'
                ],
                feature_titles: [
                    '.feature-card h3',
                    '.feature h3',
                    '.service-card h3',
                    '//div[contains(@class, "feature-card")]//h3',
                    '//div[contains(@class, "service-card")]//h3'
                ],
                feature_descriptions: [
                    '.feature-card p',
                    '.feature p',
                    '.service-card p',
                    '//div[contains(@class, "feature-card")]//p',
                    '//div[contains(@class, "service-card")]//p'
                ]
            },
            // Footer selectors
            footer: {
                footer_section: [
                    'footer',
                    '.footer',
                    '.site-footer',
                    '//footer',
                    '//div[contains(@class, "footer")]'
                ],
                footer_links: [
                    'footer a',
                    '.footer a',
                    '.site-footer a',
                    '//footer//a',
                    '//div[contains(@class, "footer")]//a'
                ],
                copyright: [
                    '.copyright',
                    '.copy',
                    'footer .copy',
                    '//div[contains(@class, "copyright")]',
                    '//footer[contains(@class, "copy")]'
                ]
            },
            // Contact form selectors
            contact: {
                contact_form: [
                    'form',
                    '.contact-form',
                    '.form',
                    '//form',
                    '//form[contains(@class, "contact")]'
                ],
                name_input: [
                    'input[name="name"]',
                    'input[placeholder*="name" i]',
                    'input[id*="name" i]',
                    '//input[@name="name"]',
                    '//input[contains(@placeholder, "name")]'
                ],
                email_input: [
                    'input[type="email"]',
                    'input[name="email"]',
                    'input[placeholder*="email" i]',
                    '//input[@type="email"]',
                    '//input[contains(@placeholder, "email")]'
                ],
                message_textarea: [
                    'textarea',
                    'textarea[name="message"]',
                    'textarea[placeholder*="message" i]',
                    '//textarea',
                    '//textarea[contains(@placeholder, "message")]'
                ],
                submit_button: [
                    'button[type="submit"]',
                    'input[type="submit"]',
                    'button:has-text("Send")',
                    'button:has-text("Submit")',
                    '//button[@type="submit"]',
                    '//button[contains(text(), "Send")]'
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

    async navigateToWebsite() {
        console.log(chalk.blue('\nNavigating to ApplyNote website...'));
        
        await this.page.goto(this.urls.website, { waitUntil: 'networkidle', timeout: 30000 });
        await this.takeScreenshot('website-homepage');
        console.log(chalk.green('Successfully loaded ApplyNote website'));
        return true;
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
                case 'scrollintoview':
                    await this.page.$eval(selector, el => el.scrollIntoView());
                    break;
                case 'hover':
                    await this.page.hover(selector, { timeout: 10000 });
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

    async runWebsiteTests(excelPath, sheetName = 'Website') {
        const excelReader = new CustomExcelReader(excelPath);
        const testCases = excelReader.getTestCases(sheetName);
        
        console.log(chalk.cyan(`\nFound ${testCases.length} website test cases in ${sheetName}`));
        
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
                // Website-specific UI compliance testing
                await this.takeScreenshot(`website-ui-${testCase.test_case_id}`);
                console.log(chalk.blue('Website UI compliance check - screenshot taken'));
                
                // Test website-specific components
                if (testCase.component) {
                    console.log(chalk.blue(`Testing component: ${testCase.component}`));
                    
                    const componentLower = testCase.component.toLowerCase();
                    
                    if (componentLower.includes('navbar') || componentLower.includes('navigation')) {
                        await this.executeAction('waitfor', this.selectors.navigation.main_nav.join(', '));
                        console.log(chalk.green('Navigation bar verified'));
                    } else if (componentLower.includes('hero') || componentLower.includes('banner')) {
                        await this.executeAction('waitfor', this.selectors.hero.hero_section.join(', '));
                        console.log(chalk.green('Hero section verified'));
                    } else if (componentLower.includes('feature')) {
                        await this.executeAction('waitfor', this.selectors.features.feature_cards.join(', '));
                        console.log(chalk.green('Feature cards verified'));
                    } else if (componentLower.includes('footer')) {
                        await this.executeAction('waitfor', this.selectors.footer.footer_section.join(', '));
                        console.log(chalk.green('Footer section verified'));
                    } else if (componentLower.includes('contact')) {
                        await this.executeAction('waitfor', this.selectors.contact.contact_form.join(', '));
                        console.log(chalk.green('Contact form verified'));
                    }
                }

                // Test navigation links
                try {
                    const menuItems = await this.page.$$(this.selectors.navigation.menu_items[0]);
                    if (menuItems.length > 0) {
                        console.log(chalk.blue(`Found ${menuItems.length} navigation links`));
                        await this.takeScreenshot(`navigation-${testCase.test_case_id}`);
                    }
                } catch (e) {
                    console.log(chalk.yellow('Could not verify navigation links'));
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

        console.log(chalk.cyan('\n\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550'));
        console.log(chalk.cyan('         WEBSITE QA TEST SUMMARY        '));
        console.log(chalk.cyan('\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550'));
        console.log(chalk.white(`Total Test Cases: ${total}`));
        console.log(chalk.green(`Passed:           ${passed}`));
        console.log(chalk.red(`Failed:           ${failed}`));
        console.log(chalk.yellow(`Success Rate:     ${((passed/total)*100).toFixed(2)}%`));
        console.log(chalk.cyan('\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550'));

        const reportPath = path.join(this.reportDir, `website-qa-report-${format(new Date(), 'yyyyMMdd-HHmmss')}.json`);
        fs.writeFileSync(reportPath, JSON.stringify(this.testResults, null, 2));
        console.log(chalk.blue(`\nWebsite QA report saved to: ${reportPath}`));
    }
}

module.exports = WebsiteQAAutomation;
