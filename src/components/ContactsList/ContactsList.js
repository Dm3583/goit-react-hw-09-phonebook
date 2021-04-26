import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import PropTypes from 'prop-types';
import './ContactsList.scss';
import { contactsOperations, contactsSelectors } from '../../redux/phonebook';
import { authOperations } from '../../redux/auth';

class ContactsList extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    const {
      contacts,
      deleteContact,
      isLoadingContacts,
      isError,
      toggleModal,
      setContactId,
    } = this.props;

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
  }
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
  deleteContact: PropTypes.func.isRequired,
  fetchContacts: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  setContactId: PropTypes.func.isRequired,
  isLoadingContacts: PropTypes.bool.isRequired,
  isError: PropTypes.bool,
};

const mapStateToProps = state => ({
  contacts: contactsSelectors.getFilteredContacts(state),
  isLoadingContacts: contactsSelectors.getLoading(state),
  isError: contactsSelectors.getError(state),
});

const mapDispatchToProps = dispatch => ({
  deleteContact: id => dispatch(contactsOperations.deleteContact(id)),
  fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
