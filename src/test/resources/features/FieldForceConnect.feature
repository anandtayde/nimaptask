Feature: FieldForceConnect Web Automation

  Scenario Outline: Successfully submit attendance regularization claim
    Given user is on the Attendance page
    When user clicks on the Add New button
    And user enters Punch In Date as "<punchInDate>" and Punch In Time as "<punchInTime>"
    And user enters Punch Out Date as "<punchOutDate>" and Punch Out Time as "<punchOutTime>"
    And user enters Reason for Claim as "<reason>"
    And user uploads attachment "<filePath>"
    And user clicks on the Save button
    Then attendance record should be added successfully

    Examples:
      | punchInDate | punchInTime | punchOutDate | punchOutTime | reason                                       | filePath               |
      | 28-08-2026  | 09:30 AM    | 28-08-2026   | 06:30 PM     | Biometric scanner malfunction at main entrance | src/test/resources/test.pdf |

  Scenario Outline: 3) Add Customer Journey
    Given the user is logged into the application with "<username>" and "<password>"
    And the user is on the Add Customer page
    When the user enters customer details such as Name "<custName>", Phone "<custPhone>", and Email "<custEmail>"
    And submits the form
    Then the customer "<custName>" should be added successfully and listed in the system

    Examples:
      | username                    | password         | custName | custPhone  | custEmail             |
      | anandtayade2004@gmail.com   | Pass@1234        | pranav   | 9999999999 | johndoe@example.com   |
