import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearchView/CitySearch.jsx';
import EventList from './components/EventListView/EventList.jsx';
import NumberOfEvents from './components/numberOfEvents/NumberOfEvents.jsx';
import { extractLocations, getEvents } from './api.js';
import './App.css';
import { InfoAlert, ErrorAlert } from './components/AlertView/alert.jsx';


const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See All Cities');
  const [reducedLocations, setReducedLocations] = useState(true);
  const [infoAlert, setInfoAlert] = useState('');
  const [errorAlert, setErrorAlert] = useState('');

  useEffect(() => {
    setTimeout(() => {
      console.log("Fetching data with:", { currentCity, currentNOE, reducedLocations });
      fetchData();
    }, 1000);
  }, [currentCity, currentNOE, reducedLocations]);

  //get event details

  const fetchData = async () => {

    try {
      const allEvents = await getEvents();
      if (allEvents == []) {
        console.log("No events fetched");
        return;
      }

      const filteredEvents =
        currentCity === 'See All Cities'
          ? allEvents
          : allEvents.filter(event => event.location === currentCity);

      if (!filteredEvents.length) {
        console.log("No filtered events found, showing all events");
        setEvents(allEvents.slice(0, parseInt(currentNOE)));
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
      console.log("Failed to fetch data:", error);
    }
  };

  return (
    < div className='App' >
      <div className="alertsContainer">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setReducedLocations={setReducedLocations}
        setInfoAlert={setInfoAlert} />
      <NumberOfEvents
        // currentNOE={currentNOE}
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert} />
      <EventList
        events={events} />

    </div >
  )
}

export default App
