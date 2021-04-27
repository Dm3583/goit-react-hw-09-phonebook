import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="Backdrop" onClick={handleBackdropClick}>
      <div className="Content">{children}</div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  children: PropTypes.node,
};

Modal.defaultProps = {
  children: null,
};

export default Modal;
