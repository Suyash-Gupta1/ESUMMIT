import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACTIVITIES } from '../constants';

export const Activities: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <div className="w-full bg-cream border-t-[3px] border-black py-20 px-4">
            <div id="activities" className="w-full bg-cream py-12 md:py-24 px-4 flex justify-center">

            <div className="w-full max-w-8xl h-[500px] md:h-[600px] flex border-[3px] border-black rounded-[2rem] md:rounded-[3rem] overflow-hidden relative shadow-retro-lg bg-white">

                <div className="w-20 md:w-32 lg:w-40 bg-black border-r-[3px] border-black flex items-center justify-center shrink-0 relative z-20">
                     <h2 className="font-retro text-3xl md:text-5xl lg:text-6xl text-white whitespace-nowrap -rotate-90 tracking-widest leading-none select-none">
                        What to Expect
                     </h2>
                </div>
                <div className="flex-1 flex flex-col relative z-10">
                    {ACTIVITIES.map((activity, index) => (
                        <motion.div 
                            key={index}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                            className={`flex-1 flex items-center justify-start pl-6 md:pl-12 lg:pl-16 border-b-[3px] border-black last:border-b-0 cursor-pointer transition-all duration-300 relative overflow-hidden ${activity.color}`}
                        >
                            {/* Hover Overlay for darkening effect */}
                            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-200" />
                            
                            <span className="font-retro text-xl md:text-4xl lg:text-5xl text-white text-stroke drop-shadow-retro z-10 pointer-events-none select-none">
                                {activity.title}
                            </span>
                        </motion.div>
                    ))}
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none w-56 h-56 md:w-80 md:h-80 lg:w-96 lg:h-96">
                    <AnimatePresence mode="wait">
                        {activeIndex !== null && (
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                                animate={{ opacity: 1, scale: 1, rotate: -5 }}
                                exit={{ opacity: 0, scale: 0.5, rotate: 15 }}
                                transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
                                className="w-full h-full p-2"
                            >
                                <div className="w-full h-full bg-cream border-[3px] border-black rounded-[2rem] overflow-hidden shadow-retro-lg relative">
                                    <img 
                                        src={ACTIVITIES[activeIndex].image} 
                                        alt={ACTIVITIES[activeIndex].title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Inner shadow/border effect */}
                                    <div className="absolute inset-0 border-4 border-black/10 rounded-[2rem] pointer-events-none"></div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            </div>
        </div>
    );
};
