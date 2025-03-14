import React from 'react';
import Proptype from 'prop-types';
import Event from '../EventView/Event';


const EventList = ({ events }) => {
    return (
        <ul id="event-list">
            {events ?
                events.map(event => <Event key={event.id} event={event}
                />)  :
                null}

        </ul>
    );
}

EventList.propTypes = {
    events: Proptype.array
}
export default EventList