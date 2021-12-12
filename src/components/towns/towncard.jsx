import React from 'react';
import './towns.css';
import Button from '../button/button';
import { Link } from 'react-router-dom';

const TownCard = ({ town }) => {
const crimesNumberText = 'Nusikaltimu sk. tenkantis 1000 gyventoju - ';
const crimesSeverityText = 'Vidutinis nusikaltimu sunkumas (5 balu sistema) - ';

  return (
    <div className="town_card">
      <h4>{town.name}</h4>
      <h4>{crimesNumberText + town.NumberOfCrimes}</h4>
      <h4>{crimesSeverityText + town.AverageSeverity}</h4>
      <Link to={`/crimes/${town.id}`}><Button className="orange" text="VIEW LOG" /></Link>
    </div>
  )
}

export default TownCard;