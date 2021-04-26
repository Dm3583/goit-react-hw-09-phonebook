import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = () => (
  <>
    <Nav className="mr-auto">
      <Nav.Link href="/login" exact="true">
        Login
      </Nav.Link>
      <Nav.Link href="/register" exact="true">
        Register
      </Nav.Link>
    </Nav>
  </>
);

export default NavBar;
