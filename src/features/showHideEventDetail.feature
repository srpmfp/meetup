Feature: Show or Hide events after clicking button
    
    Scenario: Show event details when button is clicked
        Given the user is on the events page
        And they have not clicked the "Show Details" button yet
        When they click the "Show Details" button for the first event
        Then they should see the details of the first event
    
    Scenario: Hide event details when button is clicked again
        Given they are on the events page and the first event has details shown
        When they click the "Hide Details" button for the first event
        Then they should not see the details of the first event
    
    