import React, { useState, useEffect } from 'react';
import './crimes.css';
import Button from '../button/button';
// import { useNavigate  } from 'react-router';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const AddCrime = () => {

// let navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [town, setTown] = useState('');
  const [severity, setSeverity] = useState('');

  const [severities, setSeverities] = useState([]);

  const fetchSeverities = () => {
    fetch('http://localhost:8080/severities')
      .then(response => response.json())
      .then(data => setSeverities(data));
  };

  useEffect(() => {
    fetchSeverities();
  }, []);

  const options = severities.map((severity) => (
    {value: String(severity.id), label: severity.description}
  ))

  const [towns, setTowns] = useState([]);

  const fetchTowns = () => {
    fetch('http://localhost:8080/towns')
      .then(response => response.json())
      .then(data => setTowns(data));
  }

  useEffect(() => {
    fetchTowns();
  }, []);

  const options2 = towns.map((town) => (
    {value: town.id, label: town.name}
  ))

  const onClickHandler = (event) => {
    event.preventDefault();

    let data = {
      description: description,
      date: date,
      town: town,
      severity: severity,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    };

    fetch('http://localhost:8080/crimes', options)
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
        setDescription('');
        setDate('');
        setTown('');
        setSeverity('');
        alert('Crime registered');
        // window.location.reload();
      })
      .catch((error) => {
        alert('Failed to register crime! Please contact admin');
      })
  };

  return (
    <form id="form" onSubmit={onClickHandler}>
      <textarea className = "textarea"  name="description" placeholder='Add a short description of the crime' onChange={(event) => setDescription(event.target.value)} />
      <input type="date" name="date" placeholder="Date" onChange={(event) => setDate(event.target.value)} />
       {/* siuo metu nepavyksta is dropdown meniu imesti reiksmiu i body */}
      <Dropdown name='town' options={options2} placeholder="Select a town" onSelect={(event) => setTown(event.target.value)} />
      <Dropdown name='severity' options={options} placeholder="Select an severity" onSelect={(event) => setSeverity(event.target.value)} />
      <Button type="submit" text="Register" className="orange" />
    </form>
  )
}

export default AddCrime;