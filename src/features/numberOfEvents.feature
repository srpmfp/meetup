Feature: Filter the number of events displayed

  Scenario: The user hasn't selected a number of events, 32 are shown
    Given the user is on the events page
    When no number has been entered
    Then 32 events should be shown

  Scenario: The user enters in a number of events, that amount is listed
    Given the user has selected the input
    When they input the number of events
    Then the number of events are shown

  Scenario: The user enters a new number into the input, the new number is shown
    Given the user has selected the input
    When they input a new number of events
    Then the new number of events are shown

  