import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ListItem.scss';
import { Button } from 'react-bootstrap';

class ListItem extends Component {
  updateContactInModal = id => {
    this.props.setContactId(id);
    this.props.toggleModal();
  };

  render() {
    const { contact, deleteContact } = this.props;
    const { id, name, number } = contact;
    return (
      <li className="ListItem">
        <span>
          {name}: {number}
        </span>
        <div>
          <Button
            variant="secondary"
            className="ListItem__button"
            type="button"
            onClick={() => {
              this.updateContactInModal(id);
            }}
          >
            Update
          </Button>
          <Button
            variant="danger"
            className="ListItem__button"
            type="button"
            onClick={() => deleteContact(id)}
          >
            Delete
          </Button>
        </div>
      </li>
    );
  }
}

ListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  deleteContact: PropTypes.func.isRequired,
  setContactId: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ListItem;
