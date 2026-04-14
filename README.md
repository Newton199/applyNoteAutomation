# ApplyNote Test Cases - TEST 01 to TEST 198

Total Test Cases: 218
Enabled Tests: 85
Disabled Tests: 133

## Complete Test Case List

1. **Test   01** - Valid Admin Login
   - Module: Authentication
   - Status: ENABLED
   - Steps: 1. Navigate to console.applynote.com.2. Enter Email: kaphlenerob@gmail.com.3. Enter Password: defaultpassword.4. Click 'Login'
   - Expected: User should be redirected to the main Admin Dashboard successfully.

2. **Test   02** - Invalid Password
   - Module: Authentication
   - Status: ENABLED
   - Steps: 1. Enter Email: kaphlenerob@gmail.com.2. Enter an incorrect password3. Click 'Login'
   - Expected: System should display "Invalid credentials" error message. Access denied.

3. **FeTest  hes laTest   2 records from Admin DB.** - Titles and images from "Studying Abroad" category load.
   - Module: Blogs Module
   - Status: DISABLED
   - Steps: PASS
   - Expected: Carousel navigation (< >) is functional.

4. **Test   03** - Empty Fields
   - Module: Authentication
   - Status: ENABLED
   - Steps: 1. Leave Email and Password blank2. Click 'Login'
   - Expected: Inline validation should appear: "Email/Password is required."

5. **Test   04** - Dashboard Data Loading
   - Module: Dashboard
   - Status: ENABLED
   - Steps: 1. Log in successfully2. Observe charts and summary cards.
   - Expected: All data widgets (stats, graphs) should load without "NaN" or error icons.

6. **Test   05** - Profile Visibility
   - Module: User Profile
   - Status: ENABLED
   - Steps: 1. Click on the User Profile icon/name2. Select 'My Profile'
   - Expected: Admin details for kaphlenerob@gmail.com should be displayed correctly.

7. **Test  06** - Sidebar Functional Check
   - Module: Navigation
   - Status: ENABLED
   - Steps: 1. Click through every menu item on the left sidebar.
   - Expected: Each link should open the correct page without a 404 error.

8. **Test  07** - Search Functionality
   - Module: Management
   - Status: ENABLED
   - Steps: 1. Navigate to any list view (e.g., Notes/Users)2. Type a known keyword in the Search bar.
   - Expected: The table should filter in real-time to show only maTest  hing records.

9. **Test  08** - Create New Entry (+)
   - Module: Management
   - Status: ENABLED
   - Steps: 1. Click the 'Add' or 'Create' button2. Fill in all required fields3. Click 'Save'
   - Expected: System should show a "Success" toast message and the new entry should appear in the list.

10. **Test  09** - Edit Existing Entry
   - Module: Management
   - Status: ENABLED
   - Steps: 1. Click the 'Edit' pencil icon on any record2. Modify a text field3. Click 'Update'
   - Expected: The change should persist and be reflected in the database/list view.

11. **Test  10** - Download/Export Report
   - Module: Export/Import
   - Status: ENABLED
   - Steps: 1. Navigate to a report or list section2. Click 'Export' or 'Download CSV'.
   - Expected: A file should download containing the correct data displayed on the screen.

12. **Test  11** - Dark Mode Toggle
   - Module: System
   - Status: ENABLED
   - Steps: 1. Click the Moon/Sun icon in the header.
   - Expected: UI theme should swiTest  h between Light and Dark modes without visual gliTest  hes.

13. **Test  12** - Secure Logout
   - Module: Logout
   - Status: ENABLED
   - Steps: 1. Click 'Logout' button.
   - Expected: Session should be cleared. User redirected back to the login page. Back button shouldn't re-enter dashboard.

14. **Test  12** - Initiate Login
   - Module: Login
   - Status: ENABLED
   - Steps: 1. Navigate to console.applynote.com 2. Enter Email: kaphlenerob@gmail.com 3. Enter Password: defaultpassword 4. Click 'Sign In'
   - Expected: User is redirected to the "Enter Verification Code" screen.

15. **Test  13** - Email DeSystemry
   - Module: OTP Flow
   - Status: ENABLED
   - Steps: 1. Trigger the login (as per Test  _LOG_01).2. Open email inbox for kaphlenerob@gmail.com.
   - Expected: A verification email from ApplyNote should arrive within 60 seconds.

16. **Test  14** - Valid OTP Entry
   - Module: OTP Flow
   - Status: ENABLED
   - Steps: 1. Copy the 6-digit code from the email2. Enter the code into the verification field3. Click 'Verify'.
   - Expected: User is successfully authenticated and redirected to the Admin Dashboard.

17. **Test  15** - Invalid OTP Entry
   - Module: OTP Flow
   - Status: ENABLED
   - Steps: 1. Enter an incorrect 6-digit code (e.g., 000000) 2. Click 'Verify'.
   - Expected: Error message: "Invalid verification code" should be displayed. Access denied.

18. **Test  16** - Expired OTP
   - Module: OTP Flow
   - Status: ENABLED
   - Steps: 1. Wait for the OTP expiry time (e.g., 5-10 mins) 2. Enter the code and click 'Verify'.
   - Expected: Error message: "Code expired. Please request a new one" should appear.

19. **Test  17** - Resend OTP
   - Module: OTP Flow
   - Status: ENABLED
   - Steps: 1. Click the 'Resend Code' link on the verification screen.
   - Expected: A new verification email should arrive; the previous code should become invalid.

20. **Test  18** - UI Constraints
   - Module: OTP Flow
   - Status: ENABLED
   - Steps: 1. Try to enter letters or special characters in the OTP field.
   - Expected: Field should only accept numerical digits (0-9).

21. **Test  19** - Persistent Login
   - Module: Session
   - Status: ENABLED
   - Steps: 1. Complete OTP login2. Close the browser tab 3. Re-open console.applynote.com.
   - Expected: Admin should still be logged in (unless 'Remember Me' was unchecked or session timed out).

22. **Test  20** - Session Termination
   - Module: Logout
   - Status: ENABLED
   - Steps: 1. Click 'Logout' 2. Try to navigate back to the dashboard URL.
   - Expected: User should be redirected to Login. Back button should not reveal dashboard data.

23. **Test  20** - Add New Student
   - Module: Students
   - Status: ENABLED
   - Steps: 1. Click '+ Add Student'2. Fill required fields across Basic, Location, and Additional Info3. Click 'Add New'.
   - Expected: Student is saved successfully and appears in the Student List.

24. **Test  21** - View Student Profile
   - Module: Students
   - Status: ENABLED
   - Steps: 1. Click Action Menu (⋮) on a student2. Select 'View Student'.
   - Expected: Redirects to Student Profile Dashboard showing correct data (e.g., S1043).

25. **Test  22** - Activities Tab
   - Module: Profile
   - Status: ENABLED
   - Steps: 1. Open Student Profile2. Click 'Activities'.
   - Expected: System audit logs (e.g., ID set, User set) display with correct timestamps.

26. **Test  23** - Notes Tab
   - Module: Profile
   - Status: ENABLED
   - Steps: 1. Open Student Profile > 'Notes'2. Add a text note and save.
   - Expected: Note is saved to the timeline with the author's name and timestamp.

27. **Test  24** - Documents Upload
   - Module: Profile
   - Status: ENABLED
   - Steps: 1. Open Student Profile > 'Documents'2. Upload PDF, JPG, PNG, and DOCX files.
   - Expected: System accepts formats, rejects unsupported ones, and lists files for download.

28. **Test  25** - Applications Filter
   - Module: Profile
   - Status: ENABLED
   - Steps: 1. Go to 'Applications' tab inside Student Profile2. Apply a filter (e.g., Status).
   - Expected: Table updates to show only applications maTest  hing the filter for this specific student.

29. **Test  26** - Create from Action Menu
   - Module: Create App
   - Status: ENABLED
   - Steps: 1. On Student List, click (⋮) > 'Create Application'.
   - Expected: "Create Application" modal opens. Student data is pre-linked internally.

30. **Test  27** - Create from App List
   - Module: Create App
   - Status: ENABLED
   - Steps: 1. Navigate to Applications List2. Click '+ Create Application'.
   - Expected: Form opens. User must be able to select/search for the Student manually.

31. **Test  28** - Submit Application
   - Module: Create App
   - Status: ENABLED
   - Steps: 1. Expand all accordions and fill required fields2. Click 'Add New'.
   - Expected: Application saves successfully, status updates to 'Pending', and it appears in the Applications List.

32. **Test  29** - Application Logs Filter
   - Module: Filter
   - Status: ENABLED
   - Steps: 1. Click 'Filter' on App List2. Select Visa Status & Counsellor3. Click 'Apply'.
   - Expected: List strictly displays records maTest  hing the selected Visa and Counsellor parameters.

33. **Test  29** - Search Functionality
   - Module: App List
   - Status: ENABLED
   - Steps: 1. Type a known Application ID (e.g., APP-2026.) in the Search bar.
   - Expected: Table filters instantly to show only the maTest  hing application.

34. **Test  30** - Grid vs List Toggle
   - Module: App List
   - Status: ENABLED
   - Steps: 1. Click the Grid icon (▦)2. Click the List icon (▤).
   - Expected: UI transitions smoothly between card-based and table-based layouts without data loss.

35. **Test  31** - Manage Columns
   - Module: App List
   - Status: ENABLED
   - Steps: 1. Click 'Manage Columns'2. Uncheck 'Country'3. Click 'Apply'.
   - Expected: The 'Country' column disappears from the main table view.

36. **Test  32** - Apply Multi-Filter
   - Module: Filter
   - Status: ENABLED
   - Steps: 1. Click 'Filter'2. Select a specific 'Country' and 'Application Status'3. Click 'Apply'.
   - Expected: Table lists only applications that maTest  h both selected criteria.

37. **Test  33** - Reset Filter
   - Module: Filter
   - Status: ENABLED
   - Steps: 1. Open active filter2. Click 'Reset All' link.
   - Expected: All dropdowns clear; table returns to showing all 8 records.

38. **Test  34** - Accordion Interaction
   - Module: Create App
   - Status: ENABLED
   - Steps: 1. Click '+ Create Application'2. Click on the header of 'Visa Details'.
   - Expected: The accordion expands smoothly to reveal form fields. Chevron arrow points up.

39. **Test  35** - Form Validation
   - Module: Create App
   - Status: ENABLED
   - Steps: 1. Open '+ Create Application'2. Leave mandatory fields blank3. Click 'Add New'.
   - Expected: System prevents submission; required fields/accordions are highlighted with error messages.

40. **Test  36** - Successful Submission
   - Module: Create App
   - Status: ENABLED
   - Steps: 1. Fill all required fields across the 15 accordions2. Click 'Add New'.
   - Expected: Modal closes, success toast message appears, new Application ID appears at the top of the list.

41. **Test  37** - View Application
   - Module: Action Menu
   - Status: DISABLED
   - Steps: 1. Click the (⋮) menu on a record2. Click 'View' or 'Edit'.
   - Expected: User is routed to the detailed application view/edit screen with data pre-populated.

42. **Test  38** - Search Functionality
   - Module: Pending Assign.
   - Status: DISABLED
   - Steps: 1. Type a known Student ID (e.g., S1043) in the Search bar.
   - Expected: Table filters instantly to show only the maTest  hing student.

43. **Test  39** - Apply Filter
   - Module: Pending Assign.
   - Status: DISABLED
   - Steps: 1. Click 'Filter'2. Select a specific 'Country' (e.g., Nepal)3. Click 'Apply'.
   - Expected: List updates to display only pending assignments originating from the selected country.

44. **Test  40** - Reset Filter
   - Module: Pending Assign.
   - Status: DISABLED
   - Steps: 1. Open active filter2. Click 'Reset All' link.
   - Expected: Country dropdown clears, and the table returns to showing all pending records.

45. **Test  41** - Action Menu: Assign Counsellor
   - Module: Pending Assign.
   - Status: DISABLED
   - Steps: 1. Click the (⋮) menu on a pending record2. Select the option to Assign (e.g., 'Assign Counsellor')3. Submit assignment.
   - Expected: The student is removed from the "Pending Assignment" list and moved to the "Assignment Approval" queue.

46. **Test  42** - Verify Transferred Data
   - Module: Assign. Approval
   - Status: DISABLED
   - Steps: 1. Navigate to 'Assignment Approval'2. Locate the student assigned in Test  _PND_04.
   - Expected: Student appears in the list. The 'Counsellor Assigned' and 'Unit' columns correctly reflect the requested assignment.

47. **Test  43** - Action Menu: Approve
   - Module: Assign. Approval
   - Status: DISABLED
   - Steps: 1. Click the (⋮) menu on an unapproved record2. Click 'Approve'.
   - Expected: Success message appears. The record is removed from the Approval list, and the student is officially assigned to the user/unit.

48. **Test  44** - Action Menu: Reject
   - Module: Assign. Approval
   - Status: DISABLED
   - Steps: 1. Click the (⋮) menu on an unapproved record2. Click 'Reject'.
   - Expected: Record is removed from Approval. The student should revert back to the 'Pending Assignment' list.

49. **Test  44** - Search Functionality
   - Module: List View
   - Status: DISABLED
   - Steps: 1. Enter known Institution Name in Search bar.
   - Expected: Table filters in real-time to show only agreements maTest  hing the typed institution.

50. **Test  45** - Export Data
   - Module: List View
   - Status: DISABLED
   - Steps: 1. Click the 'Export' button.
   - Expected: System downloads a CSV/Excel file containing the active table data (adhering to column settings).

51. **Test  46** - Apply Blacklist Filter
   - Module: Filter
   - Status: DISABLED
   - Steps: 1. Click 'Filter'2. Select 'Blacklisted' radio3. Click 'Apply'.
   - Expected: Table updates to show ONLY agreements that have the Blacklist flag set to 'Yes'.

52. **Test  47** - Reorder Columns
   - Module: Manage Col.
   - Status: DISABLED
   - Steps: 1. Click 'Manage Columns'2. Drag 'Start Date' above 'Institution'3. Click 'Apply'.
   - Expected: The table layout updates immediately to reflect the new column sequence.

53. **Test  48** - Validation Check
   - Module: Add Form
   - Status: DISABLED
   - Steps: 1. Click '+ Add Agreement'2. Leave required fields empty3. Click 'Add Agreement'.
   - Expected: Submission is blocked. Error messages or red highlights appear on empty mandatory fields.

54. **Test  49** - Commission Logic
   - Module: Add Form
   - Status: DISABLED
   - Steps: 1. Open '+ Add Agreement' > Commission2. Toggle from 'Flat Rate' to 'By Course Level'.
   - Expected: The "Commission Rate (%)" input should dynamically change to allow multi-level inputs or a dynamic table.

55. **Test  50** - Date Validation
   - Module: Add Form
   - Status: DISABLED
   - Steps: 1. Open '+ Add Agreement' > Agreement Info2. Select an End Date that is before the Start Date.
   - Expected: System should throw an error preventing negative date ranges.

56. **Test  51** - Add Attachment
   - Module: Add Form
   - Status: DISABLED
   - Steps: 1. Expand Attachments accordion2. Click '+ Add'3. Select a PDF file.
   - Expected: File uploads successfully and displays a thumbnail or file name preview before saving.

57. **Test  52** - Successful Save
   - Module: Add Form
   - Status: DISABLED
   - Steps: 1. Fill all required fields accurately2. Click 'Add Agreement'.
   - Expected: Modal closes, success notification appears, and the new agreement is visible in the list.

58. **Test  52** - Global Search
   - Module: List View
   - Status: DISABLED
   - Steps: 1. Enter partial Institution Name in Search bar.
   - Expected: Table filters instantly to show maTest  hing institutions.

59. **Test  53** - Export Function
   - Module: List View
   - Status: DISABLED
   - Steps: 1. Click the 'Export' button.
   - Expected: System downloads an Excel/CSV file with the current institution list.

60. **Test  54** - Import Function
   - Module: List View
   - Status: DISABLED
   - Steps: 1. Click the 'Import' button2. Upload a valid template file.
   - Expected: System parses file and adds multiple institution records to the table.

61. **Test  55** - Type & Status Filter
   - Module: Filter
   - Status: DISABLED
   - Steps: 1. Click 'Filter'2. Select 'Active' status and a specific 'Institution Type'3. Click 'Apply'.
   - Expected: List displays only records maTest  hing both selected criteria.

62. **Test  56** - Image Upload (1:1)
   - Module: Add Form
   - Status: DISABLED
   - Steps: 1. Open '+ Add Institution'2. Upload a non-square image.
   - Expected: System should ideally offer a crop tool or validate the 1500x1500px recommendation.

63. **Test  57** - Validation Logic
   - Module: Add Form
   - Status: DISABLED
   - Steps: 1. Open '+ Add Institution'2. Fill only 'Basic Info' but not 'Location Info'3. Click 'Add New'.
   - Expected: Submission is blocked. 'Location Info' accordion should highlight missing required fields (City/Country).

64. **Test  58** - Date Picker
   - Module: Add Form
   - Status: DISABLED
   - Steps: 1. Click 'Established' date field.
   - Expected: Calendar widget opens, allows selection of past dates, and formats correctly in field.

65. **Test  59** - Successful Create
   - Module: Add Form
   - Status: DISABLED
   - Steps: 1. Fill all required fields across all accordions2. Click 'Add New'.
   - Expected: Modal closes, success toast appears, and the new institution appears in the table.

66. **Test  61** - 1. Navigate to Institution Grid View2. Click the (⋮) icon on a card.
   - Module: Open Action Menu
   - Status: DISABLED
   - Steps: The menu appears overlaying the card content.
   - Expected: 

67. **Test  62** - 1. Click "Edit institution" from the menu.
   - Module: Trigger Edit
   - Status: DISABLED
   - Steps: User is redirected to the edit form or the "Add Institution" modal opens with pre-filled data.
   - Expected: 

68. **Test  63** - 1. Click "View institution" from the menu.
   - Module: Trigger View
   - Status: DISABLED
   - Steps: User is routed to the dedicated Institution Profile/Detail page.
   - Expected: Core CRUD function.

69. **Test  64** - 1. Click "Delete institution" from the menu.
   - Module: Trigger Delete
   - Status: DISABLED
   - Steps: A Confirmation Modal must appear asking "Are you sure?" before proceeding.
   - Expected: 

70. **Test  65** - 1. Open the menu2. Click anywhere outside the menu.
   - Module: Menu Dismissal
   - Status: DISABLED
   - Steps: The popover should close immediately.
   - Expected: Security Check: Verify the record isn't deleted without a prompt.

71. **Test  67** - Vertical 3-dot (⋮) icon positioned at the top-right of the card header.
   - Module: Action Trigger
   - Status: ENABLED
   - Steps: Icon is present and triggers the dropdown correctly.
   - Expected: 

72. **Test  68** - White floating popover with rounded corners and a soft drop-shadow.
   - Module: Menu Styling
   - Status: ENABLED
   - Steps: UI maTest  hes standard design system depth and styling.
   - Expected: 

73. **Test  69** - Pencil icon followed by "Edit institution" text.
   - Module: Edit Option
   - Status: ENABLED
   - Steps: Icon and label align with Figma specs.
   - Expected: 

74. **Test  70** - Eye icon followed by "View institution" text.
   - Module: View Option
   - Status: ENABLED
   - Steps: Icon and label align with Figma specs.
   - Expected: 

75. **Test  71** - Trash icon followed by "Delete institution" text in Red.
   - Module: Delete Option
   - Status: ENABLED
   - Steps: Red color is correctly applied to signify a destructive action.
   - Expected: Important for user safety.

76. **Test  71** - Navigate to Child View
   - Module: Parent View
   - Status: ENABLED
   - Steps: 1. On "Campus by Institution", click (⋮) next to an institution2. Select 'View All Campus'.
   - Expected: Page transitions to the detailed list of campuses specifically for that chosen institution.

77. **Test  72** - Bulk Delete Warning
   - Module: Parent View
   - Status: ENABLED
   - Steps: 1. Click (⋮) next to an institution2. Select 'Delete all campus'.
   - Expected: A severe warning modal MUST appear ("Are you sure? This will delete X campuses"). It should not delete immediately.

78. **Test  73** - Import/Export
   - Module: Child View
   - Status: ENABLED
   - Steps: 1. In the specific institution's campus view, click 'Export'.
   - Expected: System downloads a CSV/Excel file containing ONLY the campuses for that specific institution.

79. **Test  74** - Edit Campus
   - Module: Child View
   - Status: ENABLED
   - Steps: 1. Click (⋮) on a specific campus2. Click 'Edit Campus'.
   - Expected: The "Add Campus" modal opens, pre-populated with the selected campus's data.

80. **Test  75** - Global Add Campus
   - Module: Add Form
   - Status: ENABLED
   - Steps: 1. Click '+ Add Campus' from the main Parent view2. Open 'Institution' dropdown.
   - Expected: Dropdown must display a searchable list of all active master institutions.

81. **Test  76** - Contextual Add Campus
   - Module: Add Form
   - Status: ENABLED
   - Steps: 1. Click '+ Add Campus' from inside a specific Child view (e.g., University of Adelaide).
   - Expected: Form opens. The 'Institution' dropdown should ideally be pre-selected to 'University of Adelaide'.

82. **Test  77** - Validation Check
   - Module: Add Form
   - Status: ENABLED
   - Steps: 1. Leave 'Campus Name' or 'City' blank2. Click 'Add New'.
   - Expected: Submission blocked. UI highlights the missing required fields in red.

83. **Test  78** - Successful Save
   - Module: Add Form
   - Status: ENABLED
   - Steps: 1. Fill all required fields accurately2. Click 'Add New'.
   - Expected: Modal closes. The 'No. of Campuses' count on the Parent view should increase by 1.

84. **Test  79** - Export  and  import  functionality
   - Module: Export & Import  Feature
   - Status: ENABLED
   - Steps: 1. Import  and Export  function on right top  cornem
   - Expected: 

85. **Test  80** - Search Box 
   - Module: Search Feature
   - Status: ENABLED
   - Steps: 1. Left Corner  search  box 
   - Expected: 

86. **Test  80** - Navigate to Child View
   - Module: Parent View
   - Status: ENABLED
   - Steps: 1. Click (⋮) next to an institution2. Select 'View All Course Levels'.
   - Expected: Page transitions to the detailed list of levels for that institution.

87. **Test  81** - Global Search
   - Module: Parent View
   - Status: ENABLED
   - Steps: 1. Enter Institution name in search bar.
   - Expected: Table filters to show only the target institution.

88. **Test  82** - Nested Search
   - Module: Child View
   - Status: ENABLED
   - Steps: 1. Inside a specific institution view, search for a Level (e.g., 'Masters').
   - Expected: Table filters to show only 'Masters' for that specific university.

89. **Test  83** - Export Function
   - Module: Child View
   - Status: ENABLED
   - Steps: 1. Click the 'Export' button in the child view.
   - Expected: System downloads a file containing the course levels for that institution.

90. **Test  84** - Mandatory Validation
   - Module: Add Form
   - Status: ENABLED
   - Steps: 1. Leave 'Course Level Name' blank2. Click 'Add New'.
   - Expected: Submission blocked. Red validation error appears on the field.

91. **Test  85** - Institution Linking
   - Module: Add Form
   - Status: ENABLED
   - Steps: 1. Open Add form2. Select an institution from the dropdown.
   - Expected: Only program types/courses linked to that institution should appear in the 'Course' dropdown.

92. **Test  86** - Successful Save
   - Module: Add Form
   - Status: ENABLED
   - Steps: 1. Fill all required fields2. Click 'Add New'.
   - Expected: Modal closes. 'No. of Course Levels' on parent screen increases.

93. **Test  87** - Delete All Levels
   - Module: Bulk Action
   - Status: ENABLED
   - Steps: 1. Click (⋮) on Parent View2. Select 'Delete all Course Levels'.
   - Expected: System prompts for confirmation before wiping all levels for that institution.

94. **Test  87** - Nested Search
   - Module: Search
   - Status: ENABLED
   - Steps: 1. Open a specific institution's course list2. Search for a specific Course Code.
   - Expected: Table filters to show only the maTest  hing course.

95. **Test  88** - Export Scoped Data
   - Module: Export
   - Status: ENABLED
   - Steps: 1. Click 'Export' in the Child View.
   - Expected: Downloads a file containing courses only for the active institution.

96. **Test  89** - Bulk Course Upload
   - Module: Import
   - Status: ENABLED
   - Steps: 1. Click 'Import'2. Upload a valid course manifest.
   - Expected: Multiple courses are created and linked to the correct level/institution.

97. **Test  90** - Multi-Criteria Filter
   - Module: Filter
   - Status: ENABLED
   - Steps: 1. Click 'Filter'2. Select Level (Masters) and Language (English)3. Click 'Apply'.
   - Expected: List displays only English-taught Master's programs.

98. **Test  91** - View Customization
   - Module: Manage Col.
   - Status: ENABLED
   - Steps: 1. Hide 'Tuition Fee' via Manage Columns.
   - Expected: Column is removed from UI; table width adjusts.

99. **Test  92** - Calculation Logic
   - Module: Add Form
   - Status: ENABLED
   - Steps: 1. Enter Tuition: 100002. Enter Non-Tuition: 2000.
   - Expected: Total Course Cost' should auto-calculate to 12000 (if logic is present).

100. **Test  93** - Rich Text Save
   - Module: Add Form
   - Status: ENABLED
   - Steps: 1. Enter formatted text in 'Other Info'2. Save Course3. Re-open to view.
   - Expected: Formatting (Bold/Lists) must be preserved exactly as entered.

101. **Test  94** - Mandatory Fields
   - Module: Add Form
   - Status: ENABLED
   - Steps: 1. Fill all but 'Course Duration'2. Click 'Add New Course'.
   - Expected: Submission blocked. Error appears on the Duration field.

102. **Test  95** - Bulk Delete Safety
   - Module: Action Menu
   - Status: DISABLED
   - Steps: 1. On Parent View, click 'Delete all Courses'.
   - Expected: System triggers a confirmation modal before execution.

103. **Test  95** - Global Search
   - Module: Search
   - Status: ENABLED
   - Steps: 1. Enter "Transcript" in the search bar.
   - Expected: Table filters instantly to show "Academic Transcript".

104. **Test  96** - Country Filtering
   - Module: Filter
   - Status: ENABLED
   - Steps: 1. Click 'Filter'2. Select 'Andorra' from Assigned Countries3. Click 'Apply'.
   - Expected: List shows only documents assigned to Andorra.

105. **Test  97** - Date Range Filter
   - Module: Filter
   - Status: ENABLED
   - Steps: 1. Select a date range where no documents were updated.
   - Expected: Table shows "No data available" or empty state.

106. **Test  98** - Field Validation
   - Module: Add Form
   - Status: ENABLED
   - Steps: 1. Click '+ Add Document'2. Click 'Add New' without entering data.
   - Expected: System prevents save. Required fields (Name, Country) are highlighted in red.

107. **Test  99** - Multi-Country Select
   - Module: Add Form
   - Status: ENABLED
   - Steps: 1. Open 'Country' dropdown2. Select multiple countries (e.g., Nepal, USA, UK).
   - Expected: Selected countries appear as tags or a list within the dropdown area.

108. **Test  100** - Successful Create
   - Module: Add Form
   - Status: ENABLED
   - Steps: 1. Fill all fields2. Click 'Add New'.
   - Expected: Modal closes. New document type appears in the list.

109. **Test  101** - Edit Document
   - Module: Action Menu
   - Status: ENABLED
   - Steps: 1. Click (⋮) > Edit2. Change the Comment3. Save.
   - Expected: Change persists and is reflected in the table.

110. **Test  102** - Delete Document
   - Module: Action Menu
   - Status: ENABLED
   - Steps: 1. Click (⋮) > Delete.
   - Expected: System triggers a confirmation modal to prevent accidental deletion.

111. **Test  102** - Global Search
   - Module: Search
   - Status: DISABLED
   - Steps: 1. Enter a keyword (e.g., "chat bot") in the Search bar.
   - Expected: Table filters instantly to show questions containing that keyword.

112. **Test  103** - Data Export
   - Module: Export
   - Status: DISABLED
   - Steps: 1. Click the 'Export' button.
   - Expected: System downloads a CSV/Excel file containing the list of all FAQs.

113. **Test  104** - Bulk FAQ Upload
   - Module: Import
   - Status: DISABLED
   - Steps: 1. Click 'Import'2. Upload a valid FAQ manifest.
   - Expected: Multiple FAQs are created. Verify formatting in the Answer field remains intact.

114. **Test  105** - Mandatory Validation
   - Module: Add Form
   - Status: DISABLED
   - Steps: 1. Leave 'Question' or 'Answer' blank2. Click 'Add New FAQ'.
   - Expected: Submission blocked. Error highlights appear on missing fields.

115. **Test  106** - Rich Text Tools
   - Module: Add Form
   - Status: DISABLED
   - Steps: 1. Open Add form2. Insert a list and a hyperlink in the Answer editor3. Save FAQ.
   - Expected: Formatting is preserved correctly on the front-end display.

116. **Test  107** - Image Embed
   - Module: Add Form
   - Status: DISABLED
   - Steps: 1. Use the image icon in the editor to upload/embed an image.
   - Expected: Image renders within the text area without breaking layout.

117. **Test  108** - Edit FAQ
   - Module: Action Menu
   - Status: DISABLED
   - Steps: 1. Click (⋮) > Edit FAQ2. Modify the question text3. Save.
   - Expected: Change persists and 'Last Updated' timestamp refreshes.

118. **Test  109** - Delete FAQ
   - Module: Action Menu
   - Status: DISABLED
   - Steps: 1. Click (⋮) > Delete FAQ.
   - Expected: A confirmation modal appears. FAQ is removed only after user confirms.

119. **Test  109** - Create New Post
   - Module: Creation
   - Status: DISABLED
   - Steps: 1. Click '+ Create Post'2. Fill in Title, Content, and Author3. Save as Draft.
   - Expected: Modal closes; new record appears in list with 'Draft' status.

120. **Test  110** - Search by Title
   - Module: Search
   - Status: DISABLED
   - Steps: 1. Type partial title (e.g., "Finding") in search bar.
   - Expected: Table filters to show only the maTest  hing blog post.

121. **Test  111** - Publish Draft
   - Module: Publishing
   - Status: DISABLED
   - Steps: 1. Click (⋮) on a 'Draft' post2. Select 'Publish'.
   - Expected: Status changes to 'Published'; 'Published Date' timestamp is generated.

122. **Test  112** - Edit Published Blog
   - Module: Editing
   - Status: DISABLED
   - Steps: 1. Click (⋮) > Edit2. Modify content and save.
   - Expected: Changes persist; 'Last Updated' timestamp refreshes.

123. **Test  113** - Delete Post
   - Module: Deletion
   - Status: DISABLED
   - Steps: 1. Click (⋮) > Delete.
   - Expected: A confirmation modal appears. Record is removed only after user confirms.

124. **Test  114** - Sort by Date
   - Module: Sorting
   - Status: DISABLED
   - Steps: 1. Click 'Created Date' header.
   - Expected: Table toggles between Ascending and Descending order correctly.

125. **Test  114** - Search by User
   - Module: Global Search
   - Status: DISABLED
   - Steps: 1. Enter "Amit Shrestha" in the search bar.
   - Expected: List filters to show ONLY logs generated by Amit.

126. **Test  114** - Cascading Logic
   - Module: Filter
   - Status: DISABLED
   - Steps: 1. Select a 'Unit Type'2. Open 'Unit' dropdown.
   - Expected: Unit' dropdown should ONLY show units belonging to that specific type.

127. **Test  115** - Search by Action
   - Module: Global Search
   - Status: DISABLED
   - Steps: 1. Enter "Insert" in the search bar.
   - Expected: List filters to show only "Insert Designation" or similar creation events.

128. **Test  115** - Date Filtering
   - Module: Filter
   - Status: DISABLED
   - Steps: 1. Set a date range from 2024 to 20252. Click 'Apply'.
   - Expected: KPI cards and charts must recalculate to reflect ONLY that date range.

129. **Test  116** - Date Range Filter
   - Module: Filter
   - Status: DISABLED
   - Steps: 1. Click 'Filter'2. Select a specific date range3. Click 'Apply'.
   - Expected: Only logs from the selected range are displayed.

130. **Test  116** - Reset Button
   - Module: Filter
   - Status: DISABLED
   - Steps: 1. Fill all filters2. Click 'Reset'.
   - Expected: All fields should clear to default. KPI cards should return to total cumulative data.

131. **Test  117** - Module Filter
   - Module: Filter
   - Status: DISABLED
   - Steps: 1. Filter by a specific module (e.g., 'User Management').
   - Expected: Only logs related to user changes appear.

132. **Test  117** - Legend Interaction
   - Module: Charts
   - Status: DISABLED
   - Steps: 1. Hover over a chart segment (e.g., Visa Granted).
   - Expected: A tooltip should appear showing the exact count or percentage.

133. **Test  118** - Export Log Data
   - Module: Export
   - Status: DISABLED
   - Steps: 1. Click the 'Export' button.
   - Expected: System downloads a CSV/Excel file containing the history trail.

134. **Test  118** - Total Consistency
   - Module: Data
   - Status: DISABLED
   - Steps: 1. Note the 'All Students' count2. Navigate to Student Mgmt and count records.
   - Expected: The numbers in the report must perfectly maTest  h the System database records.

135. **Test  119** - User Profile Linking
   - Module: Navigation
   - Status: DISABLED
   - Steps: 1. Click on a hyperlinked user name (e.g., Amit Shrestha).
   - Expected: System should ideally route to that user's profile detail page.

136. **Test  119** - Specificity
   - Module: School Rep.
   - Status: DISABLED
   - Steps: 1. Select 'University of Sydney' in School filter.
   - Expected: Report should exclude data from all other institutions.

137. **Test  119** - Global Search
   - Module: Search
   - Status: DISABLED
   - Steps: 1. Enter Student ID (e.g., 39) in search bar.
   - Expected: Table filters to show only records linked to ID 39.

138. **Test  120** - Pagination/Scroll
   - Module: Performance
   - Status: DISABLED
   - Steps: 1. Scroll to the bottom of the list.
   - Expected: More logs should load (Lazy loading) or pagination should appear to view older history.

139. **Test  120** - Category Filtering
   - Module: Filter
   - Status: DISABLED
   - Steps: 1. Click 'Filter'2. Select a specific 'Sub Unit'3. Click 'Apply'.
   - Expected: List displays only records belonging to the selected Australian Partner Agent.

140. **Test  121** - Status Filter
   - Module: Filter
   - Status: DISABLED
   - Steps: 1. Filter by 'Visa Status' = 'Visa Granted'.
   - Expected: Table shows only successful applications.

141. **Test  122** - Aging Filter
   - Module: Timeframe
   - Status: DISABLED
   - Steps: 1. Select '90+ days' from the date dropdown.
   - Expected: Table shows only records where the last activity was 90+ days ago.

142. **Test  123** - Student Detail Link
   - Module: Action Menu
   - Status: DISABLED
   - Steps: 1. Click (⋮) > 'View Student Detail'.
   - Expected: User is routed to the specific Student's profile page.

143. **Test  124** - Commission Modal
   - Module: Action Menu
   - Status: DISABLED
   - Steps: 1. Click (⋮) > 'View Commission Detail'.
   - Expected: Modal opens showing detailed financial breakdown (e.g., APP-2026.).

144. **Test  125** - Installment Check
   - Module: Data View
   - Status: DISABLED
   - Steps: 1. Open Commission Detail2. Verify 'No. of Installments'.
   - Expected: Displays the correct count of payment cycles (e.g., 2).

145. **Test  126** - Column Visibility
   - Module: Manage Col.
   - Status: DISABLED
   - Steps: 1. Uncheck 'Supervisor' in Manage Columns.
   - Expected: The Supervisor column is hidden from the main report table.

146. **Test  126** - Search by Name
   - Module: Search
   - Status: DISABLED
   - Steps: 1. Enter "Bidur" in the search bar.
   - Expected: Table filters instantly to show the record for Bidur Neupane.

147. **Test  127** - Search by Invoice
   - Module: Search
   - Status: DISABLED
   - Steps: 1. Enter specific invoice number (e.g., "Sydney-4-42").
   - Expected: Table shows only the maTest  hing invoice.

148. **Test  128** - Multi-Filter Logic
   - Module: Filter
   - Status: DISABLED
   - Steps: 1. Click 'Filter'2. Select specific Institution (e.g., University of Sydney)3. Click 'Apply'.
   - Expected: List displays only unclaimed commissions for that institution.

149. **Test  129** - CSV Download
   - Module: Export
   - Status: DISABLED
   - Steps: 1. Click the 'Export' button.
   - Expected: System downloads a file containing the 3 unclaimed commission records.

150. **Test  130** - View Invoice
   - Module: Action Menu
   - Status: DISABLED
   - Steps: 1. Click (⋮) > 'View Invoice'.
   - Expected: A PDF viewer or modal opens displaying the detailed invoice.

151. **Test  131** - Download Invoice
   - Module: Action Menu
   - Status: DISABLED
   - Steps: 1. Click (⋮) > 'Download Invoice'.
   - Expected: System triggers a direct download of the invoice file (PDF/JPG).

152. **Test  132** - Date Range Check
   - Module: Timeframe
   - Status: DISABLED
   - Steps: 1. Use the "All (default)" dropdown to select a specific aging period.
   - Expected: Table updates to show commissions unclaimed for that specific duration.

153. **Test  133** - Column Customization
   - Module: Manage Col.
   - Status: DISABLED
   - Steps: 1. Hide 'Family Name' via Manage Columns.
   - Expected: The column is removed from the UI and the table auto-adjusts.

154. **Test  133** - Keyword Search
   - Module: Search
   - Status: DISABLED
   - Steps: 1. Enter "4-41" in the search bar.
   - Expected: Table filters to show only the "University of Sydney-4-41" record.

155. **Test  134** - Partial Name Search
   - Module: Search
   - Status: DISABLED
   - Steps: 1. Enter "Devanshu" in the search bar.
   - Expected: Both records for the counsellor Devanshu Aryal remain visible.

156. **Test  135** - Data Export
   - Module: Export
   - Status: DISABLED
   - Steps: 1. Click the 'Export' button.
   - Expected: System downloads a CSV/Excel file containing the 2 overdue records.

157. **Test  136** - Modal UI Check
   - Module: Filter
   - Status: DISABLED
   - Steps: 1. Click 'Filter'.
   - Expected: A modal opens. Check if it correctly includes filters for "Institution" and "Counsellor".

158. **Test  137** - Column Visibility
   - Module: Manage Col.
   - Status: DISABLED
   - Steps: 1. Click 'Manage Columns'2. Uncheck 'Supervisor'3. Click 'Apply'.
   - Expected: The 'Supervisor' column is hidden, providing more space for other data.

159. **Test  138** - Alpha-numeric Sort
   - Module: Sorting
   - Status: DISABLED
   - Steps: 1. Click 'Invoice No' header icon.
   - Expected: List toggles between ascending/descending order (e.g., 4-41 vs 4-42).

160. **Test  139** - Trigger Menu
   - Module: Action Menu
   - Status: DISABLED
   - Steps: 1. Click (⋮) on a row.
   - Expected: Menu appears with options (e.g., View Invoice, Mark as Paid).

161. **Test  140** - "Overdue" Verification
   - Module: Logic Check
   - Status: DISABLED
   - Steps: 1. Check the 'Due Date' of these items in the Full Report.
   - Expected: The current date must be after the due date for them to appear here.

162. **Test  140** - ID Search
   - Module: Search
   - Status: ENABLED
   - Steps: 1. Enter "39" in the search bar.
   - Expected: Table filters to show all 8 records for Student ID 39.

163. **Test  141** - Partial Name Search
   - Module: Search
   - Status: ENABLED
   - Steps: 1. Enter "Dikshant" in search bar.
   - Expected: List shows only records for "Dikshant Test  (Student)".

164. **Test  142** - Institution Filter
   - Module: Filter
   - Status: ENABLED
   - Steps: 1. Click 'Filter'2. Select 'University of Sydney'3. Click 'Apply'.
   - Expected: Only commissions from the University of Sydney are listed.

165. **Test  143** - History Range
   - Module: Timeframe
   - Status: ENABLED
   - Steps: 1. Select '30-60 days' from the timeframe dropdown.
   - Expected: List updates to show commissions generated in that specific window.

166. **Test  144** - View Installments
   - Module: Action Menu
   - Status: ENABLED
   - Steps: 1. Click (⋮) > 'View Installment'.
   - Expected: A modal or side-panel opens showing the payment schedule (e.g., 1st, 2nd installments).

167. **Test  145** - Column Visibility
   - Module: Manage Col.
   - Status: ENABLED
   - Steps: 1. Uncheck 'Student ID' in Manage Columns.
   - Expected: The Student ID column is hidden from the UI.

168. **Test  146** - Profile Deep-link
   - Module: Navigation
   - Status: ENABLED
   - Steps: 1. Click on the Student Name.
   - Expected: System should ideally route to the Student Profile Detail page.

169. **Test  146** - Bulk Selection
   - Module: Selection
   - Status: DISABLED
   - Steps: 1. Click the top checkbox in the table header.
   - Expected: All records in the list should be selected simultaneously.

170. **Test  147** - Authorize Payout
   - Module: Status Change
   - Status: DISABLED
   - Steps: 1. Select 1 or more records2. Click 'Change Status'3. Select 'Paid' or 'Authorized'.
   - Expected: Status updates; records may move to the "All Pay Agents" log.

171. **Test  148** - Branch Search
   - Module: Search
   - Status: DISABLED
   - Steps: 1. Search for "Sydney".
   - Expected: The group header and its nested children should filter.

172. **Test  149** - View Extended Data
   - Module: Manage Col.
   - Status: DISABLED
   - Steps: 1. Enable 'Commission Rate' and 'Balance' via Manage Columns.
   - Expected: Table adds these columns to provide context on payout amounts.

173. **Test  150** - Collapse/Expand
   - Module: Hierarchy
   - Status: DISABLED
   - Steps: 1. Click the chevron (⌵) next to 'Sydney Branch'.
   - Expected: Nested records should hide/show smoothly without visual jumps.

174. **Test  151** - Total Recalculation
   - Module: Data Integrity
   - Status: DISABLED
   - Steps: 1. Add a new received installment for a student in this branch.
   - Expected: The 'Total Installment Received' in the header must auto-update.

175. **Test  151** - Generate Remittance
   - Module: Advice Gen.
   - Status: DISABLED
   - Steps: 1. Select a student (e.g., Amit)2. Click 'Get Remittance Advice'.
   - Expected: System generates a downloadable file detailing the payout.

176. **Test  152** - Bulk Status Update
   - Module: Status Change
   - Status: DISABLED
   - Steps: 1. Select multiple records2. Click 'Change Status'3. Change to 'Paid' or 'Closed'.
   - Expected: Selected records update their status pill in real-time.

177. **Test  153** - Student Search
   - Module: Search
   - Status: DISABLED
   - Steps: 1. Search for ID "39".
   - Expected: Table filters to show Dikshant under the Sydney Branch.

178. **Test  154** - Branch Filter
   - Module: Search
   - Status: DISABLED
   - Steps: 1. Search for "Perth".
   - Expected: Sydney branch collapses/hides; Perth branch header remains.

179. **Test  155** - Totals Accuracy
   - Module: Hierarchy
   - Status: DISABLED
   - Steps: 1. Verify "Sydney Branch" total (5,490).
   - Expected: Must equal the sum of Amit (3,000) + Dikshant (2,490).

180. **Test  156** - Individual Action
   - Module: Navigation
   - Status: DISABLED
   - Steps: 1. Click (⋮) on a student row.
   - Expected: Individual options (View, Edit, eTest  .) appear for that record.

181. **Test  156** - Export Payout Data
   - Module: Advice Gen.
   - Status: DISABLED
   - Steps: 1. Select a counsellor2. Click 'Get Remittance Advice'.
   - Expected: System generates a CSV/PDF detailing commission earned per student.

182. **Test  157** - Bulk Payment Sign-off
   - Module: Status Change
   - Status: DISABLED
   - Steps: 1. Select multiple records2. Click 'Change Status'3. Change to 'Paid'.
   - Expected: Records update to 'Paid' status and may be archived from this view.

183. **Test  158** - Collapse/Expand
   - Module: Grouping
   - Status: DISABLED
   - Steps: 1. Click the chevron (⌵) next to Kshitiz Shrestha.
   - Expected: The row expands to reveal the individual student applications under that counsellor.

184. **Test  159** - Counsellor Search
   - Module: Search
   - Status: DISABLED
   - Steps: 1. Search for "Kshitiz".
   - Expected: Table filters to show only the group header and children for Kshitiz.

185. **Test  160** - Column Visibility
   - Module: Manage Col.
   - Status: DISABLED
   - Steps: 1. Use 'Manage Columns' to hide 'Application ID'.
   - Expected: The column is removed, and the table width remains responsive.

186. **Test  161** - Group Selection
   - Module: Selection
   - Status: DISABLED
   - Steps: 1. Check the box next to the Counsellor Header.
   - Expected: All nested student records for that counsellor should be auto-selected.

187. **Test  161** - Activate Actions
   - Module: Button State
   - Status: DISABLED
   - Steps: 1. Observe the 'Get Remittance Advice' and 'Change Status' buttons2. Click the checkbox next to a record.
   - Expected: Buttons should transition from disabled (faded) to active (clickable) upon selection.

188. **Test  162** - Export Payout Data
   - Module: Advice Gen.
   - Status: DISABLED
   - Steps: 1. Select a record2. Click 'Get Remittance Advice'.
   - Expected: System generates a downloadable file (PDF/CSV) detailing the sub-unit's commission.

189. **Test  163** - Bulk Status Update
   - Module: Status Change
   - Status: DISABLED
   - Steps: 1. Select a record2. Click 'Change Status'3. Change to 'Paid'.
   - Expected: The record's status updates, confirming the payout has been processed.

