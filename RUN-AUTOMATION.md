# ApplyNote Excel Automation - Quick Start Guide

## Your Excel File Structure Detected

Your Excel file `ApplyNote Qa Script.xlsx` contains:
- **Admin sheet**: 537 test cases (functional tests)
- **Website sheet**: 56 test cases (UI compliance)
- **Student WEB UI sheet**: 99 test cases (UI compliance)
- **Application Student sheet**: 31 test cases (UI compliance)

## Ready-to-Run Commands

### 1. Admin Console Tests (with OTP)
```bash
npm run excel:test:admin
```
This will:
- Login to admin console with kaphlenerob@gmail.com
- Wait 2 minutes for OTP entry
- Run all 537 admin test cases
- Take screenshots on failures

### 2. Website Tests
```bash
npm run excel:test:website
```
This will:
- Login to student app (for website access)
- Run 56 UI compliance tests
- Take screenshots for visual verification

### 3. Student Web UI Tests
```bash
npm run excel:test:student-web
```
This will:
- Login to student app with kaphleraj98@gmail.com
- Run 99 UI compliance tests
- Take screenshots for visual verification

### 4. Student Application Tests
```bash
npm run excel:test:student-app
```
This will:
- Login to student app
- Run 31 mobile app UI tests
- Take screenshots for visual verification

## Running with Visible Browser

To see the automation running (recommended for first time):
```bash
HEADLESS=false npm run excel:test:admin
```

## What the Automation Does

### For Admin Tests:
1. Parses test steps from Excel
2. Executes actions like:
   - Click buttons
   - Type in input fields
   - Wait for elements
   - Verify text content
3. Takes screenshots on failures
4. Generates detailed reports

### For UI Compliance Tests:
1. Takes screenshots of each test case
2. Compares with expected design (manual verification)
3. Logs pass/fail status based on Excel data

## Before Running

1. **Ensure you have 2 minutes available** for OTP entry when running admin tests
2. **Keep the Excel file open** if you want to see test case details
3. **Check screenshots folder** after tests for visual verification

## Results Location

- **Screenshots**: `./screenshots/`
- **Reports**: `./reports/` (JSON format)
- **Console**: Live test execution results

## Example Run

```bash
$ npm run excel:test:admin

=============================================
    APPLYNOTE EXCEL AUTOMATION FRAMEWORK
=============================================

Using test case file: ./ApplyNote Qa Script.xlsx
Target sheet: Admin
Available sheets: Admin, Website, Student WEB UI, Application Student, Final  Conclusion
Found 537 test cases in sheet: Admin

First 3 test cases:
1. TC001 - Login Verification
2. TC002 - Dashboard Access
3. TC003 - User Management

Preparing to login to admin app...
Press Enter to continue, or Ctrl+C to exit...

Logging into admin app with email: kaphlenerob@gmail.com
OTP required. Please enter OTP manually...
You have 2 minutes to enter the OTP. Press Enter when done...

Running: TC001 - Login Verification
Test Steps: Click login button, enter credentials, verify dashboard
Passed: TC001

=============================================
           TEST EXECUTION SUMMARY        
=============================================
Total Test Cases: 537
Passed:           512
Failed:           25
Success Rate:     95.34%
=============================================
```

## Troubleshooting

### If tests fail:
1. Check screenshots in `./screenshots/` folder
2. Review JSON reports in `./reports/` folder
3. Run with `HEADLESS=false` to see what's happening

### If login fails:
1. Verify credentials are correct
2. Check if the website structure has changed
3. Run in headed mode to debug

### If Excel parsing issues:
1. Ensure Excel file is not open in another program
2. Check that column headers match expected format
3. Run `node examine-excel.js` to debug structure

## Customization

To modify credentials, edit `applynote-login-automation.js`:
```javascript
this.credentials = {
    admin: {
        email: 'your-email@example.com',
        password: 'your-password',
        url: 'https://console.applynote.com/login'
    },
    student: {
        email: 'your-student-email@example.com',
        password: 'your-password',
        url: 'https://applynote.com/'
    }
};
```

## Next Steps

1. **Run a small test first**: Try with Website tests (no OTP required)
2. **Review screenshots**: Check if UI elements are captured correctly
3. **Analyze reports**: Look for patterns in failed tests
4. **Refine test cases**: Update Excel if selectors or steps need adjustment
