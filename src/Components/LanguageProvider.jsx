import React, { useState } from "react";
import LanguageContext from "../Context/Context";

function LanguageProvider({ children }) {
  const languages = ['JavaScript', 'Python', 'C++', 'C#'];
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  const toggleLanguage = () => {
    setCurrentLanguage((prevLanguage) => {
      const currentIndex = languages.indexOf(prevLanguage);
      const nextIndex = (currentIndex + 1) % languages.length;
      return languages[nextIndex];
    });
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
