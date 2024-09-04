import React from "react";
import "../styles/style.css";
import Navbar from "./NavBar";
import Footer from "./Footer";
import Home from "./Home";
import useNasaImage from "../hooks/useNasaImage";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { backgroundImage, loading, error } = useNasaImage();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="general">
      <div className="nasa-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Navbar />
        <Home />
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