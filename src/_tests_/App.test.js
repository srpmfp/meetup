// src/__tests__/App.test.js
import { render, within } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';


describe('<App /> component', () => {
    let AppDom;
    beforeEach(() => {
        AppDom = render(<App />).container.firstChild;

    })

    test('renders list of events', () => {
        expect(AppDom.querySelector('#event-list')).toBeInTheDocument();
    });

    test('render city search', () => {
        expect(AppDom.querySelector('#city-search')).toBeInTheDocument();
    })

    test('render number of events', () => {
        expect(AppDom.querySelector('#eventCount')).toBeInTheDocument();
    })
});


describe('<App /> integration', () => {
    test('renders a list of events matching the city selected by the user', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;


        //render search bar
        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

        // user types Berlin into the search bar and clicks on the suggestion
        await user.type(CitySearchInput, "Berlin");
        const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
        await user.click(berlinSuggestionItem);

        // renders the list of events
        const EventListDOM = AppDOM.querySelector('#event-list');
        const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

        // gets all the events and filters them to get only the Berlin events
        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(
            event => event.location === 'Berlin, Germany'
        );

        // renders event count input field
        const NOEDom = AppDOM.querySelector('#eventCount');
        await user.type(NOEDom, '{backspace}{backspace}15');


        // returns all the number of selected events and matches it with the number of events rendered
        expect(allRenderedEventItems.slice(0, NOEDom.value).length).toBe(15);

        // ensures all the rendered events have Berlin, Germany as the location
        allRenderedEventItems.forEach(event => {
            expect(event.textContent).toContain("Berlin, Germany");
        });

    });
});

