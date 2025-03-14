import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearchView/CitySearch.jsx';
import EventList from './components/EventListView/EventList.jsx';
import NumberOfEvents from './components/numberOfEvents/NumberOfEvents.jsx';
import { extractLocations, getEvents } from './api';
import './App.css';


const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See All Cities');



  useEffect(() => {
    fetchData();
  }, [currentCity]);

  //get event details

   const fetchData = async () => {
   const allEvents = await getEvents();
   const filteredEvents = currentCity === "See All Cities" ?
     allEvents :
     allEvents.filter(event => event.location === currentCity)
   setEvents(filteredEvents.slice(0, currentNOE));
   setAllLocations(extractLocations(allEvents));
 }

  return (
    <div className='App'>
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents />
      <EventList events={events} />
    </div>
  )
}

export default App
