import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '../constants';
import { Plus, X } from 'lucide-react';
import Link from 'next/link';

const RotatingCube: React.FC = () => {
    return (
        <div className="w-full h-[400px] flex flex-col items-center justify-center relative perspective-1000">
            <motion.div
                animate={{ 
                    rotateY: [0, 360],
                    rotateX: [10, -10, 10],
                    y: [-20, 20, -20]
                }}
                transition={{
                    rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                    rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative w-48 h-48"
            >
                <div className="absolute inset-0 border-4 border-black bg-retro-yellow flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]" 
                     style={{ transform: 'translateZ(96px)' }}>
                     <span className="font-retro text-8xl text-black">?</span>
                </div>
                <div className="absolute inset-0 border-4 border-black bg-retro-pink flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]" 
                     style={{ transform: 'rotateY(180deg) translateZ(96px)' }}>
                     <span className="font-retro text-8xl text-white text-stroke">?</span>
                </div>
                <div className="absolute inset-0 border-4 border-black bg-retro-orange flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]" 
                     style={{ transform: 'rotateY(90deg) translateZ(96px)' }}>
                     <div className="w-12 h-12 bg-black rounded-full"></div>
                </div>
                <div className="absolute inset-0 border-4 border-black bg-retro-orange flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]" 
                     style={{ transform: 'rotateY(-90deg) translateZ(96px)' }}>
                     <div className="w-12 h-12 bg-black rounded-full"></div>
                </div>
                <div className="absolute inset-0 border-4 border-black bg-white" 
                     style={{ transform: 'rotateX(90deg) translateZ(96px)' }}></div>
                <div className="absolute inset-0 border-4 border-black bg-black" 
                     style={{ transform: 'rotateX(-90deg) translateZ(96px)' }}></div>
            </motion.div>
            
             <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 w-32 h-8 bg-black/20 rounded-[100%] blur-md"
             />
        </div>
    );
};

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full bg-cream border-t-[3px] border-black py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        
        <div className="lg:w-1/3">
             <motion.div
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6 }}
             >
                <h2 className="font-retro text-5xl md:text-6xl mb-6 relative inline-block">
                    Frequently Asked
                    <span className="block text-retro-orange text-stroke text-white drop-shadow-retro -rotate-2 mt-2">Questions</span>
                </h2>
             </motion.div>
             
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8 hidden lg:block"
             >
                <RotatingCube />
             </motion.div>
        </div>

        <div className="lg:w-2/3 flex flex-col gap-4">
            {FAQS.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                    <motion.div 
                        key={index} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                    >
                        <button 
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className={`w-full text-left flex items-center justify-between p-6 border-2 border-black rounded-xl transition-all ${isOpen ? 'bg-retro-orange shadow-retro' : 'bg-retro-yellow hover:bg-retro-orange/50'}`}
                        >
                            <span className="font-bold font-sans text-lg">{faq.question}</span>
                            {isOpen ? <X className="w-6 h-6 border-2 border-black rounded-full p-1 bg-white" /> : <Plus className="w-6 h-6 border-2 border-black rounded-full p-1 bg-white" />}
                        </button>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-6 bg-white border-x-2 border-b-2 border-black rounded-b-xl -mt-2 pt-8">
                                        <p className="text-gray-800 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                        {index === 0 && (
                                            <Link href="/events">
                                                <button className="mt-4 bg-retro-pink border border-black px-4 py-2 rounded-full text-xs font-bold uppercase hover:shadow-md transition-all">
                                                    Buy Tickets
                                                </button>
                                            </Link>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )
            })}
        </div>

      </div>
    </div>
  );
};