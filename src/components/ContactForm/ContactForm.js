import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import './ContactForm.scss';
import { contactsOperations, contactsSelectors } from '../../redux/phonebook';
import { Button } from 'react-bootstrap';

const ContactForm = ({ buttonLabel, toggleModal, getContactId }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const allContacts = useSelector(contactsSelectors.getAllContacts);

  useEffect(() => {
    const getOldContact = id => {
      allContacts.find(contact => {
        if (contact.id === id) {
          setName(contact.name);
          setNumber(contact.number);
        }
      });
    };
    if (updateContact && getContactId) {
      const id = getContactId();
      getOldContact(id);
    }
  }, [allContacts]);

  const addContact = useCallback(
    contact => dispatch(contactsOperations.addContact(contact)),
    [dispatch],
  );
  const updateContact = contact =>
    dispatch(contactsOperations.updateContact(contact));
  const fetchContacts = () => dispatch(contactsOperations.fetchContacts());

  const handleInput = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        console.warn(`There is no such input field - ${name}`);
    }
  };

  const isNameExist = (contacts, name) => {
    const normalizedName = name.toLowerCase();
    return contacts.find(
      contact => contact.name.toLowerCase() === normalizedName,
    );
  };

  const createContact = (name, number) => {
    return {
      // id: uuid(),
      name,
      number,
    };
  };

  const clearInput = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!name || !number) {
      alert(`Complete the form please`);
      return;
    }

    if (updateContact && toggleModal) {
      const contact = createContact(name, number);
      const id = getContactId();
      updateContact({ id, contact });
      fetchContacts();
      toggleModal();
    } else if (!isNameExist(allContacts, name)) {
      const contact = createContact(name, number);
      addContact(contact);
    } else {
      alert(`${name} is already in contacts`);
    }
    clearInput();
  };

  return (
    <form onSubmit={handleSubmit} className="ContactForm">
      <label>
        <p className="ContactForm__label">Name</p>
        <input
          className="ContactForm__text-input"
          type="text"
          value={name}
          onChange={handleInput}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>{' '}
      <label>
        <p className="ContactForm__label">Number</p>
        <input
          className="ContactForm__text-input"
          type="tel"
          value={number}
          onChange={handleInput}
          name="number"
          pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
          title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
          required
        />
      </label>
      <div className="ContactForm__btnWrapper">
        <Button type="submit" variant="success">
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
  // }
};

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  toggleModal: PropTypes.func,
  getContactId: PropTypes.func,
};

ContactForm.defaultProps = {
  toggleModal: null,
  getContactId: null,
};

export default ContactForm;
