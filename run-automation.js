const ApplyNoteLoginAutomation = require('./applynote-login-automation');
const ExcelReader = require('./excel-reader');
const chalk = require('chalk');

const args = process.argv.slice(2);
const excelFile = args.find(arg => arg.endsWith('.xlsx')) || './ApplyNote Qa Script.xlsx';
const appType = args.includes('--app') ? args[args.indexOf('--app') + 1] : 'admin';

async function main() {
    console.log(chalk.cyan('============================================='));
    console.log(chalk.cyan('    APPLYNOTE LOGIN AUTOMATION FRAMEWORK'));
    console.log(chalk.cyan('============================================='));

    const automation = new ApplyNoteLoginAutomation();
    
    try {
        console.log(chalk.blue(`\nUsing test case file: ${excelFile}`));
        console.log(chalk.blue(`Target application: ${appType}`));
        
        // Initialize browser
        await automation.initialize();
        
        // Login to the specified application
        await automation.login(appType);
        
        // Read and run test cases from Excel
        const excelReader = new ExcelReader(excelFile);
        const testCases = excelReader.getTestCases();
        
        if (testCases.length === 0) {
            console.log(chalk.yellow('No test cases found in the Excel file'));
            return;
        }
        
        console.log(chalk.blue(`Found ${testCases.length} test cases`));
        
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
                await automation.executeAction(
                    testCase.action,
                    testCase.selector,
                    testCase.value || testCase.expected_result
                );

                if (testCase.expected_result && testCase.action.startsWith('verify')) {
                    const actual = await automation.executeAction(
                        testCase.action,
                        testCase.selector,
                        testCase.expected_result
                    );
                    
                    if (!actual) {
                        throw new Error(`Verification failed. Expected: ${testCase.expected_result}`);
                    }
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
