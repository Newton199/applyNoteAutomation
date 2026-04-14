# ApplyNote Test Automation Framework

Clean automation framework for ApplyNote TEST 01-198 test cases and Admin console testing.

## Overview

This framework provides automated testing for:
- **TEST 01-198** - Your updated Excel test cases
- **Admin Console** - Administrative interface testing
- **Student Interface** - Student portal testing

## Features

- Clean, focused automation for your Excel test cases
- Support for TEST 01-198 pattern test cases
- Admin and Student login automation
- OTP handling for secure authentication
- Screenshot capture on failures
- JSON test reports
- Headless and headed browser modes

## Quick Start

### 1. Install dependencies
```bash
npm install
npx playwright install chromium
```

### 2. Run Tests

#### Admin Console Tests
```bash
# Run admin tests (headless)
npm run test:admin

# Run admin tests with visible browser
npm run test:admin:headed
```

#### TEST 01-198 Tests
```bash
# Run TEST 01-198 test cases
npm run test:01-198

# Run TEST 01-198 with visible browser
npm run test:01-198:headed
```

#### General Testing
```bash
# Run default tests (admin)
npm test

# Run with visible browser
npm run test:headed
```

## Test Structure

Your Excel file contains:
- **Admin Test Cases** - General admin functionality
- **TEST 01-198** - Your numbered test cases
- **Test Steps** - Automated execution of test procedures
- **Expected Results** - Verification of outcomes

## Credentials

Pre-configured credentials:
- **Admin**: kaphlenerob@gmail.com / applynote123
- **Student**: kaphleraj98@gmail.com / defaultpassword

## Test Execution

### Headless Mode (Default)
- Runs tests in background
- Faster execution
- Ideal for CI/CD

### Headed Mode (Visible Browser)
- Real-time test observation
- Better for debugging
- Visual verification

## Output

- **Screenshots**: `./screenshots/` - Test execution evidence
- **Reports**: `./reports/` - JSON test results
- **Console**: Live test execution status

## Test Case Format

Your Excel test cases should include:
- Test Case ID (TEST 01, TEST 02, etc.)
- Test Case Name
- Test Steps (automated procedures)
- Expected Result
- Status (PASS/FAIL)

## Example Test Execution

```bash
$ npm run test:01-198

=============================================
      APPLYNOTE TEST AUTOMATION
      TEST 01-198 Test Suite
=============================================

Using test case file: ./ApplyNote Qa Script.xlsx
Test type: TEST 01-198
Found 198 test cases

First 5 test cases:
1. TEST 01 - Valid Admin Login
2. TEST 02 - Invalid Login Attempt
3. TEST 03 - Password Reset
4. TEST 04 - User Creation
5. TEST 05 - User Deletion

Preparing to login to admin app...
Press Enter to continue, or Ctrl+C to exit...

Logging into admin app with email: kaphlenerob@gmail.com
Email entered successfully
Password entered successfully
Login button clicked
Successfully logged into admin app

Running: TEST 01 - Valid Admin Login
Test Steps: 1. Navigate to console.applynote.com.2. Enter Email: kaphlenerob@gmail.com.3. Enter Password: applynote123.4. Click 'Login'
Parsed 4 steps
-> Navigate to console.applynote.com
-> Enter Email: kaphlenerob@gmail.com
-> Enter Password: applynote123
-> Click 'Login'
Passed: TEST 01

=============================================
           TEST EXECUTION SUMMARY        
=============================================
Total Test Cases: 198
Passed:           195
Failed:           3
Success Rate:     98.48%
=============================================
```

## Troubleshooting

### Common Issues

**Login Failures**:
- Verify credentials are correct
- Check for OTP requirements
- Ensure URL is accessible

**Element Not Found**:
- Test with headed mode to see the page
- Check if interface has changed
- Verify selectors are working

**Timeout Errors**:
- Increase wait times in test steps
- Check network connectivity
- Verify page load completion

### Debug Mode
Run with visible browser to debug:
```bash
HEADLESS=false npm run test:01-198
```

## File Structure

```
automation/
|-- test-automation.js        # Core automation engine
|-- test-excel-reader.js       # Excel file parser
|-- run-tests.js               # Test execution runner
|-- ApplyNote Qa Script.xlsx   # Your test cases
|-- screenshots/               # Test screenshots
|-- reports/                   # Test reports
|-- package.json              # Dependencies and scripts
```

## Environment Variables

```bash
# Browser mode
HEADLESS=false  # Show browser during tests

# Timeout settings
DEFAULT_TIMEOUT=30000  # Element wait timeout
```

## Support

For issues:
1. Check console output for error messages
2. Review screenshots in `./screenshots/`
3. Examine JSON reports in `./reports/`
4. Run with headed mode for debugging

---

**ApplyNote Test Automation Framework** - Clean, focused testing for your TEST 01-198 cases.
