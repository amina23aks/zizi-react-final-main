import React, { useState, useEffect } from 'react';
import '../BirthdayCard.css';

const BirthdayCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

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
          backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/cov.png"})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div
          className={`cover-inner ${isExpanded ? 'no-image' : 'with-blue-background'}`}
          style={
            isExpanded
              ? {
                  backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/Cove2.jpg"})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }
              : {}
          }
        >
          {/* Inner cover */}
        </div>
        <div className="cover-outer">
          <img
            src={process.env.PUBLIC_URL + "/assets/cover.png"}
            alt="Outer Cover"
            style={{ objectFit: 'cover' }}
          />
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