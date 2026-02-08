// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

// --- DATA ---
// FIX 1: Reduced image resolution (w=500) for faster loading and rendering
const CARDS = [
  {
    id: 1,
    label: "MEMORIES '25",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=500&auto=format&fit=crop", 
  },
  {
    id: 2,
    label: "NETWORKING",
    image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=500&auto=format&fit=crop", 
  },
  {
    id: 3,
    label: "INNOVATION",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=500&auto=format&fit=crop", 
  },
  {
    id: 4,
    label: "LEADERSHIP",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=500&auto=format&fit=crop", 
  },
  {
    id: 5,
    label: "CULTURE",
    image: "https://images.unsplash.com/photo-1524601500432-1e1a4c71d692?q=80&w=500&auto=format&fit=crop", 
  }
];

const Hero: React.FC = () => {
  const [cards, setCards] = useState(CARDS);
  const [isMobile, setIsMobile] = useState(false);

  // FIX 2: Detect mobile device to disable heavy effects
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const moveToEnd = (fromIndex: number) => {
    setCards((currentCards) => {
      const newCards = [...currentCards];
      const movedItem = newCards.splice(fromIndex, 1)[0];
      newCards.push(movedItem);
      return newCards;
    });
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FCF7E4] text-[#1a1a1a] font-serif overflow-x-hidden selection:bg-[#c25e5e] selection:text-white flex flex-col items-center">
      
      {/* --- BACKGROUND TEXTURES --- */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(#8c8c8c 1px, transparent 1px), linear-gradient(90deg, #8c8c8c 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />
      {/* FIX 3: Disable noise texture on mobile (heavy on GPU) */}
      <div className="hidden md:block absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.1)_100%)]" />

      {/* --- SIDE STRIPES (Hidden on Mobile) --- */}
      <div className="hidden md:block fixed top-0 left-0 h-full w-2 md:w-3 bg-[#e0a82e] border-r-2 border-[#2a2a2a] z-40"></div>
      <div className="hidden md:block fixed top-0 left-2 md:left-3 h-full w-2 md:w-3 bg-[#c25e5e] border-r-2 border-[#2a2a2a] z-40"></div>
      <div className="hidden md:block fixed top-0 right-0 h-full w-2 md:w-3 bg-[#c25e5e] border-l-2 border-[#2a2a2a] z-40"></div>
      <div className="hidden md:block fixed top-0 right-2 md:right-3 h-full w-2 md:w-3 bg-[#e0a82e] border-l-2 border-[#2a2a2a] z-40"></div>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-10 flex flex-col items-center w-full max-w-[1400px] px-6 md:px-16 pt-20 md:pt-24 pb-12 md:pb-12">
        
        {/* HEADER WRAPPER */}
        <div className="flex flex-col items-center w-full mb-8 md:mb-12">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="order-2 md:order-1 mt-6 md:mt-0 bg-[#2a2a2a] text-[#FCF7E4] px-6 py-2 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs shadow-lg border border-[#2a2a2a]"
            >
              Curating the Continuum • 2026
            </motion.div>

            <div className="order-1 md:order-2 relative text-center w-full mt-0 md:mt-8">
                <h1 className="relative font-black text-[13vw] md:text-8xl lg:text-[10rem] leading-none tracking-tight text-[#FCF7E4] select-none z-10 whitespace-nowrap"
                    style={{ 
                      WebkitTextStroke: '1.5px #1a1a1a', 
                      filter: 'drop-shadow(4px 4px 0px rgba(26,26,26,1))'
                    }}>
                  ESUMMIT'26
                </h1>
            </div>
        </div>

        {/* --- CENTRAL LAYOUT --- */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center mt-2">
          
          {/* LEFT */}
          <div className="hidden lg:flex lg:col-span-3 flex-col items-start pl-12">
            <h2 className="text-6xl font-serif font-bold text-[#e0a82e] mb-2 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">01.</h2>
            <p className="font-bold text-sm uppercase leading-relaxed tracking-widest text-[#4a3b2a]">
              NIT Durgapur's<br/>Premier<br/>Business Experience
            </p>
          </div>

          {/* CENTER: CARDS */}
          <div className="col-span-1 lg:col-span-6 flex justify-center relative h-[300px] md:h-[400px] items-center perspective-1000 z-20">
             <div className="relative w-full h-full flex items-center justify-center">
                 <AnimatePresence>
                   {cards.map((card, index) => {
                     if (index > 3) return null;
                     const isTop = index === 0;
                     
                     let rotateVal = 0;
                     let xVal = 0;
                     let yVal = 0;
                     let scaleVal = 1 - index * 0.05;

                     // Tighter spread on mobile
                     if (index === 1) { rotateVal = -6; xVal = isMobile ? -15 : -40; yVal = 10; }
                     if (index === 2) { rotateVal = 6; xVal = isMobile ? 15 : 40; yVal = 10; }
                     if (index === 3) { rotateVal = 0; yVal = -20; scaleVal = 0.9; }

                     return (
                       <Card 
                         key={card.id} 
                         data={card} 
                         index={index} 
                         isTop={isTop}
                         customStyle={{ x: xVal, y: yVal, rotate: rotateVal, scale: scaleVal }}
                         onSwipe={() => moveToEnd(0)}
                         isMobile={isMobile}
                       />
                     );
                   })}
                 </AnimatePresence>
             </div>
          </div>

          {/* RIGHT */}
          <div className="hidden lg:flex lg:col-span-3 flex-col items-end pr-12 text-right">
            <h2 className="text-6xl font-serif font-bold text-[#c25e5e] mb-2 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">08.08</h2>
            <p className="font-bold text-sm uppercase leading-relaxed tracking-widest text-[#4a3b2a]">
              Friday • August 8th<br/>West Bengal<br/>India
            </p>
          </div>
        </div>

        {/* --- MOBILE INFO ROW --- */}
        <div className="flex lg:hidden w-full justify-between items-start mt-8 px-2">
            <div className="text-left">
                <h2 className="text-4xl font-serif font-bold text-[#e0a82e] mb-1 drop-shadow-[1px_1px_0px_rgba(0,0,0,0.5)]">01.</h2>
                <p className="font-bold text-[10px] uppercase leading-relaxed tracking-widest text-[#4a3b2a]">
                  Premier<br/>Business<br/>Experience
                </p>
            </div>
            <div className="text-right">
                <h2 className="text-4xl font-serif font-bold text-[#c25e5e] mb-1 drop-shadow-[1px_1px_0px_rgba(0,0,0,0.5)]">08.08</h2>
                <p className="font-bold text-[10px] uppercase leading-relaxed tracking-widest text-[#4a3b2a]">
                  August 8th<br/>West Bengal<br/>India
                </p>
            </div>
        </div>

        {/* --- REGISTER BUTTON --- */}
        <div className="mt-12 lg:mt-4 relative z-30 mb-8 md:mb-0">
          <Link href="/events">
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-[#1a1a1a] text-[#FCF7E4] px-12 md:px-16 py-3 md:py-4 rounded-md font-bold text-lg md:text-xl uppercase tracking-widest border-2 border-[#1a1a1a] shadow-[0px_4px_10px_rgba(0,0,0,0.3)] hover:shadow-xl transition-all flex items-center gap-3"
            >
              Register 
              <ArrowRight className="w-5 h-5 text-[#e0a82e] group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>
      </main>
    </div>
  );
};

// --- OPTIMIZED CARD COMPONENT ---
const Card = ({ data, index, isTop, onSwipe, customStyle, isMobile }: any) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  return (
    <motion.div
      style={{
        zIndex: 50 - index,
        x: isTop ? x : customStyle.x,
        y: customStyle.y,
        scale: customStyle.scale,
        rotate: isTop ? rotate : customStyle.rotate,
        opacity: isTop ? opacity : 1,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      // FIX 4: Less drag resistance on mobile for easier swipes
      dragElastic={0.05}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100) onSwipe();
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: customStyle.scale, 
        x: isTop ? 0 : customStyle.x,
        y: customStyle.y,
        rotate: isTop ? 0 : customStyle.rotate,
        opacity: 1
      }}
      // FIX 5: Snappier spring physics for mobile
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      // FIX 6: 'will-change-transform' forces GPU usage, preventing lag
      className={`
        absolute 
        w-[85vw] md:w-[420px] aspect-[4/3]
        bg-[#f0eadd] 
        border-[1px] border-[#999] 
        shadow-[0px_4px_20px_rgba(0,0,0,0.2),_2px_2px_0px_#1a1a1a]
        flex flex-col items-center justify-start
        p-3 pb-6 md:pb-8
        cursor-grab active:cursor-grabbing 
        rounded-sm
        touch-none
        will-change-transform 
      `}
    >
      <div className="w-full h-[85%] bg-[#1a1a1a] border border-[#ccc] relative overflow-hidden mb-2 md:mb-3">
         <img 
            src={data.image} 
            alt="Vintage" 
            draggable="false"
            // FIX 7: Disable Sepia/Contrast filters on mobile to save GPU power
            className={`w-full h-full object-cover transition-all duration-500 select-none ${!isMobile ? 'sepia-[0.3] contrast-125 hover:sepia-0' : ''}`}
         />
         <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none"></div>
      </div>
      <div className="w-full flex items-center justify-center gap-2 border-t border-[#ccc] pt-2">
         <Star className="w-3 h-3 fill-[#e0a82e] text-[#e0a82e]" />
         <span className="font-bold font-serif uppercase tracking-widest text-xs md:text-sm text-[#1a1a1a]">{data.label}</span>
         <Star className="w-3 h-3 fill-[#e0a82e] text-[#e0a82e]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
    </motion.div>
  );
};

export default Hero;