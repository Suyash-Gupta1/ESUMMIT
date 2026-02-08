import React from 'react';
import { motion as m } from 'framer-motion';
import Link from 'next/link';

const motion = m as any;

const SunBadge = () => (
    <motion.div 
        className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-20 h-20 md:w-32 md:h-32 z-20 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <path d="M50 0 L58 20 L78 12 L72 32 L92 40 L78 55 L92 70 L72 78 L58 90 L50 70 L42 90 L28 78 L22 70 L8 55 L22 40 L8 32 L28 12 L42 20 Z" 
                fill="#FFB74D" stroke="black" strokeWidth="2" />
            <circle cx="50" cy="50" r="24" fill="#FDD835" stroke="black" strokeWidth="2" />
            <circle cx="42" cy="45" r="2.5" fill="black" />
            <circle cx="58" cy="45" r="2.5" fill="black" />
            <path d="M 40 55 Q 50 65 60 55" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
        </svg>
    </motion.div>
)

export const Footer: React.FC = () => {
  return (
    <div className="w-full pt-12 md:pt-20 pb-10 px-4 overflow-hidden relative border-t-[3px] border-black">
        
        <div className="max-w-6xl mx-auto relative mb-16 md:mb-24 px-2 md:px-0">
            <div className="w-full bg-retro-pink border-[3px] border-black rounded-[2rem] md:rounded-[4rem] relative overflow-hidden shadow-retro-lg">
                
                <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
                      <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M 500 0 C 750 30 750 200 1000 250 V 0 H 500 Z" fill="#FB8C00" stroke="black" strokeWidth="3" />
                        <path d="M 350 0 C 600 50 600 250 1000 350 V 250 C 750 200 750 30 500 0 H 350 Z" fill="#FDD835" stroke="black" strokeWidth="3" />
                      </svg>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none">
                      <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M 0 350 C 250 300 350 550 650 600 H 0 V 350 Z" fill="#FB8C00" stroke="black" strokeWidth="3" />
                        <path d="M 0 200 C 300 150 400 450 750 600 H 650 C 350 550 250 300 0 350 V 200 Z" fill="#FDD835" stroke="black" strokeWidth="3" />
                      </svg>
                </div>
                
                <SunBadge />

                <div className="relative z-10 px-6 py-20 md:py-32 flex flex-col items-center text-center">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-retro text-4xl md:text-6xl lg:text-7xl text-white mb-8 leading-[1.1] max-w-4xl mx-auto drop-shadow-retro"
                        style={{ 
                            textShadow: '3px 3px 0 #000',
                            WebkitTextStroke: '1px black'
                        }}
                    >
                        Get Your Ticket for the EDC-Led Event of the Year
                    </motion.h2>
                    <motion.p 
                         initial={{ opacity: 0 }}
                         whileInView={{ opacity: 1 }}
                         viewport={{ once: true }}
                         transition={{ delay: 0.2 }}
                         className="font-sans text-white font-medium text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md px-4"
                    >
                        As web designers and developers, this is the kind of event we desperately wanted, so we created it. No stuffy conference rooms, no dull corporate halls, just a lovely community sharing knowledge with a pint and a burger in hand.
                    </motion.p>
                    <Link href="/events">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white border-2 border-black px-10 py-4 rounded-full font-bold text-black text-sm md:text-base uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 transition-all"
                        >
                            Buy Tickets
                        </motion.button>
                    </Link>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 pt-10 border-t-2 border-black/10">
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center md:text-left"
            >
                <h3 className="font-retro text-4xl md:text-5xl mb-2">See you there!</h3>
                <p className="font-sans text-sm text-gray-600">
                    Reach out to us at <a href="#" className="underline font-bold">edcnitdgp@ac.in</a>
                    <br />
                    if you have any questions.
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-md"
            >
                <div className="flex gap-2 mb-2">
                    <input type="text" placeholder="First Name" className="w-1/2 border-2 border-black rounded-lg px-4 py-2 bg-white focus:outline-none focus:shadow-retro-sm transition-shadow" />
                    <input type="email" placeholder="Email" className="w-1/2 border-2 border-black rounded-lg px-4 py-2 bg-white focus:outline-none focus:shadow-retro-sm transition-shadow" />
                </div>
                <button className="w-full bg-retro-dark-orange border-2 border-black text-white font-bold uppercase py-2 rounded-lg shadow-retro-sm hover:translate-y-1 hover:shadow-none transition-all">
                    Get updates
                </button>
            </motion.div>
        </div>
        
        <div className="flex justify-center mt-12 pb-4">
            <Link href="/admin">
                <span className="font-sans text-[10px] uppercase font-bold text-black/5 hover:text-black/50 transition-colors cursor-default">
                    Admin Panel
                </span>
            </Link>
        </div>
    </div>
  );
};