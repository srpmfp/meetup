import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {

    const [count, setCurrentCount] = useState(32);

    useEffect(() => {
        setCurrentCount(parseInt(count))
    }, [setCurrentNOE])


    const handleInput = (event) => {
        const value = event.target.value;


        if (value <= 0) {
            setErrorAlert('Must display at least 1 event');
            setCurrentCount(value);
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
NumberOfEvents.propTypes = {
    setCurrentNOE: PropTypes.func.isRequired,
    setErrorAlert: PropTypes.func.isRequired,
};
export default NumberOfEvents;