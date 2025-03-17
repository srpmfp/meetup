import React, { useState, useEffect } from 'react';

const CitySearch = ({ allLocations, setCurrentCity, setReducedLocations}) => {

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setSuggestions(allLocations);
    // setToggle(toggle); // remove this line
  }, [`${allLocations}`, setCurrentCity, setReducedLocations]);

  //filter locations based on user input
  const handleInputChanged = (event) => {
    const value = event.target.value;

    const filteredLocations =
      allLocations ? allLocations.filter((location) => {
        return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
      }) : [];
    setQuery(value);
    setSuggestions(filteredLocations);

  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
  };

  const queryClear = () => {
    setCurrentCity('See All Cities')
    setQuery('')
    setShowSuggestions(false)
  }

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChanged}
      />
      {showSuggestions ?
        <ul className="suggestions">
          {query === '' ? null :

            <div className="query">
              <div className="query-text">
                {query}
              </div>
              <button onClick={queryClear} >X</button>
            </div>

          }
          {
            suggestions.map((suggestion) => {
              return <li role='event' onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
            })
          }
          <li key='See All Cities' onClick={() => { handleItemClicked, setReducedLocations(toggle); setToggle(!toggle) }}>
            {!toggle ? <b role="toggle">See All Cities</b> : <b role="toggle">Show Less</b>}
          </li>
        </ul>
        : null
      }
    </div>
  )
}



export default CitySearch;