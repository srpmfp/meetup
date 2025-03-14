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
  }, [currentCity, currentNOE]);

  //get event details

  const fetchData = async () => {
    const allEvents = await getEvents();

    //filter events based on user input of number of events and location
    const filteredEvents = currentCity === "See All Cities" ?
      allEvents.slice(0, currentNOE) : //if user selects "See All Cities" show all events
      allEvents.filter(event => event.location === currentCity)

    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }
  console.log(events.length);
  return (
    < div className='App' >
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setCurrentNOE={setCurrentNOE} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} />
      <EventList events={events} />
    </div >
  )
}

export default App
