import { createSelector } from '@reduxjs/toolkit';

const getLoading = state => state.loader;

const getError = state => state.error;

const getFilter = state => state.contacts.filter;

const getAllContacts = state => state.contacts.items;

const getFilteredContacts = createSelector(
  [getAllContacts, getFilter],
  (allContacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    if (allContacts.length > 0) {
      return allContacts.filter(({ name }) =>
        name.toLowerCase().includes(normalizedFilter),
      );
    } else {
      return allContacts;
    }
  },
);

export default {
  getLoading,
  getError,
  getFilter,
  getAllContacts,
  getFilteredContacts,
};
