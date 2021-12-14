import React, { useState } from 'react';
import '../login/login.css';
import Button from '../button/button';
import { useNavigate  } from 'react-router';

const Register = () => {

let navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const onClickHandler = (event) => {
    event.preventDefault();

    let user = {
      name: name,
      password: password,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    fetch('http://localhost:8080/register', options)
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
        setName('');
        setPassword('');
        alert('You have been registered');
        navigate('/')
      })
      .catch((error) => {
        alert('Failed to register! User with this name already exists');
      })
  };

  return (
    <form id="login" onSubmit={onClickHandler}>
      <input type="text" name="name" placeholder="Name" onChange={(event) => setName(event.target.value)} />
      <input type="password" name="password" placeholder="At least 5 symbols" minLength="5" onChange={(event) => setPassword(event.target.value)} />
      <Button type="submit" text="Register" className="blue" />
    </form>
  )
}

export default Register;