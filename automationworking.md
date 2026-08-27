# Automation Testing Workflow Guide

This document provides a complete overview of the automation framework built for the Nimap Machine Test, detailing how it works behind the scenes, how to execute it, and how to verify the results.

---

## ⚙️ 1. How the Automation is Working

The automation suite is built using **Behavior-Driven Development (BDD)** principles. This means that tests are written in plain, readable English that non-technical stakeholders can understand, which is then mapped directly to Java UI automation code.

### The Tech Stack
*   **Java 11+**: The core programming language.
*   **Selenium WebDriver (v4)**: Used to interact with the Chrome browser natively (clicking, typing, waiting for elements).
*   **Cucumber BDD**: Parses the plain-script scenarios and links them to Java methods.
*   **TestNG**: The core testing engine that structures the test lifecycle and assertions.
*   **WebDriverManager**: Automatically downloads and maps the correct `chromedriver.exe` for the system, removing manual driver setup.
*   **Maven**: Manages all these dependencies and runs the build.

---

## 🧩 2. The Core Components

1.  **The Feature File (`FieldForceConnect.feature`)**
    This is where scenarios are defined. We use `Scenario Outline` to achieve **Parameterization** (Data-Driven Testing). It dynamically feeds the real dataset (`anandtayade2004@gmail.com` and `Pass@1234`) into the test execution.

2.  **The Step Definitions (`FieldForceConnectSteps.java`)**
    Every step (e.g., `Given the user navigates...`) maps to a Java method here.
    *   It uses **Implicit Waits** and `Thread.sleep()` to wait for elements to load. This approach is very simple and easy to understand for beginners.
    *   We used basic `XPath` techniques (`//input[@type='email']`) to identify WebElements.

3.  **The Test Runner (`TestRunner.java`)**
    This is the bridge between TestNG and Cucumber. It sets up the execution plugins to generate pretty HTML and JSON reports upon completion.

---

## ▶️ 3. How to Run the Automation Testing

To physically launch the automation testing, the system relies on Maven to compile classes, load dependencies, and trigger the Test Runner.

### Prerequisites (On Your Machine)
- Ensure **Java OS Variables** (`JAVA_HOME`) are set.
- Ensure **Maven** is installed and `mvn` is added to your System PATH.
- Ensure **Google Chrome** is installed.

### Execution Steps
1. Open your Command Prompt (CMD), PowerShell, or VS Code Terminal.
2. Navigate exactly to the root directory where the `pom.xml` exists:
   ```bash
   cd d:\Nimap-QA-Machine-Test
   ```
3. Run the following command:
   ```bash
   mvn clean test
   ```
4. **What happens next?**
   * Maven downloads necessary jars.
   * A new Chrome browser window will automatically launch.
   * The script will dynamically fill in your Email, Password, fetch the Dashboard, Check the "PunchIn" status, and Add a Customer.
   * Finally, Chrome will close itself (`driver.quit()`).

---

## 👀 4. How to Check the Results (Reporting)

After the `mvn clean test` command finishes, you can evaluate the test in several ways:

1.  **Console Output**
    The terminal will print a summary (e.g., `Tests run: 3, Failures: 0, Errors: 0, Skipped: 0`). Any failed assertions (like missing Toast messages) will print a stack trace.

2.  **Cucumber HTML Report 📊 (Recommended)**
    *   Navigate into `d:\Nimap-QA-Machine-Test\target\cucumber-reports\`
    *   Double-click and open `cucumber.html` in your browser.
    *   This provides a beautiful visual breakdown of which steps passed (Green) and which steps failed (Red).

3.  **Dynamic XPaths Debugging**
    If the test fails, it is usually because the website updated its UI. Since this was built blindly, if `NoSuchElementException` occurs, open `FieldForceConnectSteps.java`, Inspect the webpage, and slightly update the xpath inside `driver.findElement(By.xpath("..."))`.
