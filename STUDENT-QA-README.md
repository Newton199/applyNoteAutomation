# Student Web UI QA Automation

Comprehensive testing framework for ApplyNote Student Web Interface including authentication, course management, assignments, and student dashboard functionality.

## Overview

The Student QA Automation Framework provides robust testing capabilities for ApplyNote student-facing web interface, including student authentication, course navigation, assignment submission, and academic progress tracking.

## Features

✅ **Student Authentication Testing** - Login and session management
✅ **Course Navigation Testing** - Course browsing and enrollment
✅ **Assignment Management** - Upload, submit, and track assignments
✅ **Grade Tracking Testing** - View and verify academic progress
✅ **Profile Management** - Student profile and settings validation
✅ **Responsive Design Testing** - Mobile and desktop compatibility

## Quick Start

### 1. Install dependencies
```bash
npm install
npx playwright install chromium
```

### 2. Run Student Web UI Tests
```bash
# Run student tests (headless mode)
npm run student:qa

# Run student tests with visible browser
npm run student:qa:headed
```

## Test Coverage

### 🔐 Student Authentication
- **Login Validation** - Student credential authentication
- **Session Management** - Login state persistence
- **Password Recovery** - Forgot password functionality
- **Account Security** - Student account protection

### 📚 Course Management
- **Course Browsing** - Course catalog navigation
- **Course Enrollment** - Registration process testing
- **Course Materials** - Content access verification
- **Progress Tracking** - Learning progress validation

### 📝 Assignment Management
- **Assignment Viewing** - Assignment list and details
- **File Upload** - Document submission testing
- **Submission Tracking** - Status and deadline monitoring
- **Feedback Viewing** - Grade and comment access

### 📊 Academic Dashboard
- **Dashboard Navigation** - Student panel functionality
- **Grade Display** - Academic performance viewing
- **Calendar Integration** - Schedule and deadline tracking
- **Notification System** - Alert and message testing

### 👤 Profile Management
- **Profile Editing** - Personal information updates
- **Settings Configuration** - Account preferences
- **Avatar Upload** - Profile picture testing
- **Privacy Settings** - Data protection controls

## Test Execution

### Headless Mode (Default)
```bash
npm run student:qa
```
- Runs tests in background
- Faster execution
- Ideal for CI/CD pipelines

### Headed Mode (Visible Browser)
```bash
npm run student:qa:headed
```
- Real-time test observation
- Better for debugging
- Visual verification

### Custom Test File
```bash
node student-qa-runner.js your-test-file.xlsx
```

## Test Actions and Capabilities

### Supported Actions
| Action | Description | Student Use Case |
|--------|-------------|------------------|
| `click` | Click elements | Course links, buttons |
| `type` | Enter text | Login, assignments |
| `select` | Choose options | Course selection, filters |
| `upload` | File upload | Assignment submissions |
| `wait` | Pause execution | Page loads, uploads |
| `verifyText` | Text validation | Grade display, messages |
| `verifyVisible` | Visibility check | Course materials |
| `press` | Keyboard input | Form navigation |

### Student-Specific Selectors

#### Authentication Elements
- Student login forms with email/password fields
- Session management components
- Password recovery interfaces

#### Navigation Elements
- Student dashboard menus
- Course navigation panels
- Assignment tracking interfaces
- Grade viewing components

#### Academic Elements
- Course material viewers
- Assignment submission forms
- Grade display panels
- Progress tracking widgets

## Output and Reporting

### Test Results
- **Console Output**: Real-time student test execution status
- **JSON Reports**: Detailed student test results in `./reports/`
- **Screenshots**: Visual evidence in `./screenshots/`
- **Performance Metrics**: Student operation execution times

### Report Structure
```json
{
  "test_case_id": "TC_STU_001",
  "test_case_name": "Student Login Test",
  "status": "passed",
  "duration": 2800,
  "error": null,
  "screenshot": "student-login-success-20231214-143022.png"
}
```

### Summary Dashboard
```
=============================================
         STUDENT QA TEST SUMMARY        
=============================================
Total Test Cases: 99
Passed:           95
Failed:           4
Success Rate:     95.96%
=============================================
```

## Configuration

### Environment Variables
```bash
# Browser mode
HEADLESS=false  # Show browser during student tests

# Timeout settings
STUDENT_TIMEOUT=30000  # Element wait timeout

# File upload settings
UPLOAD_TIMEOUT=60000  # File upload wait time
```

### Student Credentials
The framework uses pre-configured student credentials:
- **Email**: kaphleraj98@gmail.com
- **Password**: defaultpassword
- **URL**: https://applynote.com/

## Best Practices for Student Testing

### Test Organization
- Group related student tests together
- Use descriptive test case names
- Include clear test descriptions
- Maintain test independence

### Academic Data Testing
- Use test-specific academic data
- Clean up test assignments after execution
- Avoid production data contamination
- Implement data isolation

### Performance Considerations
- Test file upload functionality thoroughly
- Verify responsive design on different viewports
- Test with various file types and sizes
- Handle AJAX and dynamic content properly

## Troubleshooting

### Common Student Test Issues

**File Upload Failures**:
- Check file size limitations
- Verify supported file formats
- Test network connectivity
- Validate upload permissions

**Course Access Issues**:
- Verify student enrollment status
- Check course availability
- Test permission settings
- Validate course structure

**Authentication Problems**:
- Verify student credentials
- Check account status
- Test session management
- Validate login flow

### Debug Mode
```bash
DEBUG=true npm run student:qa
```

### Visual Debugging
```bash
HEADLESS=false npm run student:qa
```

## File Structure

```
automation/
├── student-qa-automation.js  # Core student automation engine
├── student-qa-runner.js      # Student test execution runner
├── custom-excel-reader.js    # Test data processor
├── screenshots/             # Student test screenshots
├── reports/                 # Student test reports
└── STUDENT-QA-README.md    # This documentation
```

## Integration and Deployment

### CI/CD Integration
```bash
# Run student tests in pipeline
npm run student:qa

# Generate student reports
npm run generate:student-reports

# Archive student artifacts
tar -czf student-results.tar.gz screenshots/ reports/
```

### Docker Support for Student Testing
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "student:qa"]
```

## Data Privacy and Security

### Student Data Protection
- Use anonymized test data
- Implement secure credential handling
- Follow GDPR compliance guidelines
- Audit test data access

### Academic Integrity
- Test with sample academic content
- Avoid real student data exposure
- Implement proper data cleanup
- Maintain test environment isolation

---

**Student Web UI QA Automation** - Comprehensive testing solution for student interface functionality and academic experience.
