import React, { useState, useCallback } from 'react';
import ContactForm from '../../components/ContactForm';
import Filter from '../../components/Filter';
import ContactsList from '../../components/ContactsList';
import Modal from '../../components/Modal';
import './ContactsView.scss';

function ContactsView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactId, setContactId] = useState(null);

  const toggleModal = useCallback(() => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
  }, []);

  const setCurrentId = useCallback(id => {
    setContactId(id);
  }, []);

  // const setCurrentId = id => setContactId(id);

  // const getContactId = () => contactId;

  const getContactId = useCallback(() => {
    return contactId;
  }, [contactId]);

  return (
    <div className="Container">
      <div className="Content__wrapper">
        <h1 className="Align__header">Phonebook</h1>
        <ContactForm buttonLabel="Add contact" />
        <Filter />
        <h2 className="Align__header">Contacts</h2>
        <ContactsList toggleModal={toggleModal} setContactId={setCurrentId} />
        {isModalOpen && (
          <Modal onClose={toggleModal}>
            <ContactForm
              buttonLabel="Update contact"
              toggleModal={toggleModal}
              getContactId={getContactId}
              toUpdateContact
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default ContactsView;
