import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import { HERO_IMAGES } from '../constants';

const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;

export const CardStack: React.FC = () => {
  const [cards, setCards] = useState(HERO_IMAGES);

  const moveToEnd = (fromIndex: number) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      const item = newCards.splice(fromIndex, 1)[0];
      newCards.push(item);
      return newCards;
    });
  };

  const handleShuffle = () => {
    // Only shuffle if there are cards
    if (cards.length > 0) {
      moveToEnd(0);
    }
  };

  return (
    <div className="relative w-[320px] h-[280px] md:w-[650px] md:h-[450px] mx-auto mt-8 md:mt-16 perspective-1000">
      {/* The Cards */}
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="popLayout">
            {cards.map((card, index) => {
                // We only render the first 3 cards to DOM to keep it clean, 
                // but let's render all for smooth transitions, just hide deeply nested ones visually if needed.
                // Actually, rendering all is fine for this amount.
                
                const isFront = index === 0;
                
                return (
                    <motion.div
                        key={card.id}
                        layout
                        initial={false}
                        animate={{
                            scale: 1 - index * SCALE_FACTOR,
                            y: index * CARD_OFFSET,
                            rotate: isFront ? 0 : (index % 2 === 0 ? 2 : -2), // Slight jiggle for stack effect
                            zIndex: cards.length - index,
                        }}
                        exit={{
                             x: 200, 
                             opacity: 0, 
                             rotate: 20,
                             transition: { duration: 0.4 } 
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20
                        }}
                        className={`absolute top-0 w-[300px] h-[260px] md:w-[600px] md:h-[400px] bg-white border-[3px] border-black rounded-3xl overflow-hidden shadow-retro origin-bottom`}
                        style={{
                            // Fix for Safari 3D rendering issues
                            WebkitBackfaceVisibility: 'hidden',
                        }}
                    >
                        <img 
                            src={card.src} 
                            alt={card.alt} 
                            className="w-full h-full object-cover pointer-events-none"
                        />
                        
                        {/* Overlay for depth on cards behind */}
                        {index > 0 && (
                            <div className="absolute inset-0 bg-cream/20" />
                        )}

                        {/* Shuffle Button - Only on top card */}
                        {isFront && (
                           <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleShuffle();
                                }}
                                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white border-2 border-black px-4 py-2 rounded-full flex items-center gap-2 shadow-retro-sm z-20 cursor-pointer hover:bg-gray-50 transition-colors"
                           >
                                <Shuffle className="w-4 h-4" />
                                <span className="font-bold text-sm font-sans">Shuffle</span>
                           </motion.button>
                        )}
                    </motion.div>
                );
            })}
        </AnimatePresence>
      </div>
    </div>
  );
};