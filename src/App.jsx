import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearchView/CitySearch.jsx';
import EventList from './components/EventListView/EventList.jsx';
import NumberOfEvents from './components/numberOfEvents/NumberOfEvents.jsx';
import CityEventsChart from './components/CityEventsChart/CityEventsChart.jsx';
import EventGenreChart from './components/EventGenreView/EventGenreChart.jsx';
import IconLogo from './assets/IconLogo.jsx';
import { extractLocations, getEvents } from './api.js';
import './App.css';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/AlertView/alert.jsx';


const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See All Cities');
  const [reducedLocations, setReducedLocations] = useState(true);
  const [infoAlert, setInfoAlert] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [warningAlert, setWarningAlert] = useState('');

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert('')
    } else {
      setWarningAlert('You are offline. Some features may not work as expected.');
    }
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
      } if (!reducedLocations) {
        setAllLocations(extractLocations(allEvents));
        return;
      }
    } catch (error) {
      console.log("Failed to fetch data:", error);
    }
  };


  return (
    < div className='App' >
      <div className="headerContainer">
        <IconLogo />
        <h1>Events Around the World</h1>
      </div>
      <div className="alertsContainer">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
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
      <div className="chartsContainer">
        <CityEventsChart role="charts-container" allLocations={allLocations} events={events} reducedLocations={reducedLocations} />
        <EventGenreChart role="charts-container" allLocations={allLocations} events={events} />
      </div>
      <EventList
        events={events} />

    </div >
  )
}

export default App
