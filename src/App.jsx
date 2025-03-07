import React from 'react';
import CitySearch from './components/CitySearchView/CitySearch.jsx';
import EventList from './components/EventListView/EventList.jsx';
import NumberOfEvents from './components/numberOfEvents/NumberOfEvents.jsx';
const App = () => {
  return (
    <div className='App'>
      <CitySearch/>
      <NumberOfEvents/>
      <EventList/>
    </div>
  )
}

export default App
