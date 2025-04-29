import React from 'react';
import avatar from '../assets/zizi.png'; // Make sure zizi.png is in src/assets/

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="avatar-container">
          <div className="avatar">
            <img src={avatar} alt="Zizi" />
            <span className="avatar-name">Zizi</span>
          </div>
        </div>
        <div className="header-content">
          <h1 className="title">Happy Birthday</h1>
          <p className="subtitle">On this special day, a beautiful soul was born</p>
        </div>
      </div>

    </header>
  );
}

export default Header;
