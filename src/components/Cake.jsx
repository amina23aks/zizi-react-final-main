import React, { useState } from 'react';
import cakeImg from '../assets/cakeZZ.png';
import '../Cake.css';

function Cake() {
  const [litCandles, setLitCandles] = useState([true, true, true]);

  const toggleFlame = (index) => {
    const newLit = [...litCandles];
    newLit[index] = !newLit[index];
    setLitCandles(newLit);
  };

  const candleClasses = ['candle-left', 'candle-middle', 'candle-right'];
  
  // Keep the original desktop positions
  const getCandlePosition = (index) => {
    // Base positions for desktop - keep them exactly as you had them
    const desktopPositions = [
      { left: '164px' },  // Left candle
      { left: '216px' },  // Middle candle
      { left: '268px' }   // Right candle
    ];
    
    return desktopPositions[index];
  };

  return (
    <div className="cake-container">
      <img src={cakeImg} alt="Birthday Cake" className="cake-image" />
      
      {litCandles.map((isLit, i) => (
        <div
          key={i}
          className={`candle ${candleClasses[i]}`}
          style={getCandlePosition(i)}
          onClick={() => toggleFlame(i)}
        >
          <div className="wick"></div>
          {isLit && <div className="flame"></div>}
        </div>
      ))}
    </div>
  );
}

export default Cake;