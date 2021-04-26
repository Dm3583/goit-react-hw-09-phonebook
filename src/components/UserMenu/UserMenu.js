import React from 'react';
import { connect } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/auth';
import { Button, Badge } from 'react-bootstrap';
import './UserMenu.scss';

const UserMenu = ({ name, logout }) => {
  return (
    <>
      {/* <span>Welcome {name}</span> */}
      <h2>
        Welcome{' '}
        <Badge className="Badge__text" variant="primary">
          {name}
        </Badge>
      </h2>
      <Button type="button" onClick={logout}>
        Logout
      </Button>
    </>
  );
};

const mapStateToProps = state => ({
  name: authSelectors.getUserName(state),
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authOperations.logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
