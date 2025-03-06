import React from 'react';
import CitySearch from './components/CitySearchView/CitySearch.jsx';
import EventList from './components/EventListView/EventList.jsx';

const App = () => {
  return (
    <div className='App'>
      <CitySearch />
      <EventList />
    </div>
  )
}

export default App
