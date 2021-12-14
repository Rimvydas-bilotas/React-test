import React from 'react';
import './crimes.css';
import Button from '../button/button';
// import { Link } from 'react-router-dom';

const CrimeCard = ({ crime }) => {
  const isloggedin = localStorage.getItem('token');
  const datestring = String(crime.date).split("T");
  const date = datestring[0];
  const onClickHandler = (event) => {
    event.preventDefault();
    // let data = {
    //   id: crime.id,
    // };

    const options = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      // body: JSON.stringify(data),
    };

    fetch(`http://localhost:8080/crimes/${crime.id}`, options)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            const error = new Error('Something went wrong!');
            error.data = data;
            throw error;});
        }
        return response.json();
      })
      .then((data) => {
        alert('Crime deleted');
        window.location.reload();
      })
      .catch((error) => {
        alert('Failed to delete crime! Please contact admin');
      })
    return
  }
  return (
    <div className="crime_card">
      <h4>{crime.description}</h4>
      <h4>{date}</h4>
      <h4>{crime.name}</h4>
      <h4>{crime.severity + '- ' + crime.severity_description}</h4>
      {isloggedin ? <Button type="button" text="Delete the case" className="orange" onClick={onClickHandler} /> : null}
    </div>
  )
}

export default CrimeCard;