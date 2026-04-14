const TestExcelReader = require('./test-excel-reader');
const fs = require('fs');

try {
    const reader = new TestExcelReader('./ApplyNote Qa Script.xlsx');
    const testCases = reader.getTESTTestCases();
    
    console.log(`Found ${testCases.length} TEST cases`);
    
    // Create markdown list
    let markdown = '# ApplyNote Test Cases - TEST 01 to TEST 198\n\n';
    markdown += `Total Test Cases: ${testCases.length}\n`;
    markdown += `Enabled Tests: ${testCases.filter(tc => tc.enabled).length}\n`;
    markdown += `Disabled Tests: ${testCases.filter(tc => !tc.enabled).length}\n\n`;
    markdown += '## Complete Test Case List\n\n';
    
    testCases.forEach((testCase, index) => {
        const status = testCase.enabled ? 'ENABLED' : 'DISABLED';
        const statusIcon = testCase.enabled ? 'green' : 'red';
        
        markdown += `${index + 1}. **${testCase.test_case_id}** - ${testCase.test_case_name}\n`;
        markdown += `   - Module: ${testCase.module}\n`;
        markdown += `   - Status: ${status}\n`;
        markdown += `   - Steps: ${testCase.test_steps}\n`;
        markdown += `   - Expected: ${testCase.expected_result}\n\n`;
    });
    
    // Write to README.md
    fs.writeFileSync('./README.md', markdown);
    console.log('Successfully updated README.md with all TEST 01-198 cases');
    
} catch (error) {
    console.error('Error:', error.message);
}
