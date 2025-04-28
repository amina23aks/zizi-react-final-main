import React from 'react';
import GiftBox from './GiftBox';
import Cake from './Cake';
import BirthdayCard from './BirthdayCard';
function MainContent() {
  return (
    <section className="main-content">
      <div className="container">
        <GiftBox />
        <Cake />
        <BirthdayCard />
    </div>
    </section>
  );
}

export default MainContent;
