import React from 'react';

function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
}

export default Modal;
