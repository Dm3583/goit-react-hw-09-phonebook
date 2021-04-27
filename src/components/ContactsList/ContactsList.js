import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import './ContactsList.scss';
import { contactsOperations, contactsSelectors } from '../../redux/phonebook';

const ContactsList = ({ toggleModal, setContactId }) => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(contactsOperations.fetchContacts()), [dispatch]);

  const contacts = useSelector(contactsSelectors.getFilteredContacts);
  const isLoadingContacts = useSelector(contactsSelectors.getLoading);
  const isError = useSelector(contactsSelectors.getError);

  const deleteContact = useCallback(
    id => dispatch(contactsOperations.deleteContact(id)),
    [dispatch],
  );

  return (
    <>
      <ul className="ContactsList">
        {contacts.map(contact => (
          <ListItem
            key={contact.id}
            contact={contact}
            deleteContact={deleteContact}
            toggleModal={toggleModal}
            setContactId={setContactId}
          />
        ))}
      </ul>
      {isLoadingContacts && <h1>Loading ...</h1>}
      {isError && <h1>Something went wrong ...</h1>}
    </>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
  toggleModal: PropTypes.func.isRequired,
  setContactId: PropTypes.func.isRequired,
};

export default ContactsList;
