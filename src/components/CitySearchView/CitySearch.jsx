import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CitySearch = ({
  allLocations,
  setCurrentCity,
  currentCity,
  setReducedLocations,
  reducedLocations,
  setInfoAlert,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [toggle, setToggle] = useState(false);


  useEffect(() => {
    setSuggestions(allLocations);
    setQuery('');
    setToggle(!toggle);
  }, [`${allLocations}`, setCurrentCity, setReducedLocations]);

  //filter locations based on user input
  const handleInputChanged = (event) => {
    const value = event.target.value;

    const filteredLocations = allLocations
      ? allLocations.filter((location) => {
        return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
      })
      : [];

    // if no city found in filter, show alert
    let infoText;
    if (filteredLocations.length === 0) {
      infoText = 'No city found with that name';
    } else {
      infoText = '';
    }

    setInfoAlert(infoText);
    setQuery(value);
    setSuggestions(filteredLocations);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
    setInfoAlert('');
  };

  const queryClear = () => {
    setCurrentCity('See All Cities');
    setQuery('');
    setShowSuggestions(false);
    setInfoAlert('');
  };

  return (
    <div id='city-search'>
      <input
        type='text'
        className='city'
        placeholder='Search for a city'
        value={query}
        onFocus={() => {
          setShowSuggestions(!showSuggestions);
        }}
        onChange={handleInputChanged}
      />
      {showSuggestions ? (
        <ul className='suggestions'>
          {query === '' ? null : (
            <div className='query'>
              <div className='query-text'>{query}</div>
              <button className='seeAllBtn' onClick={queryClear}>See All Cities</button>
            </div>
          )}
          {currentCity === 'See All Cities' && toggle
            ? suggestions
              .map((suggestion) => {
                return (
                  <li
                    role='event'
                    onClick={handleItemClicked}
                    key={suggestion}>
                    {suggestion}
                  </li>
                );
              })
              .slice(0, 3)
            : currentCity !== 'See All Cities' && !toggle
              ? suggestions.map((suggestion) => {
                return (
                  <li
                    role='event'
                    onClick={handleItemClicked}
                    key={suggestion}>
                    {suggestion}
                  </li>
                );
              })
              : !reducedLocations ? suggestions.map((suggestion) => {
                return (
                  <li
                    role='event'
                    onClick={handleItemClicked}
                    key={suggestion}>
                    {suggestion}
                  </li>
                );
              }) : null}
          {/* <li
            key='See All Cities'
            onClick={() => {
              handleItemClicked, setReducedLocations(toggle);
            }}>
            {toggle ? (
              <button
                role='toggle'
                onClick={() => {
                  setToggle(!toggle);
                }}>
                See All Cities
              </button>
            ) : (
              <button
                role='toggle'
                onClick={() => {
                  setToggle(!toggle);
                }}>
                Show Less
              </button>
            )}
          </li> */}
        </ul>
      ) : null}
    </div>
  );
};

CitySearch.propTypes = {
  allLocations: PropTypes.array.isRequired,
  setCurrentCity: PropTypes.func.isRequired,
  setReducedLocastions: PropTypes.func.isRequired,
  setInfoAlert: PropTypes.func.isRequired,
};

export default CitySearch;
