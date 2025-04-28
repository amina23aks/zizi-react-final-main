import React from 'react';

function Flower() {
  return (
    <div className="flowers">
      <div className="flower">
        <div className="flower__leafs">
          <div className="flower__leaf flower__leaf--1"></div>
          <div className="flower__leaf flower__leaf--2"></div>
          <div className="flower__leaf flower__leaf--3"></div>
          <div className="flower__leaf flower__leaf--4"></div>
          <div className="flower__white-circle"></div>
        </div>
        <div className="flower__line">
          <div className="flower__line__leaf flower__line__leaf--1"></div>
          <div className="flower__line__leaf flower__line__leaf--2"></div>
          <div className="flower__line__leaf flower__line__leaf--3"></div>
        </div>
      </div>
    </div>
  );
}

export default Flower;