190. **Test  164** - Search by ID/Name
   - Module: Search
   - Status: DISABLED
   - Steps: 1. Type a known Student ID or Name in the search bar.
   - Expected: Table filters to show only the maTest  hing sub-unit commission record.

191. **Test  165** - Column Customization
   - Module: Manage Col.
   - Status: DISABLED
   - Steps: 1. Click 'Manage Columns'2. Uncheck 'Invoice No'3. Click 'Apply'.
   - Expected: The 'Invoice No' column is hidden from the UI.

192. **Test  166** - Date Filtering
   - Module: Timeframe
   - Status: DISABLED
   - Steps: 1. Click the 'All (default)' dropdown2. Select '30-60 days'.
   - Expected: Table filters to show only commissions that fell due within that specific timeframe.

193. **Test  166** - Search by Invoice
   - Module: List View
   - Status: DISABLED
   - Steps: 1. Enter a known Invoice No (e.g., "345678") in the search bar.
   - Expected: Table filters instantly to show only the maTest  hing invoice.

194. **Test  167** - Filter by GST
   - Module: Filter
   - Status: DISABLED
   - Steps: 1. Click 'Filter'2. Select 'Yes' under 'Gst Applied?'3. Click 'Apply'.
   - Expected: List updates to display only invoices where GST was applied.

195. **Test  168** - Download Invoice
   - Module: Action Menu
   - Status: DISABLED
   - Steps: 1. Click (⋮) on a row2. Select 'Download Invoice'.
   - Expected: System generates and downloads a formatted PDF of the invoice.

196. **Test  169** - Delete Invoice
   - Module: Action Menu
   - Status: DISABLED
   - Steps: 1. Click (⋮) > 'Delete Invoice'.
   - Expected: A confirmation prompt ("Are you sure?") MUST appear before deletion.

197. **Test  170** - Mandatory Validation
   - Module: Add Form
   - Status: DISABLED
   - Steps: 1. Click '+ Generate Manual Invoice'2. Leave all fields blank and click 'Save'.
   - Expected: Submission is blocked. All fields marked with (*) are highlighted in red with error text.

198. **Test  171** - GST Calculation
   - Module: Add Form
   - Status: DISABLED
   - Steps: 1. Fill out amount (e.g., 1000)2. Toggle 'Apply GST ?' checkbox.
   - Expected: Expected behavior depending on logic: The final total should auto-calculate to include the standard GST rate (e.g., 10% or 15%), OR it tags the invoice for tax reporting.

199. **Test  172** - Date Picker
   - Module: Add Form
   - Status: DISABLED
   - Steps: 1. Click 'Invoice Date'.
   - Expected: Calendar opens. Formatting saves correctly as YYYY-MM-DD.

200. **Test  173** - Successful Save
   - Module: Add Form
   - Status: DISABLED
   - Steps: 1. Fill all required fields correctly2. Click 'Save'.
   - Expected: Modal closes, success message appears, and the new manual invoice populates at the top of the list.

201. **Test  173** - Edit Profile Data
   - Module: Profile
   - Status: DISABLED
   - Steps: 1. Modify "Given Name"2. Click Save.
   - Expected: System updates local DB; top-right header name updates immediately.

202. **Test  174** - Password MaTest  h
   - Module: Security
   - Status: DISABLED
   - Steps: 1. Enter different passwords in "New" and "Confirm" fields.
   - Expected: System throws validation error: "Passwords do not maTest  h."

203. **Test  175** - PIN Persistence
   - Module: Screen Lock
   - Status: DISABLED
   - Steps: 1. Set a 4-digit PIN2. Lock the screen/Refresh .
   - Expected: System must prompt for PIN before allowing access back to console.

204. **Test  176** - Branding Update
   - Module: Platform
   - Status: DISABLED
   - Steps: 1. Upload new Logo2. Change "Display Name".
   - Expected: Dashboard logo and system title update globally for all users.

205. **Test  177** - Force Update
   - Module: Platform
   - Status: DISABLED
   - Steps: 1. Toggle "Force Update" to ON2. Set version to 1.1.
   - Expected: Mobile app users on older versions should receive a mandatory update block.

206. **Test  178** - Social Redirects
   - Module: Platform
   - Status: DISABLED
   - Steps: 1. Paste full URLs (https://.)2. Click Save.
   - Expected: Icons on the public website footer must point to these new URLs.

207. **Test  179** - Notification Endpoints
   - Module: Global
   - Status: DISABLED
   - Steps: 1. Trigger a system event (e.g., student signup).
   - Expected: Bell icon in header should show a badge; endpoint should fire correctly.

208. **Test  180** - Secure Logout
   - Module: Global
   - Status: DISABLED
   - Steps: 1. Click 'Logout' in the Sidebar.
   - Expected: Session tokens are cleared. User is redirected to /login.

209. **Test   189** - Biometric Enrollment
   - Module: Security
   - Status: DISABLED
   - Steps: System allows toggling of Face ID and Fingerprint in 'Login & Security'.
   - Expected: PASS

210. **Test   190** - Idle Timeout Lock
   - Module: Security
   - Status: DISABLED
   - Steps: Application auto-locks after X minutes; requires Biometrics/PIN to resume.
   - Expected: PASS

211. **Test   191** - Force Screen Lock
   - Module: Security
   - Status: DISABLED
   - Steps: User can manually trigger a screen lock via settings for immediate privacy.
   - Expected: PASS

212. **Test   192** - Counsellor Assignment
   - Module: Communication
   - Status: DISABLED
   - Steps: Chat initiation triggers assignment of a human counsellor (e.g., Sunil Giri).
   - Expected: PASS

213. **Test   193** - Bot History Sync
   - Module: Communication
   - Status: DISABLED
   - Steps: Support Bot History' correctly feTest  hes past automated interactions.
   - Expected: PASS

214. **Test   194** - Draft Creation
   - Module: App Lifecycle
   - Status: DISABLED
   - Steps: Starting an app via 'Explore' adds it to the 'Applications' list as a draft.
   - Expected: PASS

215. **Test   195** - Submission Flow
   - Module: App Lifecycle
   - Status: DISABLED
   - Steps: Completing all required docs allows the 'Submit' button to become active.
   - Expected: PASS

216. **Test   196** - Progress Real-time
   - Module: App Lifecycle
   - Status: DISABLED
   - Steps: Application status (e.g., 'Waiting for Offer Letter') updates immediately.
   - Expected: PASS

217. **Test   197** - Destination Search
   - Module: Discovery
   - Status: DISABLED
   - Steps: Typing in the Filter modal search bar narrows the country selection list.
   - Expected: PASS

218. **Test   198** - Search Algorithm
   - Module: Discovery
   - Status: DISABLED
   - Steps: Searching 'Commerce' on mobile Home screen returns valid course cards.
   - Expected: 

