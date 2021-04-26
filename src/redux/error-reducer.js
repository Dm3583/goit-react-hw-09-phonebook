import { createReducer } from '@reduxjs/toolkit';
import { contactsActions } from './phonebook';
import { authActions } from './auth';

const {
  addContactRequest,
  addContactSuccess,
  addContactError,
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  updateContactRequest,
  updateContactSuccess,
  updateContactError,
} = contactsActions;

const {
  registerUserRequest,
  registerUserSuccess,
  registerUserError,
  loginUserRequest,
  loginUserSuccess,
  loginUserError,
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
} = authActions;

const setError = (_, { payload }) => payload;

export const error = createReducer(null, {
  [addContactRequest]: () => null,
  [addContactSuccess]: () => null,
  [addContactError]: setError,
  [fetchContactsRequest]: () => null,
  [fetchContactsSuccess]: () => null,
  [fetchContactsError]: setError,
  [deleteContactRequest]: () => null,
  [deleteContactSuccess]: () => null,
  [deleteContactError]: setError,
  [registerUserRequest]: () => null,
  [registerUserSuccess]: () => null,
  [registerUserError]: setError,
  [loginUserRequest]: () => null,
  [loginUserSuccess]: () => null,
  [loginUserError]: setError,
  [logoutUserRequest]: () => null,
  [logoutUserSuccess]: () => null,
  [logoutUserError]: setError,
  [getCurrentUserRequest]: () => null,
  [getCurrentUserSuccess]: () => null,
  [getCurrentUserError]: setError,
  [updateContactRequest]: () => null,
  [updateContactSuccess]: () => null,
  [updateContactError]: setError,
});
