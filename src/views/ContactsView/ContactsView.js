import React, { Component } from 'react';
import ContactForm from '../../components/ContactForm';
import Filter from '../../components/Filter';
import ContactsList from '../../components/ContactsList';
import Modal from '../../components/Modal';
import './ContactsView.scss';

class ContactsView extends Component {
  state = {
    isModalOpen: false,
    contactId: null,
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  };

  setContactId = id => {
    this.setState({ contactId: id });
  };

  getContactId = () => {
    return this.state.contactId;
  };

  render() {
    const { isModalOpen } = this.state;
    return (
      <div className="Container">
        <div className="Content__wrapper">
          <h1 className="Align__header">Phonebook</h1>
          <ContactForm buttonLabel="Add contact" />
          <Filter />
          <h2 className="Align__header">Contacts</h2>
          <ContactsList
            toggleModal={this.toggleModal}
            setContactId={this.setContactId}
          />
          {isModalOpen && (
            <Modal onClose={this.toggleModal}>
              <ContactForm
                buttonLabel="Update contact"
                toggleModal={this.toggleModal}
                getContactId={this.getContactId}
                updateContact
              />
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

export default ContactsView;
