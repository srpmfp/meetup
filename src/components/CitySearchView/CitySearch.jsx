import React, { useState } from 'react';

const CitySearch = ({ allLocations }) => {
    const [query, setQuery] = useState('');
    const [suggestion, setSuggestion] = useState([]);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const handleInput = (event) => {
        const value = event.target.value;
        const filter = allLocations ? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        }) : [];
        setQuery(value);
        setSuggestion(filter);

    }
    return (
        <div id='city-search'>
            <input
                type='text'
                className='city'
                placeholder='name of city'
                value={query}
                onFocus={() => setShowSuggestion(true)}
                onChange={handleInput}
            />

            {showSuggestion ? <ul className='suggestions'> {suggestion.map((suggestion) => {
                return <li key={suggestion}>{suggestion}</li>
            })} <li key='see all cities'> <b>See All Cities</b></li> </ul> : null}

        </div>
    )
}

export default CitySearch;