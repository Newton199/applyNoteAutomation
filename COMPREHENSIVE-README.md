# ApplyNote QA Automation Framework

Comprehensive test automation framework for ApplyNote platform covering Admin Console, Student Web UI, Website, and Mobile Application testing.

## Overview

The ApplyNote QA Automation Framework provides end-to-end testing capabilities for all platform components:

- **Admin Console Testing** - Backend administrative interface testing
- **Student Web UI Testing** - Frontend user interface validation  
- **Website Testing** - Public website functionality verification
- **Mobile Application Testing** - Mobile app UI compliance testing

## Features

✅ **Multi-Platform Support** - Test all ApplyNote platform components
✅ **Smart Element Detection** - XPath and CSS selector strategies
✅ **Functional Testing** - Step-by-step test execution
✅ **UI Compliance Testing** - Visual validation and screenshots
✅ **Headless & Headed Modes** - Flexible execution options
✅ **Comprehensive Reporting** - Detailed test results and metrics
✅ **Error Handling** - Robust failure recovery and debugging

## Quick Start

### 1. Install dependencies
```bash
npm install
npx playwright install chromium
```

### 2. Run Tests by Platform

#### Admin Console Tests
```bash
# Run admin console functional tests
npm run functional:test:admin

# Run with visible browser
npm run functional:test:admin -- --headed
```

#### Student Web UI Tests
```bash
# Run student web UI tests
npm run functional:test:student-web

# Run with visible browser
npm run functional:test:student-web -- --headed
```

#### Website Tests
```bash
# Run website tests
npm run functional:test:website

# Run with visible browser
npm run functional:test:website -- --headed
```

#### Mobile Application Tests
```bash
# Run mobile app tests
npm run functional:test:student-app

# Run with visible browser
npm run functional:test:student-app -- --headed
```

## Testing Modules

### 🔧 Admin Console Testing

**Purpose**: Validate administrative functionality and backend operations

**Test Coverage**:
- Authentication and authorization
- User management operations
- Dashboard functionality
- Administrative workflows
- Data management features

**Key Features**:
- OTP handling for secure login
- Complex form interactions
- Multi-step workflow validation
- Administrative privilege testing

**Commands**:
```bash
npm run functional:test:admin
```

### 🎨 Student Web UI Testing

**Purpose**: Verify student-facing web interface functionality

**Test Coverage**:
- Student authentication
- Course navigation
- Profile management
- Assignment submission
- Grade viewing

**Key Features**:
- Responsive design validation
- Interactive element testing
- Form validation testing
- User journey verification

**Commands**:
```bash
npm run functional:test:student-web
```

### 🌐 Website Testing

**Purpose**: Validate public website functionality and user experience

**Test Coverage**:
- Navigation menu functionality
- Landing page elements
- Contact forms
- Information architecture
- Cross-browser compatibility

**Key Features**:
- UI component validation
- Link functionality testing
- Content accessibility
- Performance metrics

**Commands**:
```bash
npm run functional:test:website
```

### 📱 Mobile Application Testing

**Purpose**: Ensure mobile app UI compliance and functionality

**Test Coverage**:
- Mobile-specific UI elements
- Touch interaction testing
- Screen resolution compatibility
- Mobile workflow validation
- App navigation testing

**Key Features**:
- Mobile viewport simulation
- Touch gesture testing
- Mobile-specific validation
- Responsive design testing

**Commands**:
```bash
npm run functional:test:student-app
```

## Test Execution Modes

### Headless Mode (Default)
- Runs tests in background
- Faster execution
- Ideal for CI/CD pipelines
- Resource efficient

### Headed Mode
- Visible browser execution
- Real-time test observation
- Better for debugging
- Visual verification

**Run in Headed Mode**:
```bash
# For any test command, add --headed flag
npm run functional:test:admin -- --headed

# Or set environment variable
HEADLESS=false npm run functional:test:admin
```

## Test Actions and Capabilities

### Supported Actions
| Action | Description | Usage |
|--------|-------------|-------|
| `click` | Click on elements | Buttons, links, interactive elements |
| `type` | Enter text input | Form fields, search boxes |
| `select` | Choose dropdown options | Select menus, filters |
| `wait` | Pause execution | Timing control, page loads |
| `waitFor` | Wait for element | Dynamic content, AJAX |
| `verifyText` | Text validation | Content verification |
| `verifyVisible` | Visibility check | Element presence |
| `verifyExists` | Existence validation | DOM element testing |
| `press` | Keyboard input | Keyboard shortcuts |
| `hover` | Mouse hover | Tooltip testing |
| `doubleClick` | Double click | Special interactions |
| `rightClick` | Context menu | Right-click actions |
| `upload` | File upload | Document submission |

