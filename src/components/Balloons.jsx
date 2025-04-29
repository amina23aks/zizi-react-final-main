import React from 'react';
import { useWindowSize } from '@react-hook/window-size';
import Confetti from 'react-confetti';
import b1 from '../assets/b1.png';
import b2 from '../assets/b2.png';
import b3 from '../assets/b3.png';
import b4 from '../assets/b4.png';
import ziziball from '../assets/ziziball.png'; // أو ziziball.png
import "../styles.css";

function Balloons() {
  const [width, height] = useWindowSize();

  return (
    <div className="balloons-wrapper" style={{ position: "relative", overflow: "hidden" }}>
      {/* Confetti inside balloons section only */}
      <Confetti
        width={width}
        height={height}
        numberOfPieces={150}
        recycle={true}
        gravity={0.03}
        style={{ position: 'absolute', top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />

      <div className="center-zizi">
        <img src={ziziball} alt="Happy Birthday Zizi" />
      </div>

      <img src={b1} className="balloon balloon1" alt="Balloon 1" />
      <img src={b2} className="balloon balloon2" alt="Balloon 2" />
      <img src={b3} className="balloon balloon3" alt="Balloon 3" />
      <img src={b4} className="balloon balloon4" alt="Balloon 4" />
      <img src={b1} className="balloon balloon5" alt="Balloon 5" />
      <img src={b2} className="balloon balloon6" alt="Balloon 6" />
      <img src={b3} className="balloon balloon7" alt="Balloon 7" />
      <img src={b4} className="balloon balloon8" alt="Balloon 8" />
      <img src={b1} className="balloon balloon9" alt="Balloon 9" />
      <img src={b2} className="balloon balloon10" alt="Balloon 10" />
      <img src={b3} className="balloon balloon11" alt="Balloon 11" />
      <img src={b4} className="balloon balloon12" alt="Balloon 12" />
    </div>
  );
}

export default Balloons;
