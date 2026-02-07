import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
}

export const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, eventName }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    rollNumber: '',
    proofOfPayment: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, eventName }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ username: '', email: '', rollNumber: '', proofOfPayment: '' });
        }, 2000);
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to connect to server');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-cream border-[3px] border-black rounded-2xl p-6 md:p-8 shadow-retro-lg overflow-hidden"
          >
             <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-black/10 rounded-full transition-colors">
                <X className="w-6 h-6" />
             </button>

             {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center border-2 border-black mb-4 shadow-retro-sm">
                        <Check className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-retro text-3xl mb-2">You're In!</h3>
                    <p className="font-sans">Registration confirmed for {eventName}.</p>
                </div>
             ) : (
                 <>
                    <h2 className="font-retro text-3xl md:text-4xl mb-2">Register Now</h2>
                    <p className="font-sans text-sm text-gray-600 mb-6 font-bold uppercase tracking-wider bg-retro-yellow inline-block px-2 border border-black shadow-[2px_2px_0px_#000]">
                        Event: {eventName}
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block font-bold text-sm mb-1">Username</label>
                            <input 
                                required
                                type="text" 
                                name="username" 
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full border-2 border-black rounded-lg p-3 focus:outline-none focus:shadow-retro-sm transition-shadow bg-white"
                                placeholder="e.g. RetroFan99"
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-bold text-sm mb-1">Email</label>
                                <input 
                                    required
                                    type="email" 
                                    name="email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border-2 border-black rounded-lg p-3 focus:outline-none focus:shadow-retro-sm transition-shadow bg-white"
                                    placeholder="hello@example.com"
                                />
                            </div>
                            <div>
                                <label className="block font-bold text-sm mb-1">Roll Number</label>
                                <input 
                                    required
                                    type="text" 
                                    name="rollNumber" 
                                    value={formData.rollNumber}
                                    onChange={handleChange}
                                    className="w-full border-2 border-black rounded-lg p-3 focus:outline-none focus:shadow-retro-sm transition-shadow bg-white"
                                    placeholder="Your ID"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-bold text-sm mb-1">Proof of Payment (Transaction ID)</label>
                            <input 
                                required
                                type="text" 
                                name="proofOfPayment" 
                                value={formData.proofOfPayment}
                                onChange={handleChange}
                                className="w-full border-2 border-black rounded-lg p-3 focus:outline-none focus:shadow-retro-sm transition-shadow bg-white"
                                placeholder="TXN12345678"
                            />
                            <p className="text-xs text-gray-500 mt-1">Please enter the transaction reference number.</p>
                        </div>

                        {status === 'error' && (
                            <div className="p-3 bg-red-100 border border-red-500 text-red-700 text-sm rounded-lg">
                                {message}
                            </div>
                        )}

                        <button 
                            disabled={status === 'submitting'}
                            type="submit" 
                            className="mt-4 bg-retro-orange border-2 border-black py-3 rounded-xl font-retro text-xl shadow-retro hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'submitting' ? 'Registering...' : 'Complete Registration'}
                        </button>
                    </form>
                 </>
             )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};