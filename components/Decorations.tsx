import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';


const STRIPE_WIDTH = 32;
const GAP = 16; 
const Y_START = -100; 
const COLOR_YELLOW = '#FDD835';
const COLOR_ORANGE = '#FFB74D';
const COLOR_PINK = '#F48FB1';

export const RetroStripesLeft: React.FC = () => {
    const { scrollY } = useScroll();
    const yYellow = useTransform(scrollY, [0, 1000], [0, 150]); 
    const yOrange = useTransform(scrollY, [0, 1000], [0, 250]); 
    const yPink = useTransform(scrollY, [0, 1000], [0, 350]); 

    return (
        <div className="absolute left-0 top-0 h-[150vh] w-[200px] pointer-events-none z-0 hidden md:block overflow-visible mix-blend-normal">
            <svg width="100%" height="100%" className="overflow-visible">
                 <defs>
                    <filter id="shadow-left" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="3" dy="3" stdDeviation="0" floodColor="black" />
                    </filter>
                 </defs>
                 <motion.path 
                    d={`M ${2*(STRIPE_WIDTH+GAP)} ${Y_START} L ${2*(STRIPE_WIDTH+GAP)} 600 Q ${2*(STRIPE_WIDTH+GAP) + STRIPE_WIDTH/2} 640 ${2*(STRIPE_WIDTH+GAP) + STRIPE_WIDTH} 600 L ${2*(STRIPE_WIDTH+GAP) + STRIPE_WIDTH} ${Y_START} Z`}
                    fill={COLOR_PINK}
                    stroke="black"
                    strokeWidth="3"
                    style={{ y: yPink }}
                    filter="url(#shadow-left)"
                 />
                 <motion.path 
                    d={`M ${STRIPE_WIDTH+GAP} ${Y_START} L ${STRIPE_WIDTH+GAP} 500 Q ${STRIPE_WIDTH+GAP + STRIPE_WIDTH/2} 540 ${STRIPE_WIDTH+GAP + STRIPE_WIDTH} 500 L ${STRIPE_WIDTH+GAP + STRIPE_WIDTH} ${Y_START} Z`}
                    fill={COLOR_ORANGE}
                    stroke="black"
                    strokeWidth="3"
                    style={{ y: yOrange }}
                    filter="url(#shadow-left)"
                 />
                 <motion.path 
                    d={`M 0 ${Y_START} L 0 400 Q ${STRIPE_WIDTH/2} 440 ${STRIPE_WIDTH} 400 L ${STRIPE_WIDTH} ${Y_START} Z`}
                    fill={COLOR_YELLOW}
                    stroke="black"
                    strokeWidth="3"
                    style={{ y: yYellow }}
                    filter="url(#shadow-left)"
                 />
            </svg>
        </div>
    )
}

export const RetroStripesRight: React.FC = () => {
    const { scrollY } = useScroll();
    const yYellow = useTransform(scrollY, [0, 1000], [0, 150]);
    const yOrange = useTransform(scrollY, [0, 1000], [0, 250]);
    const yPink = useTransform(scrollY, [0, 1000], [0, 350]);
    const W = 220; // Increased container width for safer spacing

    return (
        <div className="absolute -right-[1px] top-0 h-[150vh] w-[220px] pointer-events-none z-0 hidden md:block overflow-visible">
             <svg width="100%" height="100%" className="overflow-visible">
                 <defs>
                    <filter id="shadow-right" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="-3" dy="3" stdDeviation="0" floodColor="black" />
                    </filter>
                 </defs>
                 <motion.path 
                    d={`M ${W - 3*STRIPE_WIDTH - 2*GAP} ${Y_START} L ${W - 3*STRIPE_WIDTH - 2*GAP} 600 Q ${W - 3*STRIPE_WIDTH - 2*GAP + STRIPE_WIDTH/2} 640 ${W - 2*STRIPE_WIDTH - 2*GAP} 600 L ${W - 2*STRIPE_WIDTH - 2*GAP} ${Y_START} Z`}
                    fill={COLOR_PINK}
                    stroke="black"
                    strokeWidth="3"
                    style={{ y: yPink }}
                    filter="url(#shadow-right)"
                 />
                 <motion.path 
                    d={`M ${W - 2*STRIPE_WIDTH - GAP} ${Y_START} L ${W - 2*STRIPE_WIDTH - GAP} 500 Q ${W - 2*STRIPE_WIDTH - GAP + STRIPE_WIDTH/2} 540 ${W - STRIPE_WIDTH - GAP} 500 L ${W - STRIPE_WIDTH - GAP} ${Y_START} Z`}
                    fill={COLOR_ORANGE}
                    stroke="black"
                    strokeWidth="3"
                    style={{ y: yOrange }}
                    filter="url(#shadow-right)"
                 />
                 <motion.path 
                    d={`M ${W - STRIPE_WIDTH} ${Y_START} L ${W - STRIPE_WIDTH} 400 Q ${W - STRIPE_WIDTH + STRIPE_WIDTH/2} 440 ${W} 400 L ${W} ${Y_START} Z`}
                    fill={COLOR_YELLOW}
                    stroke="black"
                    strokeWidth="3"
                    style={{ y: yYellow }}
                    filter="url(#shadow-right)"
                 />

            </svg>
        </div>
    )
}

export const LeftStripes: React.FC = () => null;
export const RightStripes: React.FC = () => null;