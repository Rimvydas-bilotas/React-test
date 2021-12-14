import React, { useState } from 'react';
import './login.css';
import Button from '../button/button';
import { useNavigate } from 'react-router';

const Login = () => {

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

    fetch('http://localhost:8080/login', options)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            setName('');
            setPassword('');
            return;});
        }
        return response.json();
      })
      .then((data) => {
        setName('');
        setPassword('');
        localStorage.setItem('token', data.data);
        alert('You are logged in');
        navigate('/')
      })
      .catch((error) => {
        if (error.data) {
          alert (`Failed to login!\n${error.data.details[0].message}`);
        } else {
          alert('Failed to login!\nSomething went wrong');
        }
      })
  };

  return (
    <form id="login" onSubmit={onClickHandler}>
      <input type="text" name="name" placeholder="Slapyvardis" minLength="1" onChange={(event) => setName(event.target.value)} />
      <input type="password" name="password" placeholder="Mažiausiai 5 simboliai" minLength="5" onChange={(event) => setPassword(event.target.value)} />
      <Button type="submit" text="Prisijungti" className="blue" />
    </form>
  )
}

export default Login;