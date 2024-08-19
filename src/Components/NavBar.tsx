import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="header">
      <img src="https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg" alt="logo" width={70} />
      <h1 className="title"><a href="/homepage">NASA Activities Website</a></h1>
      <nav>
        <ul className="nav-list">
          <li><a href="/earth-event-tracker" className="nav-item">Earth Natural Event Tracker</a></li>
          <li><a href="#about" className="nav-item">Space Weather</a></li>
          <li><a href="#contact" className="nav-item">Mission Information</a></li>
          <li><a href="/near-earth-objects" className='nav-item'>Near-Earth Objects</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;