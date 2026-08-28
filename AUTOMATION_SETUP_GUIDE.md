# 🚀 Automation Setup & Execution Guide

Welcome to the FieldForceConnect UI Automation suite! This guide is designed to help any new user, developer, or QA engineer quickly clone this repository, configure their local environment, and execute the automated test scenarios.

## 🛠️ 1. Prerequisites (System Requirements)

Before running the project, please ensure you have the following software installed on your machine:

1. **Java Development Kit (JDK) 11 or higher**
   - Download: [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)
   - **Verification**: Open your terminal and run `java -version`. Ensure it returns version 11+.

2. **Apache Maven**
   - Download: [Maven Official Site](https://maven.apache.org/download.cgi)
   - *Note: Ensure you add the `bin` folder path to your system's `MAVEN_HOME` / Environment Variables.*
   - **Verification**: Run `mvn -version` in your terminal.

3. **Google Chrome Browser**
   - Our WebDriver is configured to run tests dynamically on Chrome. Make sure your local Chrome browser is up-to-date. (The framework uses Selenium v4, which handles driver binaries automatically—no need to manually download ChromeDriver!)

4. **IDE (Optional but Recommended)**
   - IntelliJ IDEA, Eclipse, or VS Code (with Java Extensions) are recommended to view and maintain the Page Object Model (POM) code.

---

## ⚙️ 2. Project Setup

Follow these steps to configure the project locally:

1. **Clone the Repository**
   ```bash
   git clone <your-repository-url>
   cd Nimap-QA-Machine-Test
   ```

2. **Download Dependencies**
   Since this is a Maven project, all toolsets (Cucumber, TestNG, Selenium) are declared inside the `pom.xml`. To download them, run:
   ```bash
   mvn clean install -DskipTests
   ```
   *This command resolves all missing dependencies without triggering the test suite immediately.*

---

## 🏃‍♂️ 3. Running the Automation Tests

You can execute the BDD Cucumber test suite through multiple avenues. 

### Option A: Via Command Line (Maven) - Recommended
This is the simplest way to run the entire suite. In the root directory (`Nimap-QA-Machine-Test`), run:
```bash
mvn clean test
```
**What happens next?**
Maven will trigger the `TestRunner.java` class. You will see an instance of Google Chrome launch automatically and execute the Login, Punch In, and Add Customer journeys. 

### Option B: Via IDE (IntelliJ / Eclipse)
1. Open the project in your IDE.
2. Navigate to `src/test/java/runners/TestRunner.java`.
3. Right-click anywhere in the file and select **Run 'TestRunner'**.

### Option C: Running Specific Feature Files
If you are modifying code and want to test a specific section (e.g., just the Login flow):
1. Navigate to `src/test/resources/features/FieldForceConnect.feature`.
2. Most IDEs with the Cucumber plugin installed will display a green "Play" button next to each `Scenario`. Click it to trace a single test.

---

## 📝 4. Understanding the Framework Architecture

For those wanting to contribute or read the code efficiently, here is how the framework maps out:

- **Features (`src/test/resources/features/`)**: Written in plain English (Gherkin). Contains the test steps and test data.
- **Step Definitions (`src/test/java/stepDefinitions/`)**: The bridge between the Gherkin feature file and the Java code.
- **Page Objects (`src/test/java/pages/`)**: Contains all DOM locators (XPaths) and interaction methods (clicks, sends keys) for specific web pages. **If the UI ever changes, this is the only folder you need to update.**
- **Utils (`src/test/java/utils/`)**: Holds driver initialization and configuration mechanisms.

---

## 🐞 5. Troubleshooting Common Errors

- **Error**: `mvn is not recognized as an internal or external command`
  - **Fix**: You have not added Maven to your System PATH variables. Ensure the `bin` directory of your Maven installation is in your PATH.
- **Error**: `SessionNotCreatedException: This version of ChromeDriver only supports Chrome version X`
  - **Fix**: Update your local Google Chrome browser to the latest version via Settings > About Chrome. 
- **Tests running too fast or failing due to React/Vite loading?**
  - **Fix**: The framework utilizes `WebDriverWait` (Explicit Waits). Do not use `Thread.sleep()`. If an element is failing, navigate to the respective Page Object class and verify the wait condition (e.g., `ExpectedConditions.elementToBeClickable`).
