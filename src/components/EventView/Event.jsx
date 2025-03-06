import React, { useState } from 'react';


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
                <ul id={data.id}>
                
                    <li>{data.summary}</li>
                    <li>{sDate}</li>
                    <li>{eDate}</li>
                    <li>{data.location}</li>
                    <li>{data.description}</li>
                </ul>)
        }
    }

    return (
        <li id={data.summary}>
            <button id={data.id} onClick={
                revealDetails
            }>{showDetails ?  "Hide Details" : "Show Details" }</button>
            {eventDetails()}
            </li>)
}

export default Event;