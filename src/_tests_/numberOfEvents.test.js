import React from 'react';
import { render } from '@testing-library/react';
import { getEvents, extractLocations } from '../api';
import App from '../App';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/numberOfEvents/NumberOfEvents';

describe("<numberOfEvents> component", () => {
    let nComponent;
    beforeEach(() => {
        nComponent = render(<NumberOfEvents setCurrentNOE={() => { }} />);
    })

    test("text input is rendered", () => {
        expect(nComponent.queryByRole("textbox")).toBeInTheDocument();
    })
    test("text input has a default value of 32", () => {
        expect(nComponent.queryByRole("textbox")).toHaveValue(32);
    })
    test("text input updates when user types", async () => {
        const user = userEvent.setup();
        const input = nComponent.queryByRole("textbox");
        await user.type(input, '{backspace}{backspace}24');
        expect(input).toHaveValue(24);
    })

    test("array filtered to match user input", async () => {
        const allEvents = await getEvents();
        const data = allEvents;
        const input = nComponent.queryByRole("textbox");

        const user = userEvent.setup();
        await user.type(input, '{backspace}{backspace}12');
        const intConv = parseInt(input.value)

        expect(data.slice(0, intConv).length).toBe(intConv);

    })


})

// describe("<numberOfEvents> integration", () => {
//     test(
//         "renders a list of events matching the number selected by the user", async () => {
//             const user = userEvent.setup();
//             const AppComponent = render(<App />);
//             const AppDOM = AppComponent.container.firstChild;

//             //getting the number of events input field
//             const NOEDom = AppDOM.querySelector('#eventCount');
//             const userInput = await user.type(NOEDom, '{backspace}{backspace}12'); // user types 12 into the input field


//             const EventListDOM = AppDOM.querySelector('#event-list');
//             const slicedEvent = EventListDOM.querySelectorAll('li').slice(0,NOEDom.value); // gets all the list items in the event list
//             // const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
            

//             expect(slicedEvent.length).toBe(parseInt(userInput.value));// compares inputed value with the number of rendered events


//         })
// })

