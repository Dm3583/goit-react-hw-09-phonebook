import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './ListItem.scss';
import { Button } from 'react-bootstrap';

function ListItem({ setContactId, toggleModal, contact, deleteContact }) {
  const updateContactInModal = useCallback(
    id => {
      setContactId(id);
      toggleModal();
    },
    [setContactId, toggleModal],
  );

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
            updateContactInModal(id);
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
