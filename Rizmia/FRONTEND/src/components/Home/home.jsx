import React from 'react';
import Nav from '../Nav/Nav';
import './home.css'; 

const Home = () => {
  return (
    <div className='home-background'>
      <Nav />
     
      <div className='title'>
        Inventory Management Dashboard
      </div>
    </div>
  );
}

export default Home;
