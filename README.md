# ApplyNote QA Automation Framework

Excel-driven QA automation framework for testing applynote.com student application and admin console.

## Features
✅ Excel/XLSX based test case management
✅ Supports both Student App (applynote.com) and Admin Console (console.applynote.com)
✅ Headless and headed browser modes
✅ Automatic screenshot capture on failures
✅ JSON test reports
✅ No coding required - just update Excel file

## Quick Start

### 1. Install dependencies
```bash
npm install
npx playwright install chromium
```

### 2. Run tests
```bash
# Run all tests (headless mode)
npm test

# Run tests with visible browser
npm run test:headed

# Run only student app tests
npm run test:student

# Run only admin console tests
npm run test:admin

# Run with custom Excel file
node test-runner.js your-test-file.xlsx
```

## Playwright Test (Google Sheet driven)

This repo also includes Playwright Test specs under `pw-tests/` that:
- Validate the shared Google Sheet loads
- Download the Google Sheet as CSV/XLSX and extract test cases from **all tabs**
- Run a few sample Admin Console flows (TC01–TC03) when possible

### Run Playwright Test suite
```bash
npm run pw:test
```

### Admin login tests (TC01/TC02) + OTP

These tests require environment variables (see `.env.example`):
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- If prompted, `ADMIN_OTP` (short-lived)

PowerShell example:
```powershell
$env:ADMIN_EMAIL="your-email"
$env:ADMIN_PASSWORD="your-password"
$env:ADMIN_OTP="123456"
npm run pw:test
```

## Excel Test Case Format

The Excel file contains 3 sheets:

1. **TestCases** - Main test execution sheet
   | Column          | Description |
   |-----------------|-------------|
   | Test Case ID    | Unique test identifier |
   | Test Case Name  | Test name |
   | Description     | Test details |
   | App Type        | `student`, `admin`, or `both` |
   | Action          | Action to perform (click, type, verifyText, etc) |
   | Selector        | CSS selector for the element |
   | Value           | Input value or expected result |
   | Expected Result | Verification expected value |
   | Enabled         | Yes/No to enable/disable test |

2. **TestData** - Centralized test data management
3. **Elements** - Element repository (CSS selectors reference)

## Supported Actions
| Action          | Usage |
|-----------------|-------|
| `click`         | Click element |
| `type` / `input`| Enter text into field |
| `select`        | Select dropdown option |
| `wait`          | Wait milliseconds |
| `waitFor`       | Wait for element to appear |
| `verifyText`    | Verify element contains text |
| `verifyVisible` | Verify element is visible |
| `verifyExists`  | Verify element exists on page |
| `press`         | Press keyboard key |

## Output
- 📸 Screenshots on test failures: `./screenshots/`
- 📊 JSON test reports: `./reports/`
- Console summary with pass/fail counts

## Example Test Case
| Test Case ID | Test Case Name | App Type | Action | Selector | Expected Result |
|--------------|----------------|----------|--------|----------|-----------------|
| STU-001 | Verify login button | student | verifyExists | button:has-text("Login") | Login button exists |

## Project Structure
```
├── excel-reader.js           # Excel file parser
├── applynote-automation.js   # Core automation engine
├── test-runner.js            # Test execution script
├── applynote-test-cases.xlsx # Sample test cases
├── screenshots/              # Failure screenshots
└── reports/                  # Test execution reports
```