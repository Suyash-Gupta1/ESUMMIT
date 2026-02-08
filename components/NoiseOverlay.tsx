import React from 'react';

export const NoiseOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.2] mix-blend-multiply overflow-hidden">
      <svg 
        className="w-[110%] h-[110%] absolute -top-[5%] -left-[5%] animate-noise"
      >
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.65" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
          <feComponentTransfer>
            <feFuncR type="discrete" tableValues="0 1" />
            <feFuncG type="discrete" tableValues="0 1" />
            <feFuncB type="discrete" tableValues="0 1" />
          </feComponentTransfer>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};