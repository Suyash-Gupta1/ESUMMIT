import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { RetroStripesLeft, RetroStripesRight } from '../components/Decorations';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { EVENTS } from '../constants';

export default function Events() {
    return (
        <div className="relative pt-32 pb-20 px-4 flex flex-col items-center w-full">
            <RetroStripesLeft />
            <RetroStripesRight />
            
            <div className="max-w-7xl w-full z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="font-retro text-5xl md:text-8xl text-stroke-lg text-white drop-shadow-retro-lg mb-4">
                        Side Events
                    </h1>
                    <p className="font-sans text-lg md:text-xl max-w-2xl mx-auto">
                        Don't miss out on these exclusive community sessions happening during FlowFest. 
                        Seats are limited, so grab your spot!
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {EVENTS.map((event, index) => (
                        <Link href={`/events/${event.id}`} key={event.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                whileHover={{ y: -10 }}
                                className={`flex flex-col border-[3px] border-black rounded-2xl overflow-hidden shadow-retro hover:shadow-retro-lg transition-all bg-white cursor-pointer h-full`}
                            >
                                <div className="h-48 overflow-hidden border-b-[3px] border-black relative group">
                                    <div className={`absolute inset-0 ${event.color} opacity-20 group-hover:opacity-0 transition-opacity z-10`}></div>
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="font-retro text-2xl mb-3 leading-tight">{event.title}</h3>
                                    
                                    <div className="flex flex-col gap-2 mb-4 font-sans text-sm font-bold text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {event.date}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            {event.location}
                                        </div>
                                    </div>

                                    <p className="font-sans text-sm mb-6 flex-1">
                                        {event.description}
                                    </p>

                                    <div 
                                        className={`w-full ${event.color} border-2 border-black py-3 rounded-lg font-bold uppercase shadow-retro-sm hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2`}
                                    >
                                        View Details <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}