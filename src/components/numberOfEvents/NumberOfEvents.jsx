import React from 'react';
import { useState, useEffect } from 'react';

const NumberOfEvents = ({ setCurrentNOE }) => {

    const [count, setCount] = useState(32);
    useEffect(() => {
        setCurrentNOE(count),
            [count, setCurrentNOE]
    })
    const handleInput = (event) => {
        const value = event.target.value;
        setCount(value);

    }

    return (
        <input role="textbox" id="eventCount"
            type="number" placeholder="Enter number of events"
            value={count} onChange={handleInput} />
    )

}

export default NumberOfEvents;