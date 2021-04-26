import axios from 'axios';
import actions from './contacts-actions';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

const addContact = contact => dispatch => {
  dispatch(actions.addContactRequest());

  axios
    .post('/contacts', contact)
    .then(({ data }) => dispatch(actions.addContactSuccess(data)))
    .catch(error => dispatch(actions.addContactError(error)));
};

const fetchContacts = () => dispatch => {
  dispatch(actions.fetchContactsRequest());

  axios
    .get('/contacts')
    .then(({ data }) => dispatch(actions.fetchContactsSuccess(data)))
    .catch(error => dispatch(actions.fetchContactsError(error)));
};

const deleteContact = contactId => dispatch => {
  dispatch(actions.deleteContactRequest());

  axios
    .delete(`/contacts/${contactId}`)
    .then(() => dispatch(actions.deleteContactSuccess(contactId)))
    .catch(error => dispatch(actions.deleteContactError(error)));
};

const updateContact = ({ id, contact }) => dispatch => {
  dispatch(actions.updateContactRequest());

  axios
    .patch(`/contacts/${id}`, contact)
    .then(({ data }) => dispatch(actions.updateContactSuccess(data)))
    .catch(error => dispatch(actions.updateContactError(error.message)));
};

export default {
  addContact,
  fetchContacts,
  deleteContact,
  updateContact,
};
