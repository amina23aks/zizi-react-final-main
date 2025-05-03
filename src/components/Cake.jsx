import React, { useState } from 'react';
import cakeImg from '../assets/cake-with-cream.png';
import '../Cake.css';

function Cake() {
  const [litCandles, setLitCandles] = useState([true, true, true]);

  const toggleFlame = (index) => {
    const newLit = [...litCandles];
    newLit[index] = !newLit[index];
    setLitCandles(newLit);
  };

  const candleClasses = ['candle-left', 'candle-middle', 'candle-right'];

  return (
    <div className="cake-container">
      <img src={cakeImg} alt="Birthday Cake" className="cake-image" />
      {litCandles.map((isLit, i) => (
        <div
          key={i}
          className={`candle ${candleClasses[i]}`}
          style={{ left: `${170 + i * 53}px` }}
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
