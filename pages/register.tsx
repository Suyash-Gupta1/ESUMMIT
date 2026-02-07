import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Check, Star, CreditCard, ArrowRight, ShieldCheck, Zap, Crown } from 'lucide-react';
import { RetroStripesLeft, RetroStripesRight } from '../components/Decorations';
import { useRouter } from 'next/router';

const motion = m as any;

// Tier Configuration
const TIERS = [
  {
    id: 'silver',
    name: 'Silver Pass',
    price: '₹499',
    icon: ShieldCheck,
    color: 'bg-gray-200',
    borderColor: 'border-gray-400',
    textColor: 'text-gray-800',
    accent: 'bg-gray-300',
    perks: ['General Entry', 'Standard Swag Bag', 'Access to Keynotes']
  },
  {
    id: 'gold',
    name: 'Gold Pass',
    price: '₹999',
    icon: Zap,
    color: 'bg-retro-yellow',
    borderColor: 'border-orange-500',
    textColor: 'text-orange-900',
    accent: 'bg-yellow-300',
    perks: ['Priority Entry', 'Premium Swag Kit', 'Workshop Access', 'Lunch Included']
  },
  {
    id: 'platinum',
    name: 'Platinum Pass',
    price: '₹1499',
    icon: Crown,
    color: 'bg-retro-pink',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-900',
    accent: 'bg-pink-300',
    perks: ['All Access VIP', 'Speaker Dinner', 'VIP Lounge', 'Exclusive Merch', 'Afterparty Access']
  }
];

export default function Register() {
  const router = useRouter();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    rollNumber: '',
    proofOfPayment: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier) {
      setMessage("Please select a pass tier first!");
      setStatus('error');
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            ...formData, 
            cardTier: selectedTier,
            eventName: 'E-Summit 2026 Main Event'
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
        setTimeout(() => {
           router.push('/');
        }, 3000);
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
    <div className="relative min-h-screen pt-32 pb-20 px-4 flex flex-col items-center w-full overflow-hidden">
      <RetroStripesLeft />
      <RetroStripesRight />

      <div className="max-w-6xl w-full z-10 flex flex-col items-center">
        
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
        >
            <span className="font-sans font-bold text-retro-pink uppercase tracking-widest text-sm mb-2 block">Secure Your Spot</span>
            <h1 className="font-retro text-6xl md:text-8xl text-stroke-lg text-white drop-shadow-retro-lg mb-4">
                Get Your Pass
            </h1>
            <p className="font-sans text-lg text-gray-700 max-w-2xl mx-auto">
                Choose your experience level for ESUMMIT '26. <br className="hidden md:block"/>
                Limited platinum passes available!
            </p>
        </motion.div>

        {/* Tier Selection - Card Deck Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16 px-2">
            {TIERS.map((tier, index) => {
                const isSelected = selectedTier === tier.id;
                const Icon = tier.icon;
                
                return (
                    <motion.div
                        key={tier.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10, rotateX: 5 }}
                        onClick={() => setSelectedTier(tier.id)}
                        className={`relative cursor-pointer group perspective-1000`}
                    >
                        {/* The Physical Card */}
                        <div className={`
                            relative h-full flex flex-col items-center p-6 md:p-8 rounded-3xl border-[3px] border-black shadow-retro transition-all duration-300
                            ${tier.color}
                            ${isSelected ? 'scale-105 shadow-retro-lg ring-4 ring-black/10' : 'hover:shadow-retro-lg'}
                        `}>
                            {/* Hole Punch Effect at Top */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/10 rounded-full blur-[1px]"></div>
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-3 bg-black/80 rounded-full"></div>
                            
                            {/* Selection Checkmark */}
                            <div className={`absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center transition-all ${isSelected ? 'bg-black text-white' : 'bg-white opacity-50'}`}>
                                <Check className="w-5 h-5" />
                            </div>

                            {/* Icon Badge */}
                            <div className={`w-20 h-20 rounded-full border-[3px] border-black bg-white flex items-center justify-center mb-6 shadow-sm group-hover:rotate-12 transition-transform duration-300`}>
                                <Icon className="w-10 h-10 text-black" />
                            </div>

                            <h3 className={`font-retro text-3xl mb-2 text-center ${tier.textColor}`}>{tier.name}</h3>
                            <div className="font-sans font-black text-4xl mb-6 relative inline-block">
                                {tier.price}
                                <svg className="absolute -bottom-2 w-full h-3" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="black" strokeWidth="3" fill="none" />
                                </svg>
                            </div>

                            {/* Perks List */}
                            <ul className="w-full space-y-3 mb-8 flex-1">
                                {tier.perks.map((perk, i) => (
                                    <li key={i} className="flex items-center gap-2 font-sans text-sm font-bold text-gray-800">
                                        <Star className="w-4 h-4 fill-black text-black flex-shrink-0" />
                                        {perk}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-3 rounded-xl border-2 border-black font-bold uppercase tracking-wider shadow-sm transition-all ${isSelected ? 'bg-black text-white' : 'bg-white text-black group-hover:bg-black group-hover:text-white'}`}>
                                {isSelected ? 'Selected' : 'Choose Pass'}
                            </button>
                        </div>
                    </motion.div>
                );
            })}
        </div>

        {/* Registration Form */}
        <AnimatePresence>
            {selectedTier && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="w-full max-w-2xl"
                >
                    <div className="bg-white border-[3px] border-black rounded-[2rem] p-8 md:p-12 shadow-retro-lg relative overflow-hidden">
                        
                        {/* Decorative Tape */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-10 bg-retro-orange/80 rotate-3 z-10 border border-black/10"></div>

                        {status === 'success' ? (
                            <div className="flex flex-col items-center text-center py-10">
                                <div className="w-24 h-24 bg-green-500 rounded-full border-[3px] border-black flex items-center justify-center mb-6 shadow-retro">
                                    <Check className="w-12 h-12 text-white stroke-[3px]" />
                                </div>
                                <h2 className="font-retro text-4xl md:text-5xl mb-4">You're Going!</h2>
                                <p className="font-sans text-xl">
                                    Your <strong>{TIERS.find(t => t.id === selectedTier)?.name}</strong> has been reserved.
                                    <br/>
                                    Check your email for the ticket PDF.
                                </p>
                                <button 
                                    onClick={() => router.push('/')}
                                    className="mt-8 bg-retro-yellow border-2 border-black px-8 py-3 rounded-full font-bold uppercase shadow-retro hover:translate-y-1 hover:shadow-none transition-all"
                                >
                                    Back to Home
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="font-retro text-3xl md:text-4xl">Complete Registration</h2>
                                    <span className={`px-4 py-1 border-2 border-black rounded-full font-bold uppercase text-xs ${TIERS.find(t => t.id === selectedTier)?.color}`}>
                                        {TIERS.find(t => t.id === selectedTier)?.name}
                                    </span>
                                </div>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="flex flex-col gap-2">
                                            <label className="font-bold text-sm uppercase tracking-wide">Full Name</label>
                                            <input 
                                                required
                                                type="text" 
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                                className="border-2 border-black rounded-xl p-3 bg-cream focus:outline-none focus:shadow-retro-sm transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-bold text-sm uppercase tracking-wide">Roll Number</label>
                                            <input 
                                                required
                                                type="text" 
                                                name="rollNumber"
                                                value={formData.rollNumber}
                                                onChange={handleInputChange}
                                                className="border-2 border-black rounded-xl p-3 bg-cream focus:outline-none focus:shadow-retro-sm transition-all"
                                                placeholder="21CS80..."
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold text-sm uppercase tracking-wide">Email Address</label>
                                        <input 
                                            required
                                            type="email" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="border-2 border-black rounded-xl p-3 bg-cream focus:outline-none focus:shadow-retro-sm transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 p-4 border-2 border-black border-dashed rounded-xl bg-gray-50">
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                                                <CreditCard className="w-4 h-4" /> Payment Details
                                            </label>
                                            <span className="text-xs font-bold bg-black text-white px-2 py-0.5 rounded">UPI: flowfest@upi</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mb-2">
                                            Please transfer <strong>{TIERS.find(t => t.id === selectedTier)?.price}</strong> to the UPI ID above and enter the Transaction ID below.
                                        </p>
                                        <input 
                                            required
                                            type="text" 
                                            name="proofOfPayment"
                                            value={formData.proofOfPayment}
                                            onChange={handleInputChange}
                                            className="border-2 border-black rounded-lg p-3 bg-white focus:outline-none focus:shadow-retro-sm transition-all"
                                            placeholder="Transaction ID (e.g. UPI Ref No.)"
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <div className="p-3 bg-red-100 border-2 border-red-500 text-red-700 font-bold rounded-lg text-sm text-center">
                                            {message}
                                        </div>
                                    )}

                                    <button 
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="mt-4 bg-black text-white py-4 rounded-xl font-retro text-2xl uppercase tracking-wider shadow-retro hover:translate-y-1 hover:shadow-none hover:bg-gray-900 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {status === 'submitting' ? 'Processing...' : <>Confirm Registration <ArrowRight className="w-6 h-6" /></>}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </div>
  );
}