const TestAutomation = require('./test-automation');
const TestExcelReader = require('./test-excel-reader');
const chalk = require('chalk');

const excelFile = './ApplyNote Qa Script.xlsx';

async function main() {
    console.log(chalk.cyan('============================================='));
    console.log(chalk.cyan('      APPLYNOTE TEST AUTOMATION'));
    console.log(chalk.cyan('      TEST 01-198 Automatic Execution'));
    console.log(chalk.cyan('============================================='));

    const automation = new TestAutomation();
    
    try {
        console.log(chalk.blue(`\nUsing test case file: ${excelFile}`));
        console.log(chalk.blue('Running TEST 01-198 test scripts automatically...'));
        
        // Get test cases
        const excelReader = new TestExcelReader(excelFile);
        const testCases = excelReader.getTESTTestCases();
        
        if (testCases.length === 0) {
            console.log(chalk.yellow('No TEST 01-198 test cases found'));
            return;
        }
        
        console.log(chalk.blue(`Found ${testCases.length} TEST cases`));
        console.log(chalk.blue(`Enabled tests: ${testCases.filter(tc => tc.enabled).length}`));
        
        // Show first few test cases
        console.log(chalk.cyan('\nFirst 5 test cases:'));
        testCases.slice(0, 5).forEach((tc, i) => {
            console.log(chalk.white(`${i + 1}. ${tc.test_case_id} - ${tc.test_case_name}`));
        });
        
        // Initialize browser
        await automation.initialize();
        
        // Auto-detect app type and login
        let appType = 'admin';
        console.log(chalk.yellow(`\nAuto-detect: Logging into ${appType} app...`));
        
        try {
            await automation.login(appType);
        } catch (error) {
            console.log(chalk.yellow('Admin login failed, trying student login...'));
            appType = 'student';
            await automation.login(appType);
        }
        
        // Run test cases automatically
        console.log(chalk.cyan('\n=== STARTING AUTOMATIC TEST EXECUTION ==='));
        await automation.runTestCases(excelFile, 'test');
        
        // Generate report
        automation.generateReport();
        
        console.log(chalk.green('\n=== AUTOMATIC TEST EXECUTION COMPLETED ==='));
        
    } catch (error) {
        console.error(chalk.red('\n\u274c Test automation failed:'), error.message);
        process.exitCode = 1;
    } finally {
        await automation.close();
    }
}

main().catch(console.error);
