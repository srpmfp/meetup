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
        nComponent = render(<NumberOfEvents currentNOE={() => { }} setCurrentNOE={() => { }} setErrorAlert={()=>{}}/>);
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

