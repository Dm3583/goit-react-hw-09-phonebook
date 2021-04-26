import { createAction } from '@reduxjs/toolkit';

// Filter contacts
const changeFilter = createAction('contacts/changeFilter');

// Add contacts
const addContactRequest = createAction('contacts/addContactRequest');
const addContactSuccess = createAction('contacts/addContactSuccess');
const addContactError = createAction('contacts/addContactError');

// Fetch contacts

const fetchContactsRequest = createAction('contacts/fetchContactsRequest');
const fetchContactsSuccess = createAction('contacts/fetchContactsSuccess');
const fetchContactsError = createAction('contacts/fetchContactsError');

// Delete contacts

const deleteContactRequest = createAction('contacts/deleteContactRequest');
const deleteContactSuccess = createAction('contacts/deleteContactSuccess');
const deleteContactError = createAction('contacts/deleteContactError');

// Update contacts

const updateContactRequest = createAction('contacts/updateContactRequest');
const updateContactSuccess = createAction('contacts/updateContactSuccess');
const updateContactError = createAction('contacts/updateContactError');

export default {
  changeFilter,
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
};
