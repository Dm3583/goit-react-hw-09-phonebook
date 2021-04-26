import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import './ContactForm.scss';
import { contactsOperations, contactsSelectors } from '../../redux/phonebook';
import { Button } from 'react-bootstrap';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class ContactForm extends Component {
  static propTypes = {
    addContact: PropTypes.func.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    allContacts: PropTypes.array,

    updateContact: PropTypes.func,
    fetchContacts: PropTypes.func,
    toggleModal: PropTypes.func,
    getContactId: PropTypes.func,
  };

  static defaultProps = {
    allContacts: [],
    updateContact: null,
    fetchContacts: null,
    toggleModal: null,
    getContactId: null,
  };

  state = {
    ...INITIAL_STATE,
  };

  componentDidMount() {
    if (this.props.updateContact && this.props.getContactId) {
      const id = this.props.getContactId();
      this.getOldContact(id);
    }
  }

  handleInput = e => {
    const stateField = e.target.name;
    this.setState({ [stateField]: e.target.value });
  };

  isNameExist = (contacts, name) => {
    const normalizedName = name.toLowerCase();
    return contacts.find(
      contact => contact.name.toLowerCase() === normalizedName,
    );
  };

  createContact = (name, number) => {
    return {
      // id: uuid(),
      name,
      number,
    };
  };

  getOldContact = id => {
    console.log('getOldContact');
    this.props.allContacts.find(contact => {
      if (contact.id === id) {
        this.setState({
          name: contact.name,
          number: contact.number,
        });
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { allContacts, addContact } = this.props;
    const { name, number } = this.state;

    if (!name || !number) {
      alert(`Complete the form please`);
      return;
    }

    if (this.props.updateContact && this.props.toggleModal) {
      const contact = this.createContact(name, number);
      const id = this.props.getContactId();
      this.props.updateContact({ id, contact });
      this.props.fetchContacts();
      this.props.toggleModal();
    } else if (!this.isNameExist(allContacts, name)) {
      const contact = this.createContact(name, number);
      addContact(contact);
    } else {
      alert(`${name} is already in contacts`);
    }

    this.clearInput();
  };

  clearInput = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;
    const { handleInput, handleSubmit } = this;
    const { buttonLabel } = this.props;

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
  }
}

const mapStateToProps = state => ({
  allContacts: contactsSelectors.getAllContacts(state),
});

const mapDispatchToProps = dispatch => ({
  addContact: contact => dispatch(contactsOperations.addContact(contact)),
  updateContact: contact => dispatch(contactsOperations.updateContact(contact)),
  fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
