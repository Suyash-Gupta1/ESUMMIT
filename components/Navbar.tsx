import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, Star } from 'lucide-react';

const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Ref to store the inactivity timer
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- SCROLL & IDLE LOGIC ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // 1. Clear any existing idle timer immediately when scrolling occurs
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    // 2. SCROLL DIRECTION LOGIC
    if (latest > previous && latest > 100) {
      // SCROLLING DOWN: Hide immediately
      setHidden(true);
    } else {
      // SCROLLING UP: Show immediately
      setHidden(false);

      // 3. IDLE LOGIC (Only triggers if we are currently visible/scrolling up)
      // If user stops scrolling for 3.5 seconds, hide the navbar again.
      idleTimerRef.current = setTimeout(() => {
        // Only apply this "Idle Hide" on Laptop/Desktop screens (md breakpoint)
        // and ensure we aren't at the very top of the page.
        if (typeof window !== 'undefined' && window.innerWidth >= 768 && latest > 100) {
           setHidden(true);
        }
      }, 3500); // 3.5 seconds delay
    }
  });

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  // Sub-component for Nav Links
  const NavLink = ({ href, label, delay = 0 }: { href: string; label: string; delay?: number }) => (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Link href={href} className="group relative flex flex-col items-center px-4 pt-3 pb-1 border-2 border-black rounded-t-[2.5rem] bg-cream hover:bg-white transition-all duration-300 min-w-[85px]">
        <Star className="w-2 h-2 mb-1 fill-retro-pink text-retro-pink" />
        <span className="font-serif font-black text-[10px] md:text-xs uppercase tracking-tight text-black">
          {label}
        </span>
        <div className="w-full h-[3px] bg-retro-pink mt-1 opacity-60 group-hover:opacity-100 transition-opacity" />
      </Link>
    </motion.div>
  );

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-120%" }, // Slides up completely
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-[100] w-full p-2 md:px-8 md:pt-4 pointer-events-none md:pointer-events-auto"
      >
        {/* Main Navbar Container */}
        <div className="relative max-w-7xl mx-auto flex items-center justify-end md:justify-between 
                        bg-transparent border-0 p-0 shadow-none
                        md:bg-cream md:border-2 md:border-black md:rounded-xl md:px-6 md:py-3 md:shadow-retro-sm">
          
          <div className="hidden md:block absolute top-1 left-1 w-4 h-4 border-t border-l border-black/20" />
          <div className="hidden md:block absolute top-1 right-1 w-4 h-4 border-t border-r border-black/20" />

          {/* Logo (Desktop Only) */}
          <div className="flex-shrink-0 hidden md:flex pointer-events-auto">
            <Link href="/" className="flex flex-col">
              <span className="font-retro text-xl md:text-2xl text-black leading-none">
                ESUMMIT '26
              </span>
              <div className="h-[2px] w-full bg-black/10 mt-1" />
            </Link>
          </div>

          {/* Links (Desktop Only) */}
          <div className="hidden lg:flex items-end gap-2 absolute left-1/2 -translate-x-1/2 bottom-[-2px] pointer-events-auto">
            <NavLink href="/" label="Home" delay={0.1} />
            <NavLink href="/#about" label="About" delay={0.2} />
            <NavLink href="/#speakers" label="Speakers" delay={0.3} />
            <NavLink href="/events" label="Events" delay={0.4} />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 pointer-events-auto">
            <Link href="/events" className="hidden md:block">
              <motion.button 
                whileHover={{ scale: 1.02, rotate: -1 }}
                whileTap={{ scale: 0.98 }}
                className="relative bg-retro-pink border-2 border-black px-6 py-2 rounded-xl font-serif font-black italic text-xs uppercase shadow-[4px_4px_0px_0px_#000] transition-all hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                <span className="absolute -top-1 -left-1 text-[8px]">✦</span>
                <span className="absolute -bottom-1 -right-1 text-[8px]">✦</span>
                Buy Tickets
              </motion.button>
            </Link>

            {/* Mobile Hamburger */}
            <button 
              className="lg:hidden p-2 bg-cream border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150] bg-cream flex flex-col p-8 border-l-2 border-black"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-retro text-2xl">MENU</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {['Home', 'About', 'Speakers', 'Events'].map((item, i) => (
                <Link 
                  key={item} 
                  href={item === 'Home' ? '/' : `/#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between border-b-2 border-black pb-4 group"
                  >
                    <span className="font-retro text-4xl group-hover:text-retro-pink transition-colors">
                      {item}
                    </span>
                    <Star className="w-6 h-6 group-hover:rotate-45 transition-transform" />
                  </motion.div>
                </Link>
              ))}
              
              <Link href="/events" className="mt-8" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full bg-retro-pink border-[3px] border-black py-4 rounded-2xl font-serif font-black text-2xl uppercase shadow-retro active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all">
                  Buy Tickets
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;