import React from 'react';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearchView/CitySearch';
import App from '../App';
import { getEvents, extractLocations } from '../api';


describe('<CitySearch/> component', () => {
    let CitySearchComponent;
    beforeEach(() => {
        CitySearchComponent = render(<CitySearch allLocations={[]} />);
    });

    test('renders text input', () => {

        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    test('suggestions list is hidden by default', () => {
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });


    test('renders a list of suggestions when city textbox gains focus', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(<CitySearch
            allLocations={allLocations}
            setCurrentCity={() => { }}
        />);
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.click(cityTextBox);
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).toBeInTheDocument();
        expect(suggestionList).toHaveClass('suggestions');
    });

    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(<CitySearch
            allLocations={allLocations}
            setCurrentCity={() => { }}
        />);


        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, "Berlin");


        // the suggestion's textContent look like this: "Berlin, Germany"
        const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];


        await user.click(BerlinGermanySuggestion);


        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });

    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(<CitySearch
            allLocations={allLocations}
            setCurrentCity={() => { }}
            setCurrentNOE={() => { }}
        />);


        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, "Berlin");


        // the suggestion's textContent look like this: "Berlin, Germany"
        const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];


        await user.click(BerlinGermanySuggestion);


        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });


})
describe('city search integration', () => {

    test('renders a list when the app is rendered', async () => {
        // Set up environment
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDom = AppComponent.container.firstChild;

        const allEvents = await getEvents();


        // Gets the textbox contents
        const citySearchDom = AppDom.querySelector('#city-search');
        const cityTextBox = within(citySearchDom).queryByRole('textbox');
        await user.type(cityTextBox, "Berlin");

        const BerlinGermanySuggestion = within(citySearchDom).queryAllByRole('listitem')[0];
        await user.click(BerlinGermanySuggestion);
        const allLocations = extractLocations(allEvents);

        const NOEDom = AppDom.querySelector('#eventCount');
        await user.type(NOEDom, '{backspace}{backspace}13');
        


        // Gets the suggestions list

        const eventListDom = AppDom.querySelector('#event-list');
        const suggestionListItems = within(eventListDom).queryAllByRole('listitem');

        expect(suggestionListItems.length).toBe(allEvents.slice(0, NOEDom.value).length);
;
    });


})