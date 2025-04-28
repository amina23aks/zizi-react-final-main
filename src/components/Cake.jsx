import React, { useState } from 'react';

function Cake() {
  const [blown, setBlown] = useState(false);

  const handleCakeClick = () => {
    setBlown(true);
  };

  return (
    <div className="cake-container">
      <div className="cake" onClick={handleCakeClick}>
        <div className="cake-top"></div>
        <div className="cake-middle"></div>
        <div className="cake-bottom"></div>
        <div className="candle">
          {!blown && <div className="flame"></div>}
        </div>
      </div>
    </div>
  );
}

export default Cake;
