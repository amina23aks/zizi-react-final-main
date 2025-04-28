import React from 'react';
import GiftBox from './GiftBox';
import Cake from './Cake';
import Card from './Card';
import Envelopes from './Envelopes';

function MainContent() {
  return (
    <section className="main-content">
      <div className="container">
        <GiftBox />
        <Cake />
        <Card />
        <Envelopes />
      </div>
    </section>
  );
}

export default MainContent;
