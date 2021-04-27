import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/auth';
import { Button, Badge } from 'react-bootstrap';
import './UserMenu.scss';

const UserMenu = () => {
  const dispatch = useDispatch();

  const name = useSelector(authSelectors.getUserName);

  const logout = useCallback(() => dispatch(authOperations.logoutUser()), [
    dispatch,
  ]);

  return (
    <>
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

export default UserMenu;
