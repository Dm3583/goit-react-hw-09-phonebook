import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authOperations } from '../../redux/auth';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './LoginView.scss';

const initialState = {
  email: '',
  password: '',
};

class LoginView extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = { ...this.state };
    this.props.login(user);
    this.setState({ ...initialState });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { email, password } = this.state;
    console.log('LOGIN VIEW');
    return (
      <>
        <h1 className="Align__header">Login</h1>
        {/* <form autoComplete="off" onSubmit={handleSubmit}>
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
  login: user => dispatch(authOperations.loginUser(user)),
});

export default connect(null, mapDispatchToProps)(LoginView);
