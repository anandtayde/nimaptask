# Nimap Machine Test - QA (Manual + Automation) & API Testing

Welcome to the finalized test suite for FieldForceConnect. The project is neatly structured following the Page Object Model (POM) and BDD Cucumber approach to hit all requirements for the Machine Test.

## 📁 Repository Framework Structure
```
Nimap-QA-Machine-Test/
│
├── pom.xml                                           # Maven Configuration and Dependencies
├── src/test/resources/
│   ├── features/
│   │   └── FieldForceConnect.feature                 # BDD Cucumber Scenarios (Data-driven)
│   └── testdata/                                     # Associated test data repositories
├── src/test/java/
│   ├── pages/                                        # Page Object Model (POM) Classes
│   │   ├── LoginPage.java                            # Robust XPaths & Login Logic
│   │   ├── DashboardPage.java                        # Dashboard & Punch-In Logic
│   │   └── CustomerPage.java                         # Customer Creation & Search Logic
│   ├── stepDefinitions/                              
│   │   ├── FieldForceConnectSteps.java               # Step implementations executing POM logic
│   │   └── Hooks.java                                # Hooks (Setup/Teardown/Screenshots)
│   ├── utils/                                        
│   │   ├── DriverFactory.java                        # Thread-safe WebDriver init
│   │   ├── TestData.java                             # Dynamic Data Generator Utility
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
- **Robust Locators**: We inspect the actual DOM and employ highly flexible locators (e.g. `//input[contains(@placeholder,'email')] | (//input)[1]`) that dynamically adapt to the React/Vite SPA without throwing `NoSuchElementException`.
- **Explicit Waits (WebDriverWait)**: We strictly avoid `Thread.sleep()`. All actions utilize condition-based explicit waits for seamless, fast, and robust execution.
- **Parameterization**: Test data (Usernames, Passwords, Customer Details) is abstracted into the Cucumber `Scenario Outline` -> `Examples` table.

## 🚀 How to Execute the Tests

### Prerequisites
- Chrome Browser Installed
- Java & Maven configured in system variables

### Execution Command
1. Open the terminal inside root directory `Nimap-QA-Machine-Test`.
2. Run the TestNG-Cucumber test runner via Maven:
   ```bash
   mvn clean test
   ```

### Expected Results
You should observe the Chrome driver launching and running exactly 3 tests smoothly.
1. **Login Test**: Validates proper redirection to the Dashboard.
2. **Punch In Toast Test**: Asserts explicit text extracted from the Success Toast.
3. **Add Customer Test**: Validates Customer creation via Toast capture and visible record verification in the search table.

```
[INFO] Tests run: 3, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```

---

*For API and Manual Testing sections, refer to previously documented folders `postman/` and `manual_testing/`.*
