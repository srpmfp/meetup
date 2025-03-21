Feature: Filter events by city
    Scenario: User has not seached for an event in a city, they are shown events from all cities
        Given the user has not searched for any city
        When the user views the events
        Then they should see events from all cities

    Scenario: User should see a list of suggestions when they are searching for a city.
        Given the main page is open
        When the user starts typing in the city input field
        Then they should see a list of city suggestions
        
    Scenario: User can select a city from the dropdown
        Given the user has typed in a city e.g. Berlin
        And the suggested cities are shown
        When the city input field should be updated with the selected city
        Then the city input field should be updated with the selected city
        And the user should receive events corresponding to the selected city