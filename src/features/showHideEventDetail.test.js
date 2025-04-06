import React from 'react';
import { render, within, waitFor } from '@testing-library/react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { userEvent } from '@testing-library/user-event';
import { getEvents } from '../api';


const feature = loadFeature('./src/features/showHideEventDetail.feature');

defineFeature(feature, test => {

    test('Show event details when button is clicked', ({ given, and, when, then }) => {
        let AppComponent
        given('the user is on the events page', () => {
            AppComponent = render(<App />);
        });
        let eventDetails
        and('they have not clicked the "Show Details" button yet', () => {
            const AppDom = AppComponent.container.firstChild
            eventDetails = AppDom.querySelector('eventDetails')
            expect(eventDetails).not.toBeInTheDocument()

        })
        let eventList
        when('they click the "Show Details" button for the first event', async () => {

            const AppDom = AppComponent.container.firstChild;
            eventList = AppDom.querySelector('#event-list');

        });

        then('they should see the details of the first event', async () => {
            const user = userEvent.setup()
            await waitFor(async () => {
                const EventListItems = within(eventList).queryAllByRole('listitem')
                const firstEvent = EventListItems[0]
                await user.click(within(firstEvent).getByText('Show Details'))
                expect(eventDetails).toBeInTheDocument()
            })
        });
    });

    test('Hide event details when button is clicked again', ({ given, when, then }) => {
        let AppComponent
        let eventDetails
        let eventList
        given('they are on the events page and the first event has details shown', () => {

            AppComponent = render(<App />);
            const AppDom = AppComponent.container.firstChild;
            eventList = AppDom.querySelector('#event-list');

            const user = userEvent.setup()
            waitFor(async () => {
                const EventListItems = within(eventList).queryAllByRole('listitem')
                const firstEvent = EventListItems[0]
                await user.click(within(firstEvent).getByText('Show Details'))
                expect(eventDetails).toBeInTheDocument()
            })
        });

        when('they click the "Hide Details" button for the first event', () => {
            const user = userEvent.setup()
            waitFor(async () => {
                const EventListItems = within(eventList).queryAllByRole('listitem')
                const firstEvent = EventListItems[0]
                await user.click(within(firstEvent).getByText('Hide Details'))

            })
        });

        then('they should not see the details of the first event', () => {
            const AppDom = AppComponent.container.firstChild
            eventDetails = AppDom.querySelector('eventDetails')
            expect(eventDetails).not.toBeInTheDocument()
        });
    });
});
