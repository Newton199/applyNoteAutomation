const ApplyNoteAutomation = require('./applynote-automation');
const ExcelReader = require('./excel-reader');
const chalk = require('chalk');

const args = process.argv.slice(2);
const excelFile = args.find(arg => arg.endsWith('.xlsx')) || './applynote-test-cases.xlsx';
const appFilter = args.includes('--app') ? args[args.indexOf('--app') + 1] : null;

async function main() {
    console.log(chalk.cyan('══════════════════════════════════════════════'));
    console.log(chalk.cyan('    APPLYNOTE QA AUTOMATION FRAMEWORK'));
    console.log(chalk.cyan('══════════════════════════════════════════════'));

    const automation = new ApplyNoteAutomation();
    
    try {
        console.log(chalk.blue(`\n📄 Using test case file: ${excelFile}`));
        
        const excelReader = new ExcelReader(excelFile);
        let testCases = excelReader.getTestCases();
        
        if (appFilter) {
            testCases = testCases.filter(tc => 
                tc.app_type?.toLowerCase() === appFilter.toLowerCase() || 
                tc.app_type?.toLowerCase() === 'both'
            );
            console.log(chalk.blue(`🔍 Filtering for ${appFilter} app tests: ${testCases.length} test cases`));
        }

        if (testCases.length === 0) {
            console.log(chalk.yellow('⚠️  No test cases found to execute'));
            return;
        }

        await automation.initialize();

        const studentTests = testCases.filter(tc => tc.app_type?.toLowerCase() === 'student');
        const adminTests = testCases.filter(tc => tc.app_type?.toLowerCase() === 'admin');

        if (studentTests.length > 0 && (!appFilter || appFilter === 'student')) {
            console.log(chalk.magenta('\n═════════ RUNNING STUDENT APP TESTS ═════════'));
            await automation.navigateTo('student');
            
            // Run ONLY student app test cases
            for (const testCase of testCases.filter(tc => tc.app_type?.toLowerCase() === 'student' || tc.app_type?.toLowerCase() === 'both')) {
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

                    console.log(chalk.green(`✅ Passed: ${testCase.test_case_id}`));
                    
                } catch (error) {
                    result.status = 'failed';
                    result.error = error.message;
                    result.screenshot = await automation.takeScreenshot(`fail-${testCase.test_case_id}`);
                    console.log(chalk.red(`❌ Failed: ${testCase.test_case_id} - ${error.message}`));
                }

                result.endTime = new Date();
                result.duration = result.endTime - result.startTime;
                automation.testResults.push(result);
            }
        }

        if (adminTests.length > 0 && (!appFilter || appFilter === 'admin')) {
            console.log(chalk.magenta('\n══════════ RUNNING ADMIN APP TESTS ══════════'));
            await automation.navigateTo('admin');
            
            // Run ONLY admin app test cases
            for (const testCase of testCases.filter(tc => tc.app_type?.toLowerCase() === 'admin' || tc.app_type?.toLowerCase() === 'both')) {
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

                    console.log(chalk.green(`✅ Passed: ${testCase.test_case_id}`));
                    
                } catch (error) {
                    result.status = 'failed';
                    result.error = error.message;
                    result.screenshot = await automation.takeScreenshot(`fail-${testCase.test_case_id}`);
                    console.log(chalk.red(`❌ Failed: ${testCase.test_case_id} - ${error.message}`));
                }

                result.endTime = new Date();
                result.duration = result.endTime - result.startTime;
                automation.testResults.push(result);
            }
        }

        automation.generateReport();

    } catch (error) {
        console.error(chalk.red('\n❌ Automation failed:'), error.message);
        process.exitCode = 1;
    } finally {
        await automation.close();
    }
}

main().catch(console.error);