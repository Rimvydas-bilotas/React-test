import React from 'react';
import './towns.css';
import Button from '../button/button';
import { Link } from 'react-router-dom';

const TownCard = ({ town }) => {
const crimesNumberText = 'Nusikaltimų sk. tenkantis 1000 gyventojų - ';
const crimesSeverityText = 'Vidutinis nusikaltimų sunkumas (5 balų sistema) - ';
const noCrimes = 'Saugiau buti nebegali';
  return (
    <div className="town_card">
      <h4>{town.name}</h4>
      <h4>{crimesNumberText + (town.NumberOfCrimes / (town.population/1000)).toFixed(2)}</h4>
      <h4>{town.AverageSeverity===null ? noCrimes : crimesSeverityText + town.AverageSeverity}</h4>
      <Link to={`/crimes/${town.id}`}><Button className="blue" text="Detalizuotas nusikaltimų sąrašas" /></Link>
    </div>
  )
}

export default TownCard;