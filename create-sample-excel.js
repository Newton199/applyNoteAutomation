const XLSX = require('xlsx');
const path = require('path');

const workbook = XLSX.utils.book_new();

// Test Cases Sheet
const testCasesSheet = XLSX.utils.aoa_to_sheet([
    ['Test Case ID', 'Test Case Name', 'Description', 'App Type', 'Action', 'Selector', 'Value', 'Expected Result', 'Enabled'],
    ['STU-001', 'Student App Load', 'Verify student app loads successfully', 'student', 'verifyVisible', 'body', '', 'Page should load', 'Yes'],
    ['STU-002', 'Check Sign In Button', 'Verify sign in button exists on homepage', 'student', 'verifyExists', 'a[href*="login"]', '', 'Login link exists', 'Yes'],
    ['STU-003', 'Check Sign Up Button', 'Verify sign up button exists', 'student', 'verifyExists', 'a[href*="signup"]', '', 'Signup link exists', 'Yes'],
    ['STU-004', 'Verify Hero Text', 'Check main heading exists', 'student', 'verifyVisible', 'h1', '', 'Main heading is visible', 'Yes'],
    ['ADM-001', 'Admin Console Load', 'Verify admin console loads successfully', 'admin', 'verifyVisible', 'body', '', 'Admin page should load', 'Yes'],
    ['ADM-002', 'Check Admin Email Field', 'Verify email field exists on admin login', 'admin', 'verifyExists', 'input[name="email"]', '', 'Email field exists', 'Yes'],
    ['ADM-003', 'Check Admin Password Field', 'Verify password field exists', 'admin', 'verifyExists', 'input[name="password"]', '', 'Password field exists', 'Yes']
]);

// Test Data Sheet
const testDataSheet = XLSX.utils.aoa_to_sheet([
    ['Key', 'Value', 'Description'],
    ['student_email', 'test@student.com', 'Test student user email'],
    ['student_password', 'testpass123', 'Test student password'],
    ['admin_email', 'admin@applynote.com', 'Admin user email'],
    ['admin_password', 'adminpass123', 'Admin password'],
    ['wait_timeout', '3000', 'Default wait time']
]);

// Elements Reference Sheet
const elementsSheet = XLSX.utils.aoa_to_sheet([
    ['Element Name', 'Selector', 'App Type', 'Description'],
    ['login_button', 'button:has-text("Login")', 'student', 'Login button on homepage'],
    ['email_input', 'input[type="email"]', 'both', 'Email input field'],
    ['password_input', 'input[type="password"]', 'both', 'Password input field'],
    ['submit_button', 'button[type="submit"]', 'both', 'Submit form button']
]);

XLSX.utils.book_append_sheet(workbook, testCasesSheet, 'TestCases');
XLSX.utils.book_append_sheet(workbook, testDataSheet, 'TestData');
XLSX.utils.book_append_sheet(workbook, elementsSheet, 'Elements');

const filePath = path.join(__dirname, 'applynote-test-cases.xlsx');
XLSX.writeFile(workbook, filePath);

console.log(`Sample Excel test case file created: ${filePath}`);