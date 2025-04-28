import React, { useState } from 'react';
import Modal from './Modal';

function Envelopes() {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <section className="envelopes-section">
      <div className="container">
        <div></div>
        <h2 className="section-title">Special Messages</h2>
        <div></div>
        <div className="envelopes">
          <div className="envelope envelope--yellow" onClick={() => openModal('wishes')}>
            <div className="envelope-flap"></div>
            <div className="envelope-content"><span>Wishes</span></div>
          </div>

          <div className="envelope envelope--blue" onClick={() => openModal('photos')}>
            <div className="envelope-flap"></div>
            <div className="envelope-content"><span>Photos</span></div>
          </div>

          <div className="envelope envelope--pink" onClick={() => openModal('surprises')}>
            <div className="envelope-flap"></div>
            <div className="envelope-content"><span>Surprises</span></div>
          </div>
        </div>
      </div>

      {/* Modal logic */}
      <Modal open={modalType === 'wishes'} onClose={closeModal}>
        <h2>Birthday Wishes 🎂</h2>
        <p>Wishing you endless happiness!</p>
      </Modal>

      <Modal open={modalType === 'photos'} onClose={closeModal}>
        <h2>Photo Memories 📷</h2>
        <p>Beautiful memories captured forever!</p>
      </Modal>

      <Modal open={modalType === 'surprises'} onClose={closeModal}>
        <h2>Special Surprises 🎁</h2>
        <p>Get ready for a big surprise!</p>
      </Modal>
    </section>
  );
}

export default Envelopes;
