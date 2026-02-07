import React from 'react';
import { motion } from 'framer-motion';
import { SPONSORS } from '../constants';
import { Sparkle } from 'lucide-react';

export const Marquee: React.FC = () => {
  return (
    <div className="w-full bg-retro-orange border-t-[3px] border-black py-4 overflow-hidden absolute bottom-0 left-0 z-50">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex items-center gap-8 px-4"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          {/* Repeat the list multiple times to ensure seamless loop */}
          {[...SPONSORS, ...SPONSORS, ...SPONSORS, ...SPONSORS].map((sponsor, idx) => (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-xl md:text-2xl uppercase tracking-wider font-sans drop-shadow-sm">
                  Sponsored by
                </span>
                <span className="text-white font-retro text-2xl md:text-3xl text-stroke drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  {sponsor}
                </span>
              </div>
              <Sparkle className="w-6 h-6 text-white fill-white stroke-black stroke-2" />
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};