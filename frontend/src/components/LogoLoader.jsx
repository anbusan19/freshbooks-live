import React from 'react';
import logo from '../assets/freshbooks-navbar-logo.png';

const LogoLoader = () => {
  return (
    <div className="logo-loader-container">
      {/* Background Bubbles */}
      <div className="loader-bubble loader-bubble-1"></div>
      <div className="loader-bubble loader-bubble-2"></div>
      <div className="loader-bubble loader-bubble-3"></div>

      {/* Logo and Tagline */}
      <div className="logo-loader">
        <img src={logo} alt="Freshbooks" className="logo-fade" />
        <h2 className="tagline-fade">DISCOVER THE DIFFERENCE</h2>
      </div>
    </div>
  );
};

export default LogoLoader;
