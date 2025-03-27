import React from 'react';
import { render, within, waitFor } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { userEvent } from '@testing-library/user-event';
import mockData from '../mock-data';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/numberOfEvents.feature');

defineFeature(feature, test => {
    test('The user hasn\'t selected a number of events, 32 are shown', ({ given, when, then }) => {
        let AppComponent;

        given('the user is on the events page', () => {
            AppComponent = render(<App />);
        });

        let NOEdom;
        when('no number has been entered', () => {
            const AppDom = AppComponent.container.firstChild
            NOEdom = AppDom.querySelector('#eventCount')
        });


        then('32 events should be shown', () => {
            const eventList = AppComponent.container.querySelector('#event-list');
            waitFor(async() => {
                const EventListItems = within(eventList).queryAllByRole('listitem')
                const filteredEvents = EventListItems.slice(0, NOEdom.value)
                expect(filteredEvents.length).toBe(32)
            });
        });


        test('The user enters in a number of events, that amount is listed', ({ given, when, then }) => {
            let appComponent;
            let inputDom;
            given('the user has selected the input', () => {
                const user = userEvent.setup()
                appComponent = render(<App />);
                const AppDom = appComponent.container.firstChild
                inputDom = AppDom.querySelector('#eventCount')
                await user.clear(inputDom)
                expect(inputDom.value).toBe('')
            });

            when('they input the number of events', async () => {
                const user = userEvent.setup()
                await user.type(inputDom, '10')
                expect(inputDom.value).toBe('10')

            });

            then('the number of events are shown', async () => {
                const eventList = appComponent.container.querySelector('#event-list');
                waitFor(async() => {
                    const EventListItems = within(eventList).queryAllByRole('listitem')
                    expect(EventListItems).toBe(10)
                    // const filteredEvents = EventListItems.slice(0, inputDom.value)
                    // expect(filteredEvents.length).toBe(10)
                });

            });
        });
    })
})