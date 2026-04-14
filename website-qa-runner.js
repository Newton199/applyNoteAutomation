const WebsiteQAAutomation = require('./website-qa-automation');
const CustomExcelReader = require('./custom-excel-reader');
const chalk = require('chalk');

const args = process.argv.slice(2);
const excelFile = args.find(arg => arg.endsWith('.xlsx')) || './ApplyNote Qa Script.xlsx';
const sheetName = args.includes('--sheet') ? args[args.indexOf('--sheet') + 1] : 'Website';

async function main() {
    console.log(chalk.cyan('============================================='));
    console.log(chalk.cyan('      WEBSITE QA AUTOMATION FRAMEWORK'));
    console.log(chalk.cyan('      Website Testing Suite'));
    console.log(chalk.cyan('============================================='));

    const automation = new WebsiteQAAutomation();
    
    try {
        console.log(chalk.blue(`\nUsing test case file: ${excelFile}`));
        console.log(chalk.blue(`Target sheet: ${sheetName}`));
        
        const excelReader = new CustomExcelReader(excelFile);
        const availableSheets = excelReader.getSheetNames();
        console.log(chalk.blue(`Available sheets: ${availableSheets.join(', ')}`));
        
        if (!availableSheets.includes(sheetName)) {
            console.log(chalk.red(`Sheet "${sheetName}" not found! Available sheets: ${availableSheets.join(', ')}`));
            return;
        }
        
        const testCases = excelReader.getTestCases(sheetName);
        
        if (testCases.length === 0) {
            console.log(chalk.yellow(`No test cases found in sheet: ${sheetName}`));
            return;
        }
        
        console.log(chalk.blue(`Found ${testCases.length} website test cases in sheet: ${sheetName}`));
        
        console.log(chalk.cyan('\nFirst 3 test cases:'));
        testCases.slice(0, 3).forEach((tc, i) => {
            console.log(chalk.white(`${i + 1}. ${tc.test_case_id} - ${tc.test_case_name}`));
            if (tc.component) {
                console.log(chalk.gray(`   Component: ${tc.component}`));
            }
        });
        
        await automation.initialize();
        
        console.log(chalk.yellow(`\nPreparing to test ApplyNote website...`));
        console.log(chalk.cyan('Press Enter to continue, or Ctrl+C to exit...'));
        
        await new Promise(resolve => {
            process.stdin.once('data', resolve);
        });
        
        await automation.navigateToWebsite();
        await automation.runWebsiteTests(excelFile, sheetName);
        automation.generateReport();

    } catch (error) {
        console.error(chalk.red('\n\u274c Website QA automation failed:'), error.message);
        process.exitCode = 1;
    } finally {
        await automation.close();
    }
}

main().catch(console.error);
