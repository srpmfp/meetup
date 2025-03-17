import React, { useState, useEffect } from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {

    const [count, setCurrentCount] = useState(32);

    useEffect(() => {
        setCurrentCount(count)
    }, [setCurrentNOE])


    const handleInput = (event) => {
        const value = event.target.value;
        setCurrentCount(value);
        setCurrentNOE(value);
    }

    return (
        <input role="textbox"
            id="eventCount"
            type="number"
            placeholder={"Enter number of events"}
            value={count}
            onChange={handleInput} />
    )

}

export default NumberOfEvents;