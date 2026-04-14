const ApplyNoteLoginAutomation = require('./applynote-login-automation');
const CustomExcelReader = require('./custom-excel-reader');
const chalk = require('chalk');

const args = process.argv.slice(2);
const excelFile = args.find(arg => arg.endsWith('.xlsx')) || './ApplyNote Qa Script.xlsx';
const sheetName = args.includes('--sheet') ? args[args.indexOf('--sheet') + 1] : 'Admin';

async function main() {
    console.log(chalk.cyan('============================================='));
    console.log(chalk.cyan('    APPLYNOTE EXCEL AUTOMATION FRAMEWORK'));
    console.log(chalk.cyan('============================================='));

    const automation = new ApplyNoteLoginAutomation();
    
    try {
        console.log(chalk.blue(`\nUsing test case file: ${excelFile}`));
        console.log(chalk.blue(`Target sheet: ${sheetName}`));
        
        // Check available sheets
        const excelReader = new CustomExcelReader(excelFile);
        const availableSheets = excelReader.getSheetNames();
        console.log(chalk.blue(`Available sheets: ${availableSheets.join(', ')}`));
        
        if (!availableSheets.includes(sheetName)) {
            console.log(chalk.red(`Sheet "${sheetName}" not found! Available sheets: ${availableSheets.join(', ')}`));
            return;
        }
        
        // Get test cases from specific sheet
        const testCases = excelReader.getTestCases(sheetName);
        
        if (testCases.length === 0) {
            console.log(chalk.yellow(`No test cases found in sheet: ${sheetName}`));
            return;
        }
        
        console.log(chalk.blue(`Found ${testCases.length} test cases in sheet: ${sheetName}`));
        
        // Show first few test cases as preview
        console.log(chalk.cyan('\nFirst 3 test cases:'));
        testCases.slice(0, 3).forEach((tc, i) => {
            console.log(chalk.white(`${i + 1}. ${tc.test_case_id} - ${tc.test_case_name}`));
        });
        
        // Initialize browser
        await automation.initialize();
        
        // Determine app type based on sheet name
        let appType = 'admin';
        if (sheetName.toLowerCase().includes('student') || sheetName.toLowerCase().includes('website')) {
            appType = 'student';
        }
        
        console.log(chalk.yellow(`\nPreparing to login to ${appType} app...`));
        console.log(chalk.cyan('Press Enter to continue, or Ctrl+C to exit...'));
        
        // Wait for user confirmation
        await new Promise(resolve => {
            process.stdin.once('data', resolve);
        });
        
        // Login to the appropriate application
        await automation.login(appType);
        
        // Run all test cases
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
                // For admin tests, try to execute test steps
                if (sheetName === 'Admin' && testCase.test_steps) {
                    console.log(chalk.blue(`Test Steps: ${testCase.test_steps}`));
                    
                    // Try to parse simple steps
                    const steps = testCase.test_steps.split('\n').filter(s => s.trim());
                    for (const step of steps) {
                        const trimmedStep = step.trim();
                        if (trimmedStep.toLowerCase().includes('click')) {
                            // Extract selector from step (basic implementation)
                            const selectorMatch = trimmedStep.match(/click\s+(.+?)(?:\s|$)/i);
                            if (selectorMatch) {
                                await automation.executeAction('click', selectorMatch[1]);
                                await automation.page.waitForTimeout(1000);
                            }
                        } else if (trimmedStep.toLowerCase().includes('enter') || trimmedStep.toLowerCase().includes('type')) {
                            // Extract text to type
                            const textMatch = trimmedStep.match(/(?:enter|type)\s+(.+?)(?:\s+in|\s|$)/i);
                            if (textMatch) {
                                const selector = 'input[type="text"], input[type="email"], textarea';
                                await automation.executeAction('type', selector, textMatch[1]);
                                await automation.page.waitForTimeout(1000);
                            }
                        } else if (trimmedStep.toLowerCase().includes('wait')) {
                            await automation.page.waitForTimeout(2000);
                        }
                    }
                } else {
                    // For UI compliance tests, just take screenshots
                    await automation.takeScreenshot(`ui-check-${testCase.test_case_id}`);
                    console.log(chalk.blue('UI compliance check - screenshot taken'));
                }

                console.log(chalk.green(`\u2705 Passed: ${testCase.test_case_id}`));
                
            } catch (error) {
                result.status = 'failed';
                result.error = error.message;
                result.screenshot = await automation.takeScreenshot(`fail-${testCase.test_case_id}`);
                console.log(chalk.red(`\u274c Failed: ${testCase.test_case_id} - ${error.message}`));
            }

            result.endTime = new Date();
            result.duration = result.endTime - result.startTime;
            automation.testResults.push(result);
        }

        automation.generateReport();

    } catch (error) {
        console.error(chalk.red('\n\u274c Automation failed:'), error.message);
        process.exitCode = 1;
    } finally {
        await automation.close();
    }
}

main().catch(console.error);
