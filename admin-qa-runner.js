const EnhancedApplyNoteAutomation = require('./enhanced-automation');
const CustomExcelReader = require('./custom-excel-reader');
const chalk = require('chalk');

const args = process.argv.slice(2);
const excelFile = args.find(arg => arg.endsWith('.xlsx')) || './ApplyNote Qa Script.xlsx';
const sheetName = args.includes('--sheet') ? args[args.indexOf('--sheet') + 1] : 'Admin';

async function main() {
    console.log(chalk.cyan('============================================='));
    console.log(chalk.cyan('  ENHANCED FUNCTIONAL TESTING FRAMEWORK'));
    console.log(chalk.cyan('  XPath + CSS Selectors + Smart Parsing'));
    console.log(chalk.cyan('============================================='));

    const automation = new EnhancedApplyNoteAutomation();
    
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
            if (tc.test_steps) {
                console.log(chalk.gray(`   Steps: ${tc.test_steps.substring(0, 100)}...`));
            }
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
        
        // Run functional tests
        await automation.runFunctionalTests(excelFile, sheetName);
        
        // Generate report
        automation.generateReport();

    } catch (error) {
        console.error(chalk.red('\n\u274c Automation failed:'), error.message);
        process.exitCode = 1;
    } finally {
        await automation.close();
    }
}

main().catch(console.error);
