import React from 'react';

const LogoLoader = () => {
  return (
    <div className="logo-loader-container">
      <div className="logo-loader">
        <img 
          src="/freshbooks-logo.svg" 
          alt="Freshbooks Logo" 
          className="logo-fade"
        />
        <p className="tagline-fade">DISCOVER THE DIFFERENCE</p>
      </div>
    </div>
  );
};

export default LogoLoader;
