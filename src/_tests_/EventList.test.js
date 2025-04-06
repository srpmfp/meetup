import React from 'react';
import { render, within, waitFor } from '@testing-library/react';
import EventList from '../components/EventListView/EventList';
import { getEvents } from '../api';
import App from '../App';

describe('<EventList /> component', () => {
    let EventListComponent;
    beforeEach(() => {

        EventListComponent = render(<EventList />);
    })

    test('has element with "list" role', () => {
        expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
    })

    test('renders correct number of events', async () => {
        const allEvents = await getEvents();
        EventListComponent.rerender(<EventList events={allEvents} />);
        expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
    });


})

describe('<EventList/> integration', () =>{

test('renders a list of 32 events', async ()=>{
   
    const AppComonent = render(<App/>);
    const AppDom = AppComonent.container.firstChild;
    

    const EventListDom = AppDom.querySelector('#event-list');
    await waitFor(() => {
        const EventListItems = within(EventListDom).queryByRole('listitem');
        expect(EventListItems).toHaveLength(32); //ensures the textbox has a default value of 32
    })
})

})