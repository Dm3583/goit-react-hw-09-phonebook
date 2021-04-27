import React from 'react';
import { connect, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authSelectors } from '../../redux/auth';
import { Nav } from 'react-bootstrap';

const Navigation = () => {
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);

  return (
    <>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        {isAuthenticated && (
          <Nav.Link href="/contacts" exact="true">
            My Contacts
          </Nav.Link>
        )}
      </Nav>
    </>
  );
};

export default Navigation;
