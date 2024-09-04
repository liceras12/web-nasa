import React, { useContext } from 'react';
import Layout from './Components/Layout';
import HomePage from './Pages/HomePage';
import "./styles/style.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EarthEventTracker from './Pages/EarthEventTracker';
import NearEarthObject from './Pages/NearEarthObject';
import SpaceWeather from './Pages/SpaceWeather';
import MissionInformation from './Pages/MissionInformation';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/earth-event-tracker" element={<EarthEventTracker />} />
          <Route path="/near-earth-object" element={<NearEarthObject />} />
          <Route path="/space-weather" element={<SpaceWeather />} />
          <Route path="/mission-information" element={<MissionInformation />} />
        </Routes>
      </Layout>
    </Router>
  );
}

/*function MainSection() {
  const { currentLanguage, toggleLanguage } = useContext(LanguageContext);

  return (
    <div>
      <p id="favoriteLanguage">
        Favorite programming language: {currentLanguage}
      </p>
      <button id="changeFavorite" onClick={toggleLanguage}>
        Toggle language
      </button>
    </div>
  );
}*/
