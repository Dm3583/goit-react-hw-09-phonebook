import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './RegisterView.scss';

function RegisterView() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        console.warn(`There is no field - ${name}`);
    }
  };

  const register = user => dispatch(authOperations.registerUser(user));

  const handleSubmit = e => {
    e.preventDefault();
    const user = { name, email, password };
    register(user);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <h1 className="Align__header">Register</h1>
      <Form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="Form__container"
      >
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default RegisterView;
