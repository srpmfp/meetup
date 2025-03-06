import React from 'react';
import { render } from '@testing-library/react';
import { getEvents, extractData } from '../api';
import Event from '../components/EventView/Event';
import userEvent from '@testing-library/user-event';


describe('<Event> details', () => {
    let EventComponent;



    beforeEach(async () => {
        const allEvents = await getEvents();
        const data = allEvents[0];
        EventComponent = render(<Event event={data} />)

    })



    test('Show  details button is rendered', () => {
        expect(EventComponent.queryByRole("button")).toBeInTheDocument();
        expect(EventComponent.queryByRole("button")).toHaveTextContent('Show Details');
    })

    test('event details are hidden by default', () => {
        const details = EventComponent.queryByRole('event');
        expect(details).not.toBeInTheDocument();
    })


    test('event details are revealed when button is clicked', async () => {
        const allEvents = await getEvents();
        const data = getEvents[0];
        EventComponent.rerender(<Event event={data} />);


        const user = userEvent.setup();
        const button = EventComponent.getByText('Show Details');
        await user.click(button);


        const details = allEvents ? allEvents.filter((event) => {
            return event.id.indexOf(button.id) > -1;
        }) : [];

        // Event Title Displayed
        const eventSummary = details[0].summary;
        expect(EventComponent.getByText(eventSummary)).toBeInTheDocument;

        // Event Start Time Displayed
        const eventStart = new Date(details[0].start.dateTime).toString();
        expect(EventComponent.getByText(eventStart)).toBeInTheDocument;

        // //Event End Time Displayed
        const eventEnd = new Date(details[0].end.dateTime).toString();
        expect(EventComponent.getByText(eventEnd)).toBeInTheDocument

        //Event Location Displayed
        const eventLocation = details[0].location;
        expect(EventComponent.getByText(eventLocation)).toBeInTheDocument
    })

    test('event details are hidden when button is clicked again', async () => {
        const allEvents = await getEvents();
        const data = getEvents[0];
        EventComponent.rerender(<Event event={data} />);

        const user = userEvent.setup();
        const button = EventComponent.getByText('Show Details');
        await user.click(button);

        const details = allEvents ? allEvents.filter((event) => {
            return event.id.indexOf(button.id) > -1;
        }) : [];



        expect(EventComponent.getByText("Hide Details")).toBeInTheDocument();

        await user.click(button);
        expect(EventComponent.getByText("Show Details")).toBeInTheDocument();

    })



})
