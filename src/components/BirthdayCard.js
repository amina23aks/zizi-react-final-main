import React, { useState } from 'react';
import '../BirthdayCard.css';
import cover from '../assets/cover.PNG'; 
import cov from '../assets/cov.jpg'; 

const BirthdayCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const expandCard = () => setIsExpanded(true);
  const closeCard = () => setIsExpanded(false);

  return (
    <div className="card-wrapper">
      <div
        className={`birthday-card ${isExpanded ? 'expanded' : ''}`}
        onClick={!isExpanded ? expandCard : undefined}
        style={{
          backgroundImage: `url(${cover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={`cover-inner ${isExpanded ? 'no-image' : 'with-blue-background'}`}>
          {/* No image inside the left anymore */}
        </div>
        <div className="cover-outer">
          <img src={cov} alt="Outer Cover" />
        </div>
      </div>

      {isExpanded && (
        <div className="overlay" onClick={closeCard}></div>
      )}
    </div>
  );
};

export default BirthdayCard;
