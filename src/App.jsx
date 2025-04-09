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
  const [events, setEvents] = useState([]); // event array
  const [currentNOE, setCurrentNOE] = useState(32); // event count
  const [allLocations, setAllLocations] = useState([]); // location array
  const [currentCity, setCurrentCity] = useState('See All Cities'); // default city to show all events
  const [reducedLocations, setReducedLocations] = useState(true); // state for 'see all cities' : 'see less cities' '
  const [infoAlert, setInfoAlert] = useState(''); // state for no city found
  const [errorAlert, setErrorAlert] = useState(''); // state for less than 1 event
  const [warningAlert, setWarningAlert] = useState(''); // state for offline warning


  useEffect(() => {
    // Check if the user is online or offline
    if (navigator.onLine) {
      setWarningAlert('')
    } else {
      setWarningAlert('You are offline. Some features may not work as expected.');
    }
    //debounce the fetchData function to avoid multiple calls
    setTimeout(() => {
      console.log("Fetching data with:", { currentCity, currentNOE, reducedLocations });
      fetchData();
    }, 500);
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
        currentCity === 'See All Cities' //default true
          ? allEvents // show all even
          : allEvents.filter(event => event.location === currentCity).slice(0, parseInt(currentNOE));// filter by location


      //error handling
      if (!filteredEvents.length) {
        console.log("No filtered events found, showing all events");
        setEvents(allEvents.slice(0, parseInt(currentNOE)));
      } else {
        setEvents(filteredEvents);
      }
      setAllLocations(extractLocations(allEvents)); // get all locations from events
    } catch (error) {
      console.log("Failed to fetch data:", error);
    }
  };


  return (
    < div className='App' >
      <div className="headerContainer">
        <IconLogo />
        <div className="logoCont">
          <h1>MeetUp</h1>
          <h4>Find your next MeetUp</h4>
        </div>
        <div></div>

      </div>
      <div className="alertsContainer">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setAllLocations={setAllLocations}
        setReducedLocations={setReducedLocations}
        reducedLocation={reducedLocations}
        currentCity={currentCity}
        setInfoAlert={setInfoAlert} />
      <NumberOfEvents
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert} />
      <div className="chartsContainer">
        <CityEventsChart role="charts-container" allLocations={allLocations} events={events} />
        <EventGenreChart role="charts-container" allLocations={allLocations} events={events} />
      </div>
      <EventList
        events={events} currentNOE={currentNOE} />

    </div >
  )
}

export default App
