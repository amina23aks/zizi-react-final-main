import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Balloons from './components/Balloons';
import FriendGiftPage from "./Zizi"
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Balloons />
      <MainContent />
      <FriendGiftPage />
    </div>
  );
}

export default App;
