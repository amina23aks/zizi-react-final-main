import React, { useRef } from 'react';
import { useWindowSize } from '@react-hook/window-size';
import Confetti from 'react-confetti';
import b1 from '../assets/b1.png';
import b2 from '../assets/b2.png';
import b3 from '../assets/b3.png';
import b4 from '../assets/b4.png';
import ziziball from '../assets/ziziball.png';
import "../styles.css";

function Balloons() {
  const [width, height] = useWindowSize();
  const audioRef = useRef(new Audio("/sing1.m4a"));

  const handleBalloonClick = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    audio.play().catch(err => console.error("Audio play failed:", err));
  };

  const balloonImages = [b1, b2, b3, b4, b1, b2, b3, b4, b1, b2, b3, b4];

  return (
    <div
      className="balloons-wrapper"
      style={{
        background: 'linear-gradient(to bottom, #ffffff, #dfdbb8)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Confetti
        width={width}
        height={height}
        numberOfPieces={150}
        recycle={true}
        gravity={0.03}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none"
        }}
      />

      <div className="center-zizi">
        <img src={ziziball} alt="Happy Birthday Zizi" />
      </div>

      {balloonImages.map((img, index) => (
        <img
          key={index}
          src={img}
          className={`balloon balloon${index + 1}`}
          alt={`Balloon ${index + 1}`}
          onClick={handleBalloonClick}
          style={{ cursor: "pointer" }}
        />
      ))}
    </div>
  );
}

export default Balloons;
