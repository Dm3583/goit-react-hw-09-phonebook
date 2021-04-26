import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Filter.scss';
import { contactsSelectors, contactsActions } from '../../redux/phonebook';

const Filter = ({ value, onChange }) => {
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

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  value: contactsSelectors.getFilter(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(contactsActions.changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
