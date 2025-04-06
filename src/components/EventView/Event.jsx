import React, { useState } from 'react';
import PropTypes from 'prop-types';


const Event = ({ event }) => {

    const [data, setData] = useState(event);
    const [showDetails, setShowDetails] = useState(false);
    const sDate = new Date(data.start.dateTime).toString()
    const eDate = new Date(data.end.dateTime).toString()

    const revealDetails = () => {
        setShowDetails(!showDetails);
    }


    const eventDetails = (

    ) => {
        if (showDetails) {

            return (
                <ul className="eventDetails" id={data.id}>
                    <li>{data.summary}</li>
                    <li>{sDate}</li>
                    <li>{eDate}</li>
                    <li>{data.location}</li>
                    <li>{data.description}</li>
                </ul>)
        }
    }

    return (
        <li className="event" id={data.summary}>
            {data.summary}<br />
            {data.location}<br />
            {sDate}

            <button className="details-btn" id={data.id} onClick={
                revealDetails
            }>{showDetails ? "Hide Details" : "Show Details"}</button>

            {eventDetails()}
        </li>)
}
Event.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        start: PropTypes.shape({
            dateTime: PropTypes.string.isRequired,
        }).isRequired,
        end: PropTypes.shape({
            dateTime: PropTypes.string.isRequired,
        }).isRequired,
        description: PropTypes.string,
    }).isRequired,
};
export default Event;