import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Twitter } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <div className="w-full bg-cream border-t-[3px] border-black py-20 px-4 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-10">
         <span className="font-retro text-[15vw] leading-none">E-Summit'2026</span>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
         <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {TESTIMONIALS.map((t, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="break-inside-avoid bg-white border-2 border-black rounded-xl p-6 shadow-retro hover:shadow-retro-lg transition-shadow"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full border border-black object-cover" />
                            <div>
                                <h4 className="font-bold text-sm">{t.name}</h4>
                                <span className="text-gray-500 text-xs">{t.handle}</span>
                            </div>
                        </div>
                        <Twitter className="w-5 h-5 text-blue-400 fill-current" />
                    </div>
                    <p className="font-sans text-sm md:text-base mb-4 leading-relaxed">
                        {t.text}
                    </p>
                    <div className="text-gray-400 text-xs font-bold uppercase">
                        {t.date}
                    </div>
                </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
};