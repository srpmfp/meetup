import React from 'react';
import Proptype from 'prop-types';
import Event from '../EventView/Event';


const EventList = ({ events, currentNOE }) => {
    return (
        <ul id="event-list">
            {events ?
                events.map(event => <Event key={event.id} event={event}
                />).slice(0, currentNOE) :  // renders the number of events selected by the user
                null}

        </ul>
    );
}

EventList.propTypes = {
    events: Proptype.array
}
export default EventList