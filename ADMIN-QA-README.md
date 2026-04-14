# Admin Console QA Automation

Comprehensive testing framework for ApplyNote Admin Console backend operations and administrative functionality.

## Overview

The Admin QA Automation Framework provides robust testing capabilities for the ApplyNote administrative interface, including authentication, user management, dashboard functionality, and administrative workflows.

## Features

✅ **Secure Authentication Testing** - OTP handling and credential validation
✅ **Administrative Workflow Testing** - Multi-step admin process validation
✅ **User Management Testing** - Create, edit, delete user operations
✅ **Dashboard Functionality** - Admin panel feature verification
✅ **Form Interaction Testing** - Complex form validation and submission
✅ **Privilege Testing** - Role-based access control verification

## Quick Start

### 1. Install dependencies
```bash
npm install
npx playwright install chromium
```

### 2. Run Admin Console Tests
```bash
# Run admin tests (headless mode)
npm run admin:qa

# Run admin tests with visible browser
npm run admin:qa:headed
```

## Test Coverage

### 🔐 Authentication Module
- **Login Validation** - Email and password authentication
- **OTP Handling** - Two-factor authentication support
- **Session Management** - Login session persistence
- **Security Testing** - Invalid credentials and access attempts

### 👥 User Management Module
- **User Creation** - Add new administrative users
- **User Editing** - Modify existing user details
- **User Deletion** - Remove user accounts
- **Role Assignment** - Administrative privilege testing

### 📊 Dashboard Module
- **Navigation Testing** - Menu and sidebar functionality
- **Widget Verification** - Dashboard component validation
- **Data Display** - Information accuracy testing
- **Interactive Elements** - Button and link functionality

### ⚙️ Administrative Functions
- **Configuration Management** - System settings validation
- **Data Import/Export** - File upload and download testing
- **Report Generation** - Admin report functionality
- **Audit Trail** - Activity log verification

## Test Execution

### Headless Mode (Default)
```bash
npm run admin:qa
```
- Runs tests in background
- Faster execution
- Ideal for CI/CD pipelines

### Headed Mode (Visible Browser)
```bash
npm run admin:qa:headed
```
- Real-time test observation
- Better for debugging
- Visual verification

### Custom Test File
```bash
node admin-qa-runner.js your-test-file.xlsx
```

## Test Actions and Capabilities

### Supported Actions
| Action | Description | Admin Use Case |
|--------|-------------|----------------|
| `click` | Click elements | Buttons, menus, links |
| `type` | Enter text | Forms, search fields |
| `select` | Choose options | Dropdowns, filters |
| `wait` | Pause execution | Page loads, AJAX |
| `waitFor` | Wait for element | Dynamic content |
| `verifyText` | Text validation | Error messages, success confirmations |
| `verifyVisible` | Visibility check | Element presence |
| `press` | Keyboard input | Shortcuts, form submission |

### Admin-Specific Selectors

#### Login Elements
- Email input fields with multiple fallback selectors
- Password input fields with various attribute detection
- Submit buttons with text-based XPath
- OTP input fields for two-factor authentication

#### Navigation Elements
- Admin menu items and sidebar navigation
- Dashboard widgets and panels
- User management interface elements
- Settings and configuration controls

#### Form Elements
- User creation and editing forms
- Configuration and settings forms
- Data import/export interfaces
- Report generation controls

## Output and Reporting

### Test Results
- **Console Output**: Real-time admin test execution status
- **JSON Reports**: Detailed admin test results in `./reports/`
- **Screenshots**: Visual evidence in `./screenshots/`
- **Performance Metrics**: Admin operation execution times

### Report Structure
```json
{
  "test_case_id": "TC_ADMIN_001",
  "test_case_name": "Admin Login Test",
  "status": "passed",
  "duration": 3500,
  "error": null,
  "screenshot": "admin-login-success-20231214-143022.png"
}
```

### Summary Dashboard
```
=============================================
         ADMIN QA TEST SUMMARY        
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
HEADLESS=false  # Show browser during admin tests

# Timeout settings
ADMIN_TIMEOUT=30000  # Element wait timeout

# OTP handling
OTP_WAIT_TIME=120000  # 2 minutes for manual OTP entry
```

### Admin Credentials
The framework uses pre-configured admin credentials:
- **Email**: kaphlenerob@gmail.com
- **Password**: applynote123
- **URL**: https://console.applynote.com/login

## Best Practices for Admin Testing

### Test Organization
- Group related admin tests together
- Use descriptive test case names
- Include clear test descriptions
- Maintain test independence

### Security Testing
- Test authentication mechanisms thoroughly
- Verify role-based access controls
- Test session management
- Validate input sanitization

### Performance Considerations
- Use appropriate wait strategies
- Optimize test execution order
- Minimize unnecessary interactions
- Handle AJAX and dynamic content

## Troubleshooting

### Common Admin Test Issues

**OTP Timeout**:
- Ensure 2-minute window is sufficient
- Check OTP delivery method
- Verify manual entry process

**Element Not Found**:
- Verify admin interface hasn't changed
- Check for dynamic element IDs
- Use alternative selectors

**Authentication Failures**:
- Verify admin credentials
- Check for account lockouts
- Validate login flow changes

### Debug Mode
```bash
DEBUG=true npm run admin:qa
```

### Visual Debugging
```bash
HEADLESS=false npm run admin:qa
```

## File Structure

```
automation/
├── admin-qa-automation.js     # Core admin automation engine
├── admin-qa-runner.js         # Admin test execution runner
├── custom-excel-reader.js     # Test data processor
├── screenshots/               # Admin test screenshots
├── reports/                   # Admin test reports
└── ADMIN-QA-README.md       # This documentation
```

## Integration and Deployment

### CI/CD Integration
```bash
# Run admin tests in pipeline
npm run admin:qa

# Generate admin reports
npm run generate:admin-reports

# Archive admin artifacts
tar -czf admin-results.tar.gz screenshots/ reports/
```

### Docker Support for Admin Testing
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "admin:qa"]
```

## Security Considerations

### Credential Management
- Store credentials securely
- Use environment variables in production
- Rotate credentials regularly
- Audit access logs

### Test Data Management
- Use test-specific data
- Clean up test data after execution
- Avoid production data contamination
- Implement data isolation

---

**Admin Console QA Automation** - Comprehensive testing solution for administrative interface reliability and security.
