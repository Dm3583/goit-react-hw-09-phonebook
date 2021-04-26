import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from './contacts-actions';

const {
  changeFilter,
  addContactSuccess,
  fetchContactsSuccess,
  updateContactSuccess,
  deleteContactSuccess,
} = actions;

const items = createReducer([], {
  [addContactSuccess]: (state, { payload }) => [...state, payload],
  [deleteContactSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [fetchContactsSuccess]: (_, { payload }) => payload,
  [updateContactSuccess]: (state, { payload }) => {
    state.map(contact => (contact.id === payload.id ? payload : contact));
  },
});

const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

export const contactsReducer = combineReducers({
  items,
  filter,
});
