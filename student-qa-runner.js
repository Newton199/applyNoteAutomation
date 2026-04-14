const StudentQAAutomation = require('./student-qa-automation');
const CustomExcelReader = require('./custom-excel-reader');
const chalk = require('chalk');

const args = process.argv.slice(2);
const excelFile = args.find(arg => arg.endsWith('.xlsx')) || './ApplyNote Qa Script.xlsx';
const sheetName = args.includes('--sheet') ? args[args.indexOf('--sheet') + 1] : 'Student WEB UI';

async function main() {
    console.log(chalk.cyan('============================================='));
    console.log(chalk.cyan('      STUDENT QA AUTOMATION FRAMEWORK'));
    console.log(chalk.cyan('      Student Web UI Testing Suite'));
    console.log(chalk.cyan('============================================='));

    const automation = new StudentQAAutomation();
    
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
        
        console.log(chalk.blue(`Found ${testCases.length} student test cases in sheet: ${sheetName}`));
        
        console.log(chalk.cyan('\nFirst 3 test cases:'));
        testCases.slice(0, 3).forEach((tc, i) => {
            console.log(chalk.white(`${i + 1}. ${tc.test_case_id} - ${tc.test_case_name}`));
            if (tc.module_component) {
                console.log(chalk.gray(`   Component: ${tc.module_component}`));
            }
        });
        
        await automation.initialize();
        
        console.log(chalk.yellow(`\nPreparing to login to student app...`));
        console.log(chalk.cyan('Press Enter to continue, or Ctrl+C to exit...'));
        
        await new Promise(resolve => {
            process.stdin.once('data', resolve);
        });
        
        await automation.login();
        await automation.runStudentTests(excelFile, sheetName);
        automation.generateReport();

    } catch (error) {
        console.error(chalk.red('\n\u274c Student QA automation failed:'), error.message);
        process.exitCode = 1;
    } finally {
        await automation.close();
    }
}

main().catch(console.error);
