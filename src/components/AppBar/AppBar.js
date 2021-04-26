import React from 'react';
import { connect } from 'react-redux';
import AuthNav from '../AuthNav';
import Navigation from '../Navigation';
import UserMenu from '../UserMenu';
import { authSelectors } from '../../redux/auth';
import { Navbar, Nav } from 'react-bootstrap';

const AppBar = ({ isAuthenticated, isGettingCurrentUser }) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">My phone Book</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Navigation />
      {isAuthenticated ? <UserMenu /> : !isGettingCurrentUser && <AuthNav />}
    </Navbar.Collapse>
  </Navbar>
);

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.getIsAuthenticated(state),
  isGettingCurrentUser: authSelectors.getIsGettingCurrentUser(state),
});

export default connect(mapStateToProps)(AppBar);
