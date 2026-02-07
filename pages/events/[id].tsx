import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { EventModal } from '../../components/EventModal';
import { EVENTS } from '../../constants';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';

export default function EventDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const event = EVENTS.find(e => e.id === id);

    if (!event && router.isReady) {
        return (
            <div className="flex-grow flex flex-col items-center justify-center p-4">
                <h1 className="font-retro text-4xl mb-4">Event not found!</h1>
                <Link href="/events" className="underline font-bold">Go back to Events</Link>
            </div>
        );
    }

    if (!event) return null;

    return (
        <div className="relative pt-32 pb-20 px-4 flex flex-col items-center w-full">
            <div className="max-w-5xl w-full z-10">
                
                <Link href="/events">
                    <motion.button 
                        whileHover={{ x: -5 }}
                        className="flex items-center gap-2 font-bold mb-8 uppercase text-sm border-2 border-black bg-white px-4 py-2 rounded-full shadow-retro-sm"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Events
                    </motion.button>
                </Link>

                <div className="bg-white border-[3px] border-black rounded-3xl overflow-hidden shadow-retro-lg flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-1/2 relative h-64 md:h-auto border-b-[3px] md:border-b-0 md:border-r-[3px] border-black">
                        <div className={`absolute inset-0 ${event.color} opacity-20 z-10`}></div>
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Content Section */}
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
                        <h1 className="font-retro text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
                            {event.title}
                        </h1>

                        <div className="flex flex-col gap-3 mb-8">
                            <div className="flex items-center gap-3 font-bold text-lg">
                                <div className={`p-2 ${event.color} border-2 border-black rounded-lg shadow-retro-sm`}>
                                    <Calendar className="w-5 h-5" />
                                </div>
                                {event.date}
                            </div>
                            <div className="flex items-center gap-3 font-bold text-lg">
                                <div className={`p-2 ${event.color} border-2 border-black rounded-lg shadow-retro-sm`}>
                                    <MapPin className="w-5 h-5" />
                                </div>
                                {event.location}
                            </div>
                        </div>

                        <div className="prose prose-lg mb-8">
                            <p className="font-sans font-medium text-lg text-gray-700 leading-relaxed">
                                {event.longDescription || event.description}
                            </p>
                        </div>

                        <div className="mt-auto">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-sans font-bold text-gray-500 uppercase tracking-widest text-sm">Ticket Price</span>
                                <span className="font-retro text-3xl">{event.price}</span>
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className={`w-full ${event.color} border-2 border-black py-4 rounded-xl font-retro text-2xl shadow-retro hover:translate-y-1 hover:shadow-none transition-all uppercase`}
                            >
                                Buy Ticket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <EventModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                eventName={event.title} 
            />
        </div>
    );
}