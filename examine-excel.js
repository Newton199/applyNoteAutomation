const ExcelReader = require('./excel-reader');
const chalk = require('chalk');

const excelFile = './ApplyNote Qa Script.xlsx';

try {
    const reader = new ExcelReader(excelFile);
    const sheets = reader.getSheetNames();
    
    console.log(chalk.cyan('Available sheets:'));
    sheets.forEach(sheet => console.log(chalk.blue(`- ${sheet}`)));
    
    for (const sheetName of sheets) {
        console.log(chalk.magenta(`\n=== Examining sheet: ${sheetName} ===`));
        
        try {
            const rawData = reader.getSheetData(sheetName, { header: 1 });
            
            if (rawData.length === 0) {
                console.log(chalk.yellow('Sheet is empty'));
                continue;
            }
            
            console.log(chalk.blue(`Total rows: ${rawData.length}`));
            
            // Show first few rows
            console.log(chalk.blue('\nFirst 3 rows:'));
            for (let i = 0; i < Math.min(3, rawData.length); i++) {
                console.log(chalk.white(`Row ${i + 1}:`), rawData[i]);
            }
            
            // Show headers
            if (rawData.length > 0) {
                const headers = rawData[0].map(h => h.toString().trim().toLowerCase().replace(/\s+/g, '_'));
                console.log(chalk.blue('\nNormalized headers:'));
                console.log(chalk.white(headers.join(', ')));
            }
            
            // Try to find test case rows
            let testCaseCount = 0;
            for (let i = 1; i < rawData.length; i++) {
                const row = rawData[i];
                if (row && row.length > 0 && row[0]) {
                    testCaseCount++;
                }
            }
            console.log(chalk.green(`Potential test cases: ${testCaseCount}`));
            
        } catch (error) {
            console.log(chalk.red(`Error reading sheet ${sheetName}: ${error.message}`));
        }
    }
    
} catch (error) {
    console.error(chalk.red('Error:'), error.message);
}
