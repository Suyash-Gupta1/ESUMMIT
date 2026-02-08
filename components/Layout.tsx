import React from 'react';
import Navbar from './Navbar';
import { Footer } from './Footer';
import { NoiseOverlay } from './NoiseOverlay';
import SmoothScroll from './SmoothScroll';

import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const isAdmin = router.pathname.startsWith('/admin');
  const isEventDetail = router.pathname === '/events/[id]';

  return (
    <div className="w-full min-h-screen bg-cream text-black font-sans overflow-x-hidden flex flex-col relative">
      <NoiseOverlay />
      
      
      {/* Hide Navbar on Admin pages */}
      {!isAdmin && <Navbar />}
      
      <main className="flex-grow flex flex-col relative z-10">
        <SmoothScroll>
            {children}
        </SmoothScroll>
      </main>

      
      
      {/* Hide Footer on Admin pages */}
      {!isAdmin && !isEventDetail && <Footer />}
    </div>
  );
};

export default Layout;