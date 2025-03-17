import React, { useState } from 'react';


const Event = ({ event }) => {

    // const [data, setData] = useState(event);
    const [showDetails, setShowDetails] = useState(false);
    const sDate = new Date(event.start.dateTime).toString()
    const eDate = new Date(event.end.dateTime).toString()

    const revealDetails = () => {
        setShowDetails(!showDetails);
    }


    const eventDetails = (

    ) => {
        if (showDetails) {

            return (
                <ul id={event.id}>
                    <li>{event.summary}</li>
                    <li>{sDate}</li>
                    <li>{eDate}</li>
                    <li>{event.location}</li>
                    <li>{event.description}</li>
                </ul>)
        }
    }

    return (
        <li className="event" id={event.summary}>
            {event.summary}<br />
            {event.location}<br />
            {event.start.dateTime}

            <button className="details-btn" id={event.id} onClick={
                revealDetails
            }>{showDetails ? "Hide Details" : "Show Details"}</button>

            {eventDetails()}
        </li>)
}

export default Event;