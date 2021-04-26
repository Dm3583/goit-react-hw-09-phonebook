import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static defaultProps = {
    children: null,
  };

  static propTypes = {
    children: PropTypes.node,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.ocClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Backdrop" onClick={this.handleBackdropClick}>
        <div className="Content">{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
