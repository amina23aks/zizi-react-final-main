import React, { useState } from 'react';
import Modal from './Modal';

function Card() {
  const [open, setOpen] = useState(false);

  return (
    <div className="card-container">
      <div className="card" onClick={() => setOpen(true)}>
        <div className="card-front">
          <p>From Bleuzz to Zizi</p>
        </div>
        <div className="card-inside">
          <p>Wishing you a very happy birthday filled with love and laughter!</p>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="card-message">
          <h2>Dear Zizi,</h2>
          <p>Wishing you joy and happiness on your special day. You are amazing!</p>
          <p className="signature">- From Bleuzz</p>
        </div>
      </Modal>
    </div>
  );
}

export default Card;
