import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/style.css";
import Navbar from "./NavBar";
import Footer from "./Footer";
import Home from "./Home";

const Layout = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  const fetchNasaImage = async (retries = 3, delay = 1000) => {
    const apiKey = "mS1gpSObMBiGi6sQHUJYYyGCdGEeV3Pwvwakq0lY";
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&hd=true`
      );
      const imageUrl = response.data.url;
      const today = new Date().toISOString().split("T")[0];

      localStorage.setItem("nasaImage", imageUrl);
      localStorage.setItem("nasaImageDate", today);
      setBackgroundImage(imageUrl);
    } catch (error) {
      if (retries > 0 && error.response && error.response.status === 429) {
        console.warn(`Retrying in ${delay}ms...`);
        setTimeout(() => fetchNasaImage(retries - 1, delay * 2), delay);
      } else {
        console.error("Error fetching NASA image of the day:", error);
      }
    }
  };

  useEffect(() => {
    const cachedImage = localStorage.getItem("nasaImage");
    const cachedDate = localStorage.getItem("nasaImageDate");
    const today = new Date().toISOString().split("T")[0];

    if (cachedImage && cachedDate === today) {
      setBackgroundImage(cachedImage);
    } else {
      fetchNasaImage();
    }
  }, []);

  return (
    <div className="general">
      <div className="nasa-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Navbar />
        <Home/>
      </div>
      <div className="content">
      <img
          src="https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg" 
          alt="NASA Watermark"
          className="nasa-watermark"
        />
        <main>{children}</main>
      </div>
        <Footer />
    </div>
  );
};

export default Layout;
