import React from 'react';
import { motion, Variants } from 'framer-motion';
import { TEAM } from '../constants';

export const Community: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="w-full bg-cream border-t-[3px] border-black py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3"
          >
             <h2 className="font-retro text-5xl md:text-6xl text-black leading-[1] mb-6">
                An Event Ran by
                <br />
                The Community,
                <br />
                <span className="text-retro-dark-orange">For The Community</span>
             </h2>
             <p className="font-sans text-base mb-8">
                This is a <span className="font-bold text-retro-pink">non-profit</span> event run by <span className="font-bold">volunteer</span> community members. At FlowFest our motivation is to lead with kindness, inclusivity, support and <span className="font-bold">FUN</span>, obvs.
             </p>
             <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-retro-yellow border-2 border-black px-6 py-3 rounded-full font-sans font-bold text-sm uppercase shadow-retro-sm hover:translate-y-1 hover:shadow-none transition-all"
             >
                Buy Tickets
             </motion.button>
          </motion.div>

          {/* Right Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-6"
          >
             {TEAM.map((member, idx) => (
                 <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    className="flex flex-col items-center group"
                 >
                    <div className="w-full aspect-square rounded-3xl border-2 border-black overflow-hidden mb-3 shadow-retro-sm group-hover:shadow-retro transition-shadow bg-gray-200">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                    </div>
                    <h3 className="font-retro text-lg">{member.name}</h3>
                 </motion.div>
             ))}
          </motion.div>
      </div>
    </div>
  );
};