import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from './auth-actions';

const {
  registerUserSuccess,
  loginUserSuccess,
  logoutUserSuccess,
  getCurrentUserSuccess,
  registerUserError,
  loginUserError,
  logoutUserError,
  getCurrentUserRequest,
  getCurrentUserError,
} = actions;

const resetUser = { name: null, email: null };

const user = createReducer(null, {
  [registerUserSuccess]: (_, { payload }) => payload.user,
  [loginUserSuccess]: (_, { payload }) => payload.user,
  [getCurrentUserSuccess]: (_, { payload }) => payload,
  [logoutUserSuccess]: () => resetUser,
});

const token = createReducer(null, {
  [registerUserSuccess]: (_, { payload }) => payload.token,
  [loginUserSuccess]: (_, { payload }) => payload.token,
  [logoutUserSuccess]: () => null,
});

const isAuthenticated = createReducer(false, {
  [registerUserSuccess]: () => true,
  [loginUserSuccess]: () => true,
  [getCurrentUserSuccess]: () => true,
  [logoutUserSuccess]: () => false,
  [registerUserError]: () => false,
  [loginUserError]: () => false,
  [logoutUserError]: () => false,
  [getCurrentUserError]: () => false,
});

const isGettingCurrentUser = createReducer(false, {
  [getCurrentUserRequest]: () => true,
  [getCurrentUserSuccess]: () => false,
  [getCurrentUserError]: () => false,
});

export const authReducers = combineReducers({
  user,
  token,
  isAuthenticated,
  isGettingCurrentUser,
});
