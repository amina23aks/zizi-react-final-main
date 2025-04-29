import React from 'react';
import GiftBox from './GiftBox';
import Cake from './Cake';
import BirthdayCard from './BirthdayCard';


function MainContent() {
  return (
    <section className="main-content">
      <div className="row-flex">
        <div className="side-block left-side">
          <GiftBox />
        </div>
        <div className="center-block">
          <Cake />
        </div>
        <div className="side-block side-right">
          <BirthdayCard />
        </div>
      </div>
    </section>
  );
}

export default MainContent;
