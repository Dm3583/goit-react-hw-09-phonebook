import React, { useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './Filter.scss';
import { contactsSelectors, contactsActions } from '../../redux/phonebook';

const Filter = () => {
  const dispatch = useDispatch();

  const value = useSelector(contactsSelectors.getFilter);

  const onChange = useCallback(
    e => dispatch(contactsActions.changeFilter(e.target.value)),
    [dispatch, value],
  );

  return (
    <label>
      <p>Find contacts by name</p>
      <input
        className="Filter__input"
        type="text"
        onChange={onChange}
        name="filter"
        value={value}
      />
    </label>
  );
};

export default Filter;
