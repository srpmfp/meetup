import React from 'react';
import { render, within, waitFor } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { userEvent } from '@testing-library/user-event';
import mockData from '../mock-data';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');


defineFeature(feature, test => {
    test('User has not seached for an event in a city, they are shown events from all cities', ({ given, when, then }) => {
        given('the user has not searched for any city', () => {
            //setup code
        });
        let AppComponent;
        when('the user views the events', () => {
            //action code
            AppComponent = render(<App />);

        });

        then('they should see events from all cities', async () => {
            //assertion code
            const AppDom = AppComponent.container.firstChild
            const eventList = AppDom.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(eventList).queryAllByRole('listitem')
                expect(EventListItems.length).toBe(32)

            })
        });
    });

    test('User should see a list of suggestions when they are searching for a city.', ({ given, when, then }) => {
        let AppComponent;
        given('the main page is open', () => {
            //setup code
            AppComponent = render(<App />);
        });
        let CitySearch;
        when('the user starts typing in the city input field', async () => {
            //action code
            const user = userEvent.setup();
            const AppDom = AppComponent.container.firstChild;
            CitySearch = AppDom.querySelector('#city-search');
            const cityInput = within(CitySearch).queryByRole('textbox');
            await user.type(cityInput, 'Berlin')
        });

        then('they should see a list of city suggestions', async () => {
            //assertion code
            await waitFor(() => {
                const suggestionListItems = within(CitySearch).queryAllByRole('event');
                expect(suggestionListItems).toHaveLength(1); // separate role made for events that separates from ListItems
            })
        });
    });

    test('User can select a city from the dropdown', ({ given, and, when, then }) => {
        let AppComponent
        let AppDom
        let CitySearch
        let cityInput

        given('the user has typed in a city e.g. Berlin', async () => {
            AppComponent = render(<App />);
            const user = userEvent.setup()

            AppDom = AppComponent.container.firstChild
            CitySearch = AppDom.querySelector('#city-search')
            cityInput = within(CitySearch).queryByRole('textbox')

            await user.type(cityInput, 'Berlin')


        });
        let suggestionList;
        and('the suggested cities are shown', () => {
            suggestionList = within(CitySearch).queryByRole('event')
            expect(suggestionList).toHaveTextContent('Berlin, Germany')
        });

        when('the city input field should be updated with the selected city', async () => {
            const user = userEvent.setup();
            await user.click(suggestionList);
        });

        then('the city input field should be updated with the selected city', () => {
            expect(cityInput.value).toBe('Berlin, Germany')
        });
        let NOEdom;
        and('the user should receive events corresponding to the selected city', async () => {
            const eventList = AppDom.querySelector('#event-list')
            NOEdom = AppDom.querySelector('#eventCount')
            const EventListItems = within(eventList).queryAllByRole('listitem')
            const eventLocations = EventListItems.map(event => within(event).queryByText(
                'Berlin, Germany'
            ))
            const slicedEvents = eventLocations.slice(0, NOEdom.value)
            const allEvents = await getEvents();
            const filteredEvents = allEvents.filter(event => event.location === 'Berlin, Germany')
            const slicedFilteredEvents = filteredEvents.slice(0, NOEdom.value)
            expect(slicedEvents.length).toBe(slicedFilteredEvents.length)
        });
    });
});