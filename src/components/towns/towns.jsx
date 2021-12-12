import React, { useState, useEffect } from 'react';
import './towns.css';
import TownCard from './towncard.jsx';


const TwonsDisplay = () => {

  const [towns, setTowns] = useState([]);

  const fetchTowns = () => {
    fetch('http://localhost:8080/towns')
      .then(response => response.json())
      .then(data => setTowns(data));
  }

  useEffect(() => {
    fetchTowns();
  }, []);

  return (
    <div>
      {towns.length > 0 ?
        towns.map((town) => (
          <TownCard
            town={town}
          />
        )) :
        <h1>Loading...</h1>}

    </div>
  )
}

export default TwonsDisplay;