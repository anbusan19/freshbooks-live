import React from 'react';
import AnimatedLogo from './AnimatedLogo';

const LogoLoader = () => {
  return (
    <div className="logo-loader-container">
      {/* Background Bubbles */}
      <div className="loader-bubble loader-bubble-1"></div>
      <div className="loader-bubble loader-bubble-2"></div>
      <div className="loader-bubble loader-bubble-3"></div>

      {/* Logo and Tagline */}
      <div className="logo-loader">
        <div className="w-[300px]">
          <AnimatedLogo />
        </div>
        <h2 className="tagline-fade">DISCOVER THE DIFFERENCE</h2>
      </div>
    </div>
  );
};

export default LogoLoader;
