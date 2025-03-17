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
  const [reducedLocations, setReducedLocations] = useState(true);



  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE, reducedLocations]);

  //get event details

  const fetchData = async () => {
    const allEvents = await getEvents();

    //filter events based on user input of number of events and location
    const filteredEvents =
      currentCity === "See All Cities"
        ? allEvents : //if user selects "See All Cities" show all events
        allEvents.filter(event => event.location === currentCity)
    if (!filteredEvents) {
      return console.log(currentNOE, currentCity)

    }
    setEvents(filteredEvents.slice(0, parseInt(currentNOE)));
    if (reducedLocations) {
      setAllLocations(extractLocations(allEvents).slice(0, 3))
    }
    else {
      setAllLocations(extractLocations(allEvents))
    }
  }

  return (
    < div className='App' >
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setReducedLocations={setReducedLocations} />
      <NumberOfEvents
        currentNOE={currentNOE}
        setCurrentNOE={setCurrentNOE} />
      <EventList
        events={events} />
    </div >
  )
}

export default App
