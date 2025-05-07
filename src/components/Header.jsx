import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="avatar-container">
          <div className="avatar">
            <img src={process.env.PUBLIC_URL + "/assets/zizi.png"} alt="Zizi" />
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
