import React from 'react';

const Navbar: React.FC = () => {
  return (
    <header className="header">
      <h1 className="title">NASA Activities Website</h1>
      <nav>
        <ul className="nav-list">
          <li><a href="#home" className="nav-item">Earth Natural Event Tracker</a></li>
          <li><a href="#about" className="nav-item">Space Weather</a></li>
          <li><a href="#contact" className="nav-item">Mission Information</a></li>
          <li><a href="" className='nav-item'>Near-Earth Objects</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;