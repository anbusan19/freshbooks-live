import React from 'react';
import AnimatedLogo from './AnimatedLogo';

const LogoLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      {/* Logo */}
      <div className="w-[300px]">
        <AnimatedLogo />
      </div>
    </div>
  );
};

export default LogoLoader;
