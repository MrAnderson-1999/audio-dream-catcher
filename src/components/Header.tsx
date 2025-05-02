
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex items-center justify-center mt-6 mb-8">
      <div className="flex items-center">
        <div className="mr-3 relative">
          <div className="audio-wave">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <h1 className={`bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent ${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'}`}>
          Audio Dream Catcher
        </h1>
      </div>
    </div>
  );
};

export default Header;
