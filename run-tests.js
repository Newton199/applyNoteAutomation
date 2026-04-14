const TestAutomation = require('./test-automation');
const TestExcelReader = require('./test-excel-reader');
const chalk = require('chalk');

const args = process.argv.slice(2);
const excelFile = args.find(arg => arg.endsWith('.xlsx')) || './ApplyNote Qa Script.xlsx';
const testType = args.includes('--test') ? 'test' : 'admin'; // TEST 01-198 or admin tests

async function main() {
    console.log(chalk.cyan('============================================='));
    console.log(chalk.cyan('      APPLYNOTE TEST AUTOMATION'));
    console.log(chalk.cyan(`      ${testType === 'test' ? 'TEST 01-198' : 'Admin'} Test Suite`));
    console.log(chalk.cyan('============================================='));

    const automation = new TestAutomation();
    
    try {
        console.log(chalk.blue(`\nUsing test case file: ${excelFile}`));
        console.log(chalk.blue(`Test type: ${testType === 'test' ? 'TEST 01-198' : 'Admin tests'}`));
        
        // Check available sheets
        const excelReader = new TestExcelReader(excelFile);
        const availableSheets = excelReader.getSheetNames();
        console.log(chalk.blue(`Available sheets: ${availableSheets.join(', ')}`));
        
        // Get test cases
        let testCases;
        if (testType === 'test') {
            testCases = excelReader.getTESTTestCases();
        } else {
            testCases = excelReader.getAdminTestCases();
        }
        
        if (testCases.length === 0) {
            console.log(chalk.yellow(`No test cases found for type: ${testType}`));
            return;
        }
        
        console.log(chalk.blue(`Found ${testCases.length} test cases`));
        
        // Show first few test cases
        console.log(chalk.cyan('\nFirst 5 test cases:'));
        testCases.slice(0, 5).forEach((tc, i) => {
            console.log(chalk.white(`${i + 1}. ${tc.test_case_id} - ${tc.test_case_name}`));
            if (tc.test_steps) {
                console.log(chalk.gray(`   Steps: ${tc.test_steps.substring(0, 100)}...`));
            }
        });
        
        // Initialize browser
        await automation.initialize();
        
        // Determine app type based on test content
        let appType = 'admin';
        if (testType === 'test') {
            // Check if test cases contain student-related content
            const hasStudentContent = testCases.some(tc => 
                tc.test_case_name.toLowerCase().includes('student') ||
                tc.test_steps.toLowerCase().includes('applynote.com') ||
                tc.test_steps.toLowerCase().includes('signup')
            );
            appType = hasStudentContent ? 'student' : 'admin';
        }
        
        console.log(chalk.yellow(`\nPreparing to login to ${appType} app...`));
        console.log(chalk.cyan('Press Enter to continue, or Ctrl+C to exit...'));
        
        // Wait for user confirmation
        await new Promise(resolve => {
            process.stdin.once('data', resolve);
        });
        
        // Login to the appropriate application
        await automation.login(appType);
        
        // Run test cases
        await automation.runTestCases(excelFile, testType);
        
        // Generate report
        automation.generateReport();

    } catch (error) {
        console.error(chalk.red('\n\u274c Test automation failed:'), error.message);
        process.exitCode = 1;
    } finally {
        await automation.close();
    }
}

main().catch(console.error);