### Element Detection Strategies

The framework uses multiple selector strategies for robust element detection:

**CSS Selectors**:
- Tag-based: `button`, `input`, `select`
- Class-based: `.btn-primary`, `.form-control`
- ID-based: `#submit-button`, `#user-email`
- Attribute-based: `[type="submit"]`, `[data-testid]`

**XPath Selectors**:
- Text-based: `//button[contains(text(), "Submit")]`
- Hierarchy-based: `//div[@class="form"]/input`
- Attribute-based: `//input[@name="username"]`
- Position-based: `//td[3]/a[1]`

**Smart Element Mapping**:
- Login buttons and forms
- Navigation menus
- Interactive elements
- Form controls

## Output and Reporting

### Test Results
- **Console Output**: Real-time test execution status
- **JSON Reports**: Detailed test results in `./reports/`
- **Screenshots**: Visual evidence in `./screenshots/`
- **Performance Metrics**: Execution time and success rates

### Report Structure
```json
{
  "test_case_id": "TC001",
  "test_case_name": "Admin Login Test",
  "status": "passed",
  "duration": 2500,
  "error": null,
  "screenshot": "pass-TC001-20231214-143022.png"
}
```

### Summary Dashboard
```
=============================================
           FUNCTIONAL TEST SUMMARY        
=============================================
Total Test Cases: 537
Passed:           512
Failed:           25
Success Rate:     95.34%
=============================================
```

## Configuration

### Environment Variables
```bash
# Browser mode
HEADLESS=false  # Show browser during tests

# Timeout settings
DEFAULT_TIMEOUT=30000  # Element wait timeout

# Screenshot settings
FULL_PAGE_SCREENSHOTS=true  # Capture full page
```

### Custom Test Configuration
Modify test parameters in the automation files:
- Browser viewport settings
- Timeout configurations
- Screenshot preferences
- Error handling strategies

## Best Practices

### Test Organization
- Group related tests together
- Use descriptive test names
- Include clear test descriptions
- Maintain test independence

### Element Selection
- Use stable selectors (ID over class)
- Avoid brittle XPath expressions
- Prefer semantic HTML elements
- Test selector reliability

### Error Handling
- Implement proper wait strategies
- Add meaningful assertions
- Capture relevant screenshots
- Log detailed error messages

### Performance Optimization
- Use headless mode for CI/CD
- Parallelize independent tests
- Optimize wait times
- Minimize unnecessary interactions

## Troubleshooting

### Common Issues

**Element Not Found**:
- Verify selector accuracy
- Check element timing
- Use explicit waits
- Try alternative selectors

**Timeout Errors**:
- Increase timeout values
- Check page load status
- Verify network conditions
- Use conditional waits

**Authentication Failures**:
- Verify credentials
- Check OTP requirements
- Validate login flow
- Test session management

### Debug Mode
Run tests with enhanced logging:
```bash
DEBUG=true npm run functional:test:admin
```

### Visual Debugging
Use headed mode for step-by-step observation:
```bash
HEADLESS=false npm run functional:test:admin
```

## Project Structure

```
automation/
├── enhanced-automation.js      # Core automation engine
├── custom-excel-reader.js      # Test data processor
├── run-functional-tests.js     # Test execution runner
├── functional-test-runner.js   # Alternative test runner
├── screenshots/               # Test execution screenshots
├── reports/                   # JSON test reports
├── package.json              # Dependencies and scripts
└── COMPREHENSIVE-README.md  # This documentation
```

## Integration and Deployment

### CI/CD Integration
```bash
# Run tests in pipeline
npm run functional:test:admin

# Generate reports
npm run generate:reports

# Archive artifacts
tar -czf test-results.tar.gz screenshots/ reports/
```

### Docker Support
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "functional:test:admin"]
```

## Support and Maintenance

### Regular Updates
- Update browser versions
- Review test selectors
- Optimize test performance
- Update documentation

### Monitoring
- Track test success rates
- Monitor execution times
- Analyze failure patterns
- Maintain test coverage

---

**ApplyNote QA Automation Framework** - Comprehensive testing solution for platform reliability and quality assurance.
