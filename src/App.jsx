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
    console.log("Fetching data with:", { currentCity, currentNOE, reducedLocations });
    fetchData();
  }, [currentCity, currentNOE, reducedLocations]);

  //get event details

  const fetchData = async () => {
   
    try {
      const allEvents = await getEvents();
      if (!allEvents) {
        console.error("No events fetched");
        return;
      }

      const filteredEvents =
        currentCity === 'See All Cities'
          ? allEvents
          : allEvents.filter(event => event.location === currentCity);

      if (!filteredEvents.length) {
        console.warn("No filtered events found, showing all events");
        setEvents(allEvents);
      } else {
        setEvents(filteredEvents.slice(0, parseInt(currentNOE)));
      }

      if (reducedLocations) {
        setAllLocations(extractLocations(allEvents).slice(0, 3));
        return;
      } else {
        setAllLocations(extractLocations(allEvents));
        return;
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

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
