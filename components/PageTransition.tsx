import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const RETRO_COLORS = ["#F48FB1", "#FFB74D", "#FDD835", "#FB8C00"];

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full"
      >
        {children}
      </motion.div>
      <div className="fixed inset-0 pointer-events-none z-[999] flex flex-col">
        {RETRO_COLORS.map((color, i) => (
          <motion.div
            key={color}
            className="w-full flex-1 relative"
            style={{ 
              backgroundColor: color, 
              originX: i % 2 === 0 ? 0 : 1 
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: [0, 1, 1, 0] }}
            transition={{
              duration: 1.1,
              times: [0, 0.4, 0.6, 1],
              ease: [0.87, 0, 0.13, 1],
              delay: i * 0.08,
            }}
          />
        ))}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0 }} // THIS KEEPS IT FROM BEING "GLUED" TO THE SCREEN
          exit={{ 
            opacity: [0, 1, 1, 0], 
            scale: [0.8, 1.1, 1, 1.2],
          }}
          transition={{
            duration: 1.1,
            times: [0, 0.3, 0.7, 1],
            ease: "easeInOut",
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span 
            className="font-retro text-6xl md:text-8xl text-black uppercase tracking-tighter"
            style={{ 
              color: 'black',
              WebkitTextStroke: '12px #FDF8E5',
              paintOrder: 'stroke fill',
              filter: 'drop-shadow(0px 10px 0px rgba(0,0,0,0.2))'
            }}
          >
            ESUMMIT '26
          </span>
        </motion.div>
      </div>
    </>
  );
};