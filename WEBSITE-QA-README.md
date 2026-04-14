# Website QA Automation

Comprehensive testing framework for ApplyNote public website including navigation, content validation, contact forms, and user experience testing.

## Overview

The Website QA Automation Framework provides robust testing capabilities for ApplyNote public website, including navigation functionality, content display, contact forms, and responsive design validation.

## Features

✅ **Navigation Testing** - Menu, links, and routing validation
✅ **Content Validation** - Text, images, and media verification
✅ **Contact Form Testing** - Form submission and validation
✅ **Responsive Design Testing** - Mobile and desktop compatibility
✅ **Performance Testing** - Load times and user experience metrics
✅ **SEO Validation** - Meta tags and structure verification

## Quick Start

### 1. Install dependencies
```bash
npm install
npx playwright install chromium
```

### 2. Run Website Tests
```bash
# Run website tests (headless mode)
npm run website:qa

# Run website tests with visible browser
npm run website:qa:headed
```

## Test Coverage

### 🧭 Navigation Testing
- **Main Menu Navigation** - Primary menu functionality
- **Footer Links** - Footer navigation validation
- **Breadcrumbs** - Navigation path verification
- **Internal Links** - Page-to-page routing
- **External Links** - External site validation

### 📄 Content Validation
- **Hero Section** - Landing page content verification
- **Feature Sections** - Service and feature display
- **About Content** - Company information accuracy
- **Blog/News** - Content management testing
- **Image Display** - Media loading and alt text

### 📧 Contact Form Testing
- **Form Validation** - Required field checking
- **Email Submission** - Contact form functionality
- **Error Handling** - Invalid input responses
- **Success Messages** - Confirmation display
- **Spam Protection** - Bot prevention testing

### 📱 Responsive Design
- **Mobile Viewport** - Mobile device compatibility
- **Tablet Viewport** - Tablet display testing
- **Desktop Viewport** - Standard desktop validation
- **Touch Interactions** - Mobile gesture testing
- **Orientation Changes** - Device rotation testing

### ⚡ Performance Testing
- **Page Load Speed** - Initial load time measurement
- **Image Optimization** - Media loading performance
- **JavaScript Execution** - Script performance validation
- **Network Requests** - API call efficiency
- **User Experience** - Interaction responsiveness

## Test Execution

### Headless Mode (Default)
```bash
npm run website:qa
```
- Runs tests in background
- Faster execution
- Ideal for CI/CD pipelines

### Headed Mode (Visible Browser)
```bash
npm run website:qa:headed
```
- Real-time test observation
- Better for debugging
- Visual verification

### Custom Test File
```bash
node website-qa-runner.js your-test-file.xlsx
```

## Test Actions and Capabilities

### Supported Actions
| Action | Description | Website Use Case |
|--------|-------------|-----------------|
| `click` | Click elements | Navigation links, buttons |
| `type` | Enter text | Contact forms, search |
| `scrollintoview` | Scroll to element | Content visibility |
| `wait` | Pause execution | Page loads, animations |
| `verifyText` | Text validation | Content accuracy |
| `verifyVisible` | Visibility check | Element display |
| `verifyExists` | Existence validation | Page structure |
| `hover` | Mouse hover | Tooltip testing |

### Website-Specific Selectors

#### Navigation Elements
- Main navigation menus with multiple fallback selectors
- Footer navigation and link structures
- Breadcrumb navigation paths
- Mobile hamburger menus

#### Content Elements
- Hero section titles and descriptions
- Feature cards and service descriptions
- About section content blocks
- Blog/news article structures

#### Form Elements
- Contact form input fields
- Newsletter subscription forms
- Search functionality
- File upload interfaces

#### Interactive Elements
- Call-to-action buttons
- Social media links
- Video players and media
- Carousel/slider components

## Output and Reporting

### Test Results
- **Console Output**: Real-time website test execution status
- **JSON Reports**: Detailed website test results in `./reports/`
- **Screenshots**: Visual evidence in `./screenshots/`
- **Performance Metrics**: Page load times and interaction speeds

### Report Structure
```json
{
  "test_case_id": "TC_WEB_001",
  "test_case_name": "Homepage Navigation Test",
  "status": "passed",
  "duration": 2200,
  "error": null,
  "screenshot": "homepage-nav-success-20231214-143022.png"
}
```

### Summary Dashboard
```
=============================================
         WEBSITE QA TEST SUMMARY        
=============================================
Total Test Cases: 56
Passed:           54
Failed:           2
Success Rate:     96.43%
=============================================
```

## Configuration

### Environment Variables
```bash
# Browser mode
HEADLESS=false  # Show browser during website tests

# Timeout settings
WEBSITE_TIMEOUT=30000  # Element wait timeout

# Viewport testing
TEST_VIEWPORTS="mobile,tablet,desktop"  # Responsive testing
```

### Website URLs
The framework tests these website components:
- **Main Website**: https://applynote.com/
- **Admin Console**: https://console.applynote.com/
- **Contact Pages**: Various contact form URLs

## Best Practices for Website Testing

### Test Organization
- Group related website tests together
- Use descriptive test case names
- Include clear test descriptions
- Maintain test independence

### Content Validation
- Verify text accuracy and grammar
- Check image loading and alt text
- Validate link functionality
- Test form submission processes

### Performance Considerations
- Test on different network conditions
- Verify image optimization
- Monitor JavaScript execution
- Validate responsive design

## Troubleshooting

### Common Website Test Issues

**Navigation Failures**:
- Check for broken links
- Verify page routing configuration
- Test redirect functionality
- Validate menu structure

**Content Loading Issues**:
- Check image optimization
- Verify media file formats
- Test CDN functionality
- Validate caching strategies

**Form Submission Problems**:
- Verify form validation rules
- Test email delivery systems
- Check spam protection settings
- Validate success message display

### Debug Mode
```bash
DEBUG=true npm run website:qa
```

### Visual Debugging
```bash
HEADLESS=false npm run website:qa
```

## File Structure

```
automation/
├── website-qa-automation.js  # Core website automation engine
├── website-qa-runner.js      # Website test execution runner
├── custom-excel-reader.js    # Test data processor
├── screenshots/             # Website test screenshots
├── reports/                 # Website test reports
└── WEBSITE-QA-README.md    # This documentation
```

## Integration and Deployment

### CI/CD Integration
```bash
# Run website tests in pipeline
npm run website:qa

# Generate website reports
npm run generate:website-reports

# Archive website artifacts
tar -czf website-results.tar.gz screenshots/ reports/
```

### Docker Support for Website Testing
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "website:qa"]
```

## SEO and Accessibility

### SEO Validation
- Meta tag verification
- Title and description testing
- Heading structure validation
- Image alt text checking

### Accessibility Testing
- Screen reader compatibility
- Keyboard navigation testing
- Color contrast validation
- ARIA label verification

---

**Website QA Automation** - Comprehensive testing solution for public website functionality and user experience.
