import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './LoginView.scss';

function LoginView() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        console.warn(`This form doesn't process a field with name - ${name}`);
    }
  };

  const login = user => dispatch(authOperations.loginUser(user));

  const handleSubmit = e => {
    e.preventDefault();
    const user = { email, password };
    login(user);
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <h1 className="Align__header">Login</h1>
      <Form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="Form__container"
      >
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

export default LoginView;
