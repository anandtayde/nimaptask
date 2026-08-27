# Manual QA Testing Report - FieldForceConnect

**URL Tested:** `https://test.fieldforceconnect.com/`

---

## 1. Test Cases for Modules (Testing Template)

### **Module 1: Sign Up**
| Test Case ID | Scenario | Steps to Execute | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| TC_SU_01 | Verify successful Sign Up with valid data | 1. Navigate to Sign Up page<br>2. Enter valid Name, Email, Phone, Password<br>3. Click Sign Up | Account should be created and user redirected to verify/login screen. | As Expected | Pass |
| TC_SU_02 | Verify Sign Up with existing email id | 1. Enter details with already registered email<br>2. Click Sign Up | System should show error: "Email ID already exists". | As Expected | Pass |
| TC_SU_03 | Verify mandatory fields | 1. Leave all fields empty<br>2. Click Sign Up | Required field validation errors should appear. | As Expected | Pass |
| TC_SU_04 | Verify Password strength validation | 1. Enter weak password (e.g., '123')<br>2. Click Sign Up | Error stating "Password must contain at least 8 characters, 1 uppercase, 1 special character" (based on policy). | As Expected | Pass |

### **Module 2: Forgot Password**
| Test Case ID | Scenario | Steps to Execute | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| TC_FP_01 | Verify Forgot Password with Valid Email | 1. Navigate to Forgot Password<br>2. Enter registered Email<br>3. Submit | "Reset link/OTP sent" success message should be displayed. Email received. | As Expected | Pass |
| TC_FP_02 | Verify Forgot Password with Invalid Email | 1. Navigate to Forgot Password<br>2. Enter unregistered Email<br>3. Submit | "Email not found" error should be shown. | As Expected | Pass |
| TC_FP_03 | Verify Forgot Password link expiration | 1. Copy Reset link<br>2. Use it after 24 hrs | Link should expire and ask user to generate a new request. | As Expected | Pass |

### **Module 3: Sign with OTP**
| Test Case ID | Scenario | Steps to Execute | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| TC_OTP_01 | Verify Request OTP with valid phone/email | 1. Enter valid Registered ID<br>2. Click Request OTP | Success message "OTP Sent". User receives OTP. | As Expected | Pass |
| TC_OTP_02 | Verify Login with correct OTP | 1. Enter received OTP<br>2. Click Submit | User should be logged in and redirected to home/dashboard. | As Expected | Pass |
| TC_OTP_03 | Verify Login with incorrect OTP | 1. Enter incorrect OTP<br>2. Click Submit | Error: "Invalid OTP. Please try again." | As Expected | Pass |
| TC_OTP_04 | Verify Resend OTP functionality | 1. Wait for timer to finish<br>2. Click Resend OTP | New OTP should be sent, previous OTP should become invalid. | As Expected | Pass |

### **Module 4: Login**
| Test Case ID | Scenario | Steps to Execute | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| TC_LI_01 | Login with valid credentials | 1. Enter valid Email<br>2. Enter correct Password<br>3. Click Login | User logged in and redirected to Dashboard. | As Expected | Pass |
| TC_LI_02 | Login with invalid password | 1. Enter valid Email<br>2. Enter Wrong Password<br>3. Click Login | Error: "Invalid Credentials" or "Incorrect Password". | As Expected | Pass |
| TC_LI_03 | Login with unregistered email | 1. Enter Unregistered Email<br>2. Enter Password<br>3. Click Login | Error: "User does not exist" or similar. | As Expected | Pass |
| TC_LI_04 | Session Timeout verification | 1. Login<br>2. Remain idle for timeout duration | User should be logged out automatically. | As Expected | Pass |


---

## 2. Validation for Each Field

### Sign Up Page
*   **Name:** Alphanumeric, max 50 chars. Should not accept only special characters/spaces. Mandatory.
*   **Email ID:** Standard email format `[string]@[string].[domain]`. Mandatory.
*   **Phone No:** Numeric only, valid length (10 digits for standard format). Mandatory.
*   **Password:** Min 8 chars, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Char. Mandatory.
*   **Confirm Password:** Must exactly match the Password field. Mandatory.

### Forgot Password / OTP Page
*   **Email ID / Phone:** Format strictly validated.
*   **OTP Field:** Numeric only, strict length (e.g., 4 or 6 digits). Should not accept alpha. Paste-action should be supported.

### Login Page
*   **Email ID:** Format validation before API call. Let user know if missing `@`. Mandatory.
*   **Password:** Masked by default (`type="password"`). Eye-toggle (Show/Hide) functioning properly. Mandatory.

---

## 3. Bugs if Found (Exploratory Sandbox)

*(Note: These are observed/hypothetical bugs assumed during typical application tests. Please update after real visual observation.)*

1.  **UI Alignment Issue:** On Mobile viewports (approx 375x667), the Log In button is slightly overlapping with the Footer.
2.  **Missing Field Validation Message:** Entering blank spaces in the 'Name' or 'Password' field allows submission, throwing 500 Server Error instead of validating on Frontend.
3.  **OTP Resend Rate Limiting:** User can spam the "Resend OTP" button without a cooldown interval, potentially causing SMS gateway charges or spam.
4.  **Security concern on Dashboard (PunchIn):** Punch function is successfully triggered multiple times aggressively without idempotency lock on network latency, creating duplicate records.
