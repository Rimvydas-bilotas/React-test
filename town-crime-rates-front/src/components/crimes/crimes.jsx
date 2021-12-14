import React, { useState, useEffect } from 'react';
import './crimes.css';
import CrimeCard from './crimeCard.jsx';


const CrimesDisplay = () => {

  const urlStr = String(window.location).split("/");
  const townId = urlStr[urlStr.length - 1];

  const [crimes, setCrimes] = useState([]);

  const fetchCrimes = () => {
    fetch(`http://localhost:8080/crimes/${townId}`)
      .then(response => response.json())
      .then(data => setCrimes(data));
  }

  useEffect(() => {
    fetchCrimes();
  }, []);

  return (
    <div>
      {crimes.length > 0 ?
        crimes.map((crime) => (
          <CrimeCard
            crime={crime}
          />
        )) :
        <h1>Loading...</h1>}

    </div>
  )
}

export default CrimesDisplay;