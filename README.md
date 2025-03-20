# <span style="color: violet">  Meetup

Meetup is an app to help connect people to the events they want to go to.

## As a..., Then..., So that... 
1. As a user I should be able to select a city and see the events located in that city so that I can plan accordingly  
2. As a user I should be able to show or hide events when I am looking at an event list so that I can access more/less information about an event.

3. As a user I should be able to choose the number of events I would like to see so that I can see more or less events in a list
4. As a user I should be able to access events offline so that I can see events I have selected or have viewed.
5. As a user I should be able to have access from home screen so that I can quickly check the details of an event.
6. As a user I should be able to se a chart displaying event details to see up coming events and where.
## "GWT"
|Number|Scenario| Given| When| Then|
|---|---|---|---|---|
1| <span style="color: lightBlue"> Filter by city| the user hasn't searched for a cit| the user opens up the app| they are shown locations with up and coming events.
2|<span style="color: lightBlue;">Show event in event list| the user is viewing the event list|the user clicks on the "Show Event" button for a specific event| the event details are displayed
3|<span style="color: lightBlue;">Hide the event| the user has opened an event from the list| the user clicks on the "Hide Event" button for the same event|the event details are hidden.
4| <span style="color: lightBlue;"> changing the count of events visable| the user sees a series of events and info| the user selects an number of events to be shown| the list will adjust to account for the change
5| <span style="color: lightBlue;"> offline events access| an event has been viewed or will be attended| the user has previously expanded or saved and event| then the event will be locally stored
6| <span style="color: lightBlue;">Home Screen Access | the user is on their home screen |  the user selects the app icon| they should be directed to the list of events
7| <span style ="color: lightBlue;"> Chart of up coming events| when looking through a list of all the events| the user selects to a chart icon| a list most recent and proximal events are displayed 