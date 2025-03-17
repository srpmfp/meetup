import React, { useState, useEffect } from 'react';

const NumberOfEvents = ({ setCurrentNOE }) => {

    const [count, setCurrentCount] = useState(32);

    useEffect(() => {
        setCurrentCount(parseInt(count))
    }, [setCurrentNOE])


    const handleInput = (event) => {
        const value = event.target.value;
        setCurrentCount(value);
        setCurrentNOE(parseInt(value));
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