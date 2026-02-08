import React from 'react';
import { motion } from 'framer-motion';
import { SPEAKERS } from '../constants';
import Link from 'next/link';

const SpeakerCard: React.FC<{ speaker: typeof SPEAKERS[0], className?: string, index: number }> = ({ speaker, className, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -2 : 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{ y: -10, rotate: index % 2 === 0 ? 1 : -1, transition: { duration: 0.2 } }}
      className={`relative group ${className}`}
    >

        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white border border-black px-3 py-1 text-xs font-bold uppercase z-20 shadow-sm">
            {speaker.type}
        </div>

        <div className={`w-full aspect-[4/5] ${speaker.color} border-[3px] border-black rounded-xl overflow-hidden relative shadow-retro group-hover:shadow-retro-lg transition-all duration-300`}>

            <img src={speaker.image} alt={speaker.name} className="w-full h-2/3 object-cover border-b-[3px] border-black grayscale group-hover:grayscale-0 transition-all duration-300" />
            

            <div className="p-4 text-center">
                <h3 className="font-retro text-xl md:text-2xl leading-none mb-1">{speaker.name}</h3>
                <p className="font-sans text-xs md:text-sm font-bold">{speaker.role}</p>
            </div>

            
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-center items-center text-center">
                 <h3 className={`font-retro text-xl mb-2 px-1 ${speaker.type === 'Keynote' ? 'text-retro-yellow' : 'text-retro-pink'} text-stroke drop-shadow-sm`}>{speaker.name}</h3>
                 <p className="font-sans text-xs md:text-sm leading-tight">{speaker.description}</p>
            </div>
        </div>
    </motion.div>
  );
};

export const Speakers: React.FC = () => {
    return (
        <div id="speakers" className="relative w-full py-20 px-4 md:px-8 bg-cream border-t-[3px] border-black">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-0 relative">

                    <div className="lg:col-span-3 flex flex-col justify-start pt-10 relative z-10">
                        <motion.h2 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="font-retro text-5xl md:text-6xl text-black leading-[0.9] mb-4"
                        >
                            Our 2025
                            <br />
                            Speaker
                            <br />
                            <span className="text-retro-orange text-stroke text-white drop-shadow-retro">Lineup</span>
                        </motion.h2>
                        <motion.p 
                             initial={{ opacity: 0 }}
                             whileInView={{ opacity: 1 }}
                             viewport={{ once: true }}
                             transition={{ delay: 0.3 }}
                             className="font-sans text-sm md:text-base max-w-xs mt-4"
                        >
                            Yep, we got Vladdy Daddy for the keynote. Plus some absolute legends that will also be sharing the stage.
                        </motion.p>
                        <Link href="/events">
                            <motion.button 
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", delay: 0.5 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-fit mt-6 bg-retro-pink border-2 border-black px-6 py-2 rounded-full font-sans font-bold text-sm uppercase shadow-retro-sm hover:translate-y-1 hover:shadow-none transition-all"
                            >
                                Buy Tickets
                            </motion.button>
                        </Link>
                    </div>

                    <div className="lg:col-span-9 relative">
                         {/* Animated SVG Connector Lines (Desktop Only) */}
                         <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
                            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
                                <defs>
                                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feDropShadow dx="3" dy="3" stdDeviation="0" floodColor="black" />
                                    </filter>
                                </defs>
                                
                                <motion.path 
                                    d="M 50 22 C 50 40, 16.6 30, 16.6 45"
                                    fill="transparent"
                                    stroke="#FFB74D" 
                                    strokeWidth="1.5"
                                    filter="url(#glow)"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, ease: "easeInOut" }}
                                />
                                <motion.path 
                                    d="M 50 22 C 50 40, 83.3 30, 83.3 45"
                                    fill="transparent"
                                    stroke="#F48FB1" 
                                    strokeWidth="1.5"
                                    filter="url(#glow)"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, ease: "easeInOut" }}
                                />
                                <motion.path 
                                    d="M 16.6 55 C 16.6 70, 33.3 65, 33.3 78"
                                    fill="transparent"
                                    stroke="#F48FB1" 
                                    strokeWidth="1.5"
                                    filter="url(#glow)"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
                                />
                                <motion.path 
                                    d="M 83.3 55 C 83.3 70, 66.6 65, 66.6 78"
                                    fill="transparent"
                                    stroke="#FDD835" 
                                    strokeWidth="1.5"
                                    filter="url(#glow)"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
                                />
                            </svg>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-y-16 lg:gap-x-8">
                             <div className="lg:col-start-3 lg:col-span-2 relative z-10">
                                <SpeakerCard speaker={SPEAKERS[0]} index={0} />
                             </div>
                             <div className="lg:col-start-1 lg:col-span-2 lg:row-start-2 relative z-10 pt-10 lg:pt-0">
                                <SpeakerCard speaker={SPEAKERS[1]} index={1} />
                             </div>
                             
                             <div className="lg:col-start-5 lg:col-span-2 lg:row-start-2 relative z-10 pt-10 lg:pt-0">
                                <SpeakerCard speaker={SPEAKERS[2]} index={2} />
                             </div>
                             <div className="lg:col-start-2 lg:col-span-2 lg:row-start-3 relative z-10">
                                <SpeakerCard speaker={SPEAKERS[3]} index={3} />
                             </div>

                             <div className="lg:col-start-4 lg:col-span-2 lg:row-start-3 relative z-10">
                                <SpeakerCard speaker={SPEAKERS[4]} index={4} />
                             </div>
                         </div>
                    </div>

                </div>
            </div>
        </div>
    );
};