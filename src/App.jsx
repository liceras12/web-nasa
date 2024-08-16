import React, { useContext } from 'react';
import Layout from './Components/Layout';
import HomePage from './Pages/HomePage';
import "./styles/style.css";

export default function App() {
  return (
    <Layout>
      <HomePage />
    </Layout>
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
