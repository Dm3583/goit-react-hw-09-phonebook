import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authOperations } from '../../redux/auth';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './RegisterView.scss';

const initialState = {
  name: '',
  email: '',
  password: '',
};

class RegisterView extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
  };

  state = {
    ...initialState,
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = { ...this.state };
    // console.log(user);
    this.props.register(user);
    this.setState({ ...initialState });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { name, email, password } = this.state;
    return (
      <>
        <h1 className="Align__header">Register</h1>
        {/* <form autoComplete="off" onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form> */}
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
}

const mapDispatchToProps = dispatch => ({
  register: user => dispatch(authOperations.registerUser(user)),
});

export default connect(null, mapDispatchToProps)(RegisterView);
