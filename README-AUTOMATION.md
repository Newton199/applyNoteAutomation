# ApplyNote QA Automation Framework

This automation framework is designed to test the ApplyNote platform using Playwright and Excel-based test cases.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Ensure your Excel file with test cases is in the root directory:
- `ApplyNote Qa Script.xlsx`

## Available Commands

### Admin Console Automation (with OTP support)
```bash
# Run admin console tests (will wait for OTP)
npm run login:test:admin

# Run admin tests in headed mode (visible browser)
npm run login:test:headed -- --app admin
```

### Student App Automation
```bash
# Run student app tests
npm run login:test:student

# Run student tests in headed mode
npm run login:test:headed -- --app student
```

### General Automation (without login)
```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run only student app tests
npm run test:student

# Run only admin console tests
npm run test:admin
```

## Credentials Configuration

The framework is pre-configured with the following credentials:

### Admin Console
- **Email**: kaphlenerob@gmail.com
- **Password**: applynote123
- **URL**: https://console.applynote.com/login

### Student App
- **Email**: kaphleraj98@gmail.com  
- **Password**: defaultpassword
- **URL**: https://applynote.com/

## Excel Test Case Format

Your Excel file should contain the following columns:

| Column | Description | Example |
|--------|-------------|---------|
| test_case_id | Unique identifier for the test case | TC001 |
| test_case_name | Descriptive name of the test | Login Verification |
| action | Action to perform | click, type, wait, verifytext |
| selector | CSS selector or XPath | button[type="submit"] |
| value | Input value for the action | test@example.com |
| expected_result | Expected outcome | Success message |
| enabled | Whether test is enabled (yes/no) | yes |
| app_type | Target application (admin/student/both) | admin |

### Supported Actions

- **click**: Click on an element
- **type/enter/input**: Type text into an input field
- **select**: Select from dropdown
- **wait**: Wait for specified milliseconds
- **waitfor**: Wait for element to be visible
- **verifytext**: Verify text content
- **verifyvisible**: Verify element is visible
- **verifyexists**: Verify element exists
- **gettext**: Get text content
- **getvalue**: Get input value
- **press**: Press keyboard key
- **scrollintoview**: Scroll element into view

## OTP Handling

When running admin console tests, the framework will:

1. Navigate to login page
2. Enter email and password
3. Click login button
4. Detect if OTP is required
5. **Wait for 2 minutes** for manual OTP entry
6. Continue with test execution after OTP

## Reports and Screenshots

- **Screenshots**: Saved in `./screenshots/` directory
- **Reports**: JSON reports saved in `./reports/` directory
- **Test Results**: Displayed in console with pass/fail status

## Running Tests

### Quick Start

1. **For Admin Console (with OTP):**
```bash
npm run login:test:admin
```
The browser will open, login, and wait 2 minutes for you to enter the OTP manually.

2. **For Student App:**
```bash
npm run login:test:student
```

3. **With Visible Browser:**
```bash
npm run login:test:headed -- --app admin
```

### Custom Excel File

To use a different Excel file:
```bash
node run-automation.js "path/to/your/file.xlsx" --app admin
```

## Example Test Execution

```bash
$ npm run login:test:admin

=============================================
    APPLYNOTE LOGIN AUTOMATION FRAMEWORK
=============================================

Using test case file: ./ApplyNote Qa Script.xlsx
Target application: admin

Logging into admin app with email: kaphlenerob@gmail.com
Navigated to admin app: https://console.applynote.com/login
Successfully logged into admin app

Found 15 test cases

Running: TC001 - Login Verification
Passed: TC001

Running: TC002 - Dashboard Navigation
Passed: TC002

=============================================
           TEST EXECUTION SUMMARY        
=============================================
Total Test Cases: 15
Passed:           15
Failed:           0
Success Rate:     100.00%
=============================================
```

## Troubleshooting

### Common Issues

1. **OTP Timeout**: If OTP entry takes more than 2 minutes, tests will fail. Increase timeout in the code if needed.

2. **Element Not Found**: Check CSS selectors in your Excel file. Use browser dev tools to verify selectors.

3. **Login Failures**: Verify credentials and ensure the login page structure hasn't changed.

4. **Excel File Issues**: Ensure the Excel file has the correct column headers and format.

### Debug Mode

Run tests in headed mode to see what's happening:
```bash
npm run login:test:headed -- --app admin
```

## File Structure

```
automation/
|-- applynote-login-automation.js  # Main automation class with login
|-- run-automation.js             # Test runner with login
|-- excel-reader.js               # Excel file reader
|-- test-runner.js               # Original test runner (without login)
|-- applynote-automation.js      # Original automation class
|-- package.json                 # Dependencies and scripts
|-- ApplyNote Qa Script.xlsx     # Your test cases
|-- screenshots/                 # Test screenshots
|-- reports/                     # Test reports
```

## Support

For issues or questions:
1. Check the console output for error messages
2. Review screenshots in the `screenshots/` directory
3. Examine the JSON reports in `reports/` directory for detailed results
