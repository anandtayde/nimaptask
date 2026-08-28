# Nimap Machine Test - QA (Manual + Automation) & API Testing

Welcome to the finalized test suite for FieldForceConnect. This repository contains all deliverables for the QA Machine Test, covering UI Automation, Manual Testing, and API Testing.

## ✅ Task Validation & Deliverables

Here is a quick map to find all requested deliverables:

| Task Area | Deliverable Location | Description |
| :--- | :--- | :--- |
| **1. UI Automation** | `src/test/java/`, `pom.xml`, `src/test/resources/` | Maven-based BDD Cucumber + TestNG framework automating the Login, Punch-In Toast, and Add Customer journeys using Page Object Model (POM). |
| **2. Manual Testing** | `manual_testing/nimap test cases by anand.xlsx` | Excel sheet containing comprehensive test scenarios, field validations, and bug reports for Sign Up, Forgot Password, OTP Login, and Login modules. |
| **3. API Testing** | `postman/FieldForceConnect_API_Testing.postman_collection.json` | Postman collection covering GET and POST endpoints with environments, variables, and authentication. |

---

## 📁 Repository Framework Structure (Automation)
```text
Nimap-QA-Machine-Test/
│
├── pom.xml                                           # Maven Configuration and Dependencies
├── manual_testing/
│   └── nimap test cases by anand.xlsx                # Manual test cases, bugs, validations
├── postman/
│   └── FieldForceConnect_API_Testing.postman_collection.json # API Tests
├── src/test/resources/
│   └── features/
│       └── FieldForceConnect.feature                 # BDD Cucumber Scenarios (Data-driven)
├── src/test/java/
│   ├── pages/                                        # Page Object Model (POM) Classes
│   │   ├── LoginPage.java                            
│   │   ├── DashboardPage.java                        
│   │   └── CustomerPage.java                         
│   ├── stepDefinitions/                              
│   │   ├── FieldForceConnectSteps.java               # Step implementations executing POM logic
│   │   └── Hooks.java                                # Hooks (Setup/Teardown/Screenshots)
│   ├── utils/                                        
│   │   ├── DriverFactory.java                        # Thread-safe WebDriver init
│   │   ├── TestUtils.java                            # Utility methods
│   │   └── ConfigReader.java                         # Configuration properties reader
│   └── runners/                                      
│       └── TestRunner.java                           # TestNG execution hook
```

---

## 💻 1. Automation Setup & Technologies Used
- **Java (JDK 11+)**
- **Selenium WebDriver (v4.x)**
- **Cucumber (BDD Framework)**
- **TestNG (Test Engine & Assertions)**
- **Maven (Build & Dependency Management)**

### Why This Architecture?
- **Page Object Model (POM)**: Ensures Selenium locators and actions are maintained inside distinct page classes rather than cluttering step definitions. This is highly maintainable.
- **Robust Locators**: Flexible DOM extraction and robust wait strategies to handle dynamic elements (React/Vite SPA) preventing exceptions like `ElementClickInterceptedException`.
- **Parameterization**: Test data (Usernames, Passwords, Customer Details) is abstracted into the Cucumber `Scenario Outline` -> `Examples` table.

## 🚀 How to Execute the UI Automation Tests

### Prerequisites
- Chrome Browser Installed
- Java & Maven configured in system variables

### Execution Command
1. Open terminal inside the root directory `Nimap-QA-Machine-Test`.
2. Run the TestNG-Cucumber test runner via Maven:
   ```bash
   mvn clean test
   ```

### Expected Results
You should observe the Chrome driver launching and running the tests sequentially:
1. **Login Test**: Validates exact login flow and redicrection.
2. **Punch In Toast Test**: Asserts explicit text extracted from the Success Toast notification.
3. **Add Customer Test**: Validates Customer creation via form submission along with toast capture.

Upon success, you will see output similar to this:
```text
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```

---

## 🛠️ 2. Manual Testing Details
The `manual_testing` folder contains the Excel document providing deep-dive validations on functional requirements, outlining positive/negative flows, and highlighting any discovered bugs in the specified modules.

## 🌐 3. API Testing Details & Setup Explanation

The API Testing phase is fully mapped out in the `postman/FieldForceConnect_API_Testing.postman_collection.json` file. To evaluate this deliverable smoothly, follow the setup and details explained below, successfully addressing the API Machine Test criteria.

### API Setup & Environment Configuration
1. **Base URL and Environment Setup**: 
   - A dedicated environment structure is utilized to support dynamic testing. 
   - The environment variable `{{base_url}}` is strictly set to `https://test.fieldforceconnect.com`.
2. **Authentication Variables**: 
   - Test data for authentication is stored securely at the environment level. The variables `{{valid_email}}` and `{{valid_password}}` map to the successfully signed-up credentials.
   - Upon successful login, the system's authentication token is automatically extracted via Postman's `Tests` script and saved into a dynamic variable `{{auth_token}}`. This prevents manual token copying and mimics a seamless user session.

### The API Requests (GET / POST)
The collection holds the following critical endpoints to validate backend integrations:

1. **Login with Valid Credentials (POST)**
   - **Endpoint**: `{{base_url}}/api/login`
   - **Purpose**: Authenticates the user. Passes the `valid_email` and `valid_password` variables in the JSON body.
   - **Validation**: Checks for a `200 OK` status and programmatically extracts the bearer token for subsequent requests.

2. **Login with Invalid Credentials (POST)**
   - **Endpoint**: `{{base_url}}/api/login`
   - **Purpose**: Validates security and negative flows. Uses incorrect/randomized dummy credentials.
   - **Validation**: Asserts that the server properly rejects the unauthorized access (expecting a `400` or `401` status) and returns a robust error message.

3. **Add a Customer from Dashboard Page (POST)**
   - **Endpoint**: `{{base_url}}/api/customers`
   - **Purpose**: Mimics the creation of a customer record.
   - **Authentication**: Injects the active `{{auth_token}}` into the `Authorization` header as a Bearer Token.
   - **Validation**: Asserts for a successful creation status (`200 OK` or `201 Created`).

*To validate, simply import the collection into your Postman workspace and hit "Run Collection".*
