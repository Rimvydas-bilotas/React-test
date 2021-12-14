import React from 'react';
import './crimes.css';
// import Button from '../button/button';
// import { Link } from 'react-router-dom';

const CrimeCard = ({ crime }) => {
  // const isloggedin = localStorage.getItem('token');
  const datestring = String(crime.date).split("T");
  const date = datestring[0];
  // const onClickHandler = (event) => {
  //   event.preventDefault();
  //   return
  // }
  return (
    <div className="crime_card">
      <h4>{crime.description}</h4>
      <h4>{date}</h4>
      <h4>{crime.name}</h4>
      <h4>{crime.severity + '- ' + crime.severity_description}</h4>
      {/* {isloggedin ? <Button type="button" text="Delete the case" className="orange" onClick={onClickHandler} /> : null} */}
    </div>
  )
}

export default CrimeCard;