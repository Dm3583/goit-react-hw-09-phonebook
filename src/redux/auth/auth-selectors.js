import { createSelector } from '@reduxjs/toolkit';

const getUserName = state => state.auth.user.name;

const getIsAuthenticated = state => state.auth.isAuthenticated;

const getIsGettingCurrentUser = state => state.auth.isGettingCurrentUser;

export default {
  getUserName,
  getIsAuthenticated,
  getIsGettingCurrentUser,
};
