import React from 'react';
import { useState } from 'react';

const NumberOfEvents = (event) => {
    const [data, setData] = useState(event);
    const [count, setCount] = useState(32);
    const handleInput = (event) => {
        const value = event.target.value;
        setCount(value);}

    return (
        <input role="textbox" id="eventCount" 
        type="number" placeholder="Enter number of events"
        value={count} onChange= {handleInput}/>
        )

}

export default NumberOfEvents;