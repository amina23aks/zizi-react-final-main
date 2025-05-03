import React, { useState, useEffect } from 'react';
import '../BirthdayCard.css';
import cover from '../assets/cover.png'; 
import cov from '../assets/cov.png'; 

const BirthdayCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Handle window resize to maintain card proportions
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const expandCard = () => setIsExpanded(true);
  const closeCard = (e) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  return (
    <div className="card-container">
      <div
        className={`birthday-card ${isExpanded ? 'expanded' : ''}`}
        onClick={!isExpanded ? expandCard : undefined}
        style={{
          backgroundImage: `url(${cov})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: isExpanded ? null : windowSize.width < 768 ? 'translateX(0)' : null
        }}
      >
        <div className={`cover-inner ${isExpanded ? 'no-image' : 'with-blue-background'}`}>
          {/* No image inside the left anymore */}
        </div>
        <div className="cover-outer">
          <img src={cover} alt="Outer Cover" style={{ objectFit: 'cover' }} />
        </div>
      </div>

      {isExpanded && (
        <div className="overlay" onClick={closeCard}>
          <button className="close-button" onClick={closeCard}>×</button>
        </div>
      )}
    </div>
  );
};

export default BirthdayCard;