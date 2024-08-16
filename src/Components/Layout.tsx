import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/style.css";
import Navbar from './NavBar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    const fetchNasaImage = async () => {
      try {
        const apiKey = '5BWBVkkvcjGzJTy7M0IiWltbddqJ2Vu8gnJ2p3eh';
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&hd=true`);
        setBackgroundImage(response.data.url);
      } catch (error) {
        console.error('Error fetching NASA image of the day:', error);
      }
    };

    fetchNasaImage();
  }, []);

  return (
    <div
      className="nasa-background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};





 /* return (
    <div
    className="nasa-background"
    style={{ backgroundImage: `url(${imageUrl})` }}
  >
   

    <main className="main">
      <section className="section">
        <h2>Bienvenido a nuestra página</h2>
        <p>
          Disfruta de la imagen del día proporcionada por la NASA mientras exploras nuestra web.
        </p>
      </section>
    </main>

    
  </div>
  );
};*/

export default Layout;
