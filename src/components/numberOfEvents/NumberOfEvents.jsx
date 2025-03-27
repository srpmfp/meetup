import React, { useState, useEffect } from 'react';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {

    const [count, setCurrentCount] = useState(32);

    useEffect(() => {
        setCurrentCount(parseInt(count))
    }, [setCurrentNOE])


    const handleInput = (event) => {
        const value = event.target.value;
       
       
        if (value <= 0) {
            setErrorAlert('Must display at least 1 event');
        } else {
            setErrorAlert('');
            setCurrentNOE(parseInt(value));
            setCurrentCount(value);
        }
      
        
    }

    return (
        <input role="textbox"
            id="eventCount"
            type="number"
            placeholder="Enter number of events"
            value={count}
            onChange={handleInput} />
    )

}

export default NumberOfEvents;