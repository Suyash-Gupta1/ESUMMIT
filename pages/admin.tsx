import React, { useState } from 'react';
import { Lock, RefreshCw, Search, Check } from 'lucide-react';
import { useRouter } from 'next/router';

export default function AdminPanel() {
  const router = useRouter();
  const [key, setKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');

  const fetchRegistrations = async (adminKey: string, silent = false) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/registrations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setRegistrations(data);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        if (!silent) {
            if (res.status === 500) {
                alert('Server Error: ADMIN_KEY is not configured on the server.');
            } else {
                alert('Access Denied: Invalid Key');
            }
        }
      }
    } catch (error) {
      console.error('Failed to fetch', error);
      if (!silent) alert('Network Error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRegistrations(key);
  };

  const handleLogout = () => {
    setKey('');
    setIsAuthenticated(false);
    router.push('/');
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Accepted' ? 'Pending' : 'Accepted';
    
    // Optimistic UI update
    setRegistrations(prev => prev.map(reg => 
      reg._id === id ? { ...reg, paymentStatus: newStatus } : reg
    ));

    try {
      const res = await fetch('/api/admin/registrations', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': key,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      
      if (!res.ok) throw new Error('Update failed');

    } catch (error) {
      console.error('Failed to update status', error);
      // Revert on error
      fetchRegistrations(key, true);
      alert('Failed to update status. Please try again.');
    }
  };

  const filteredData = registrations.filter(reg => 
    (reg.username?.toLowerCase() || '').includes(filter.toLowerCase()) ||
    (reg.email?.toLowerCase() || '').includes(filter.toLowerCase()) ||
    (reg.rollNumber?.toLowerCase() || '').includes(filter.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FCF7E4] flex items-center justify-center p-4">
        <div className="bg-white border-[3px] border-black p-8 rounded-2xl shadow-[8px_8px_0px_0px_#000000] max-w-md w-full text-center">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
             <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-sans font-black text-3xl mb-2">Admin Access</h1>
          <p className="font-sans text-gray-600 mb-6">Enter the security key to view registrations.</p>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input 
              type="password" 
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full border-2 border-black p-3 rounded-lg text-lg focus:outline-none focus:shadow-[4px_4px_0px_0px_#000000] transition-shadow"
              placeholder="Security Key..."
            />
            <button 
                type="submit"
                disabled={loading}
                className="bg-[#FDD835] border-2 border-black font-bold uppercase tracking-widest py-3 rounded-lg hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_#000000] transition-all"
            >
              {loading ? 'Checking...' : 'Unlock Panel'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF7E4] font-sans text-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
           <div>
               <h1 className="font-black text-4xl md:text-5xl mb-2">Dashboard</h1>
               <p className="text-gray-600 font-bold">Total Registrations: {registrations.length}</p>
           </div>
           
           <div className="flex items-center gap-2">
               <button 
                onClick={() => fetchRegistrations(key)}
                className="p-3 bg-white border-2 border-black rounded-full hover:bg-gray-100 shadow-[2px_2px_0px_0px_#000] active:translate-y-[2px] active:shadow-none transition-all"
               >
                   <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
               </button>
               <button 
                onClick={handleLogout}
                className="bg-black text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
               >
                   Logout
               </button>
           </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-[3px] border-black rounded-xl p-4 mb-6 shadow-[4px_4px_0px_0px_#000000] flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input 
                type="text" 
                placeholder="Search by Name, Email, or Roll No..." 
                className="flex-1 outline-none text-lg"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
        </div>

        {/* Table */}
        <div className="bg-white border-[3px] border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_#000000] overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-[#FFB74D] border-b-[3px] border-black">
                        <th className="p-4 border-r-2 border-black font-black uppercase tracking-wider">Attendee</th>
                        <th className="p-4 border-r-2 border-black font-black uppercase tracking-wider">Contact</th>
                        <th className="p-4 border-r-2 border-black font-black uppercase tracking-wider">Event Info</th>
                        <th className="p-4 border-r-2 border-black font-black uppercase tracking-wider">Payment</th>
                        <th className="p-4 border-r-2 border-black font-black uppercase tracking-wider text-center">Status</th>
                        <th className="p-4 font-black uppercase tracking-wider text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((reg) => (
                            <tr key={reg._id} className="border-b-2 border-black hover:bg-gray-50 transition-colors">
                                <td className="p-4 border-r-2 border-black">
                                    <div className="font-bold text-lg">{reg.username}</div>
                                    <div className="text-sm font-mono bg-gray-100 inline-block px-1 rounded border border-gray-300">{reg.rollNumber}</div>
                                </td>
                                <td className="p-4 border-r-2 border-black text-sm font-medium">
                                    {reg.email}
                                </td>
                                <td className="p-4 border-r-2 border-black">
                                    <div className="font-bold">{reg.eventName}</div>
                                    <span className={`text-xs px-2 py-0.5 rounded border border-black font-bold uppercase ${
                                        reg.cardTier === 'Platinum Pass' ? 'bg-[#F48FB1]' :
                                        reg.cardTier === 'Gold Pass' ? 'bg-[#FDD835]' : 
                                        'bg-gray-200'
                                    }`}>
                                        {reg.cardTier || 'Standard'}
                                    </span>
                                </td>
                                <td className="p-4 border-r-2 border-black">
                                    <div className="font-mono text-sm break-all">{reg.proofOfPayment}</div>
                                </td>
                                <td className="p-4 border-r-2 border-black text-center">
                                    {reg.paymentStatus === 'Accepted' ? (
                                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 border-2 border-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                            <Check className="w-3 h-3" /> Accepted
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 border-2 border-yellow-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                            Pending
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-center">
                                    <button 
                                        onClick={() => handleToggleStatus(reg._id, reg.paymentStatus)}
                                        className={`px-4 py-2 rounded-lg font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-y-[1px] hover:shadow-none transition-all ${
                                            reg.paymentStatus === 'Accepted' ? 'bg-white hover:bg-gray-100' : 'bg-[#FDD835] hover:bg-[#FBC02D]'
                                        }`}
                                    >
                                        {reg.paymentStatus === 'Accepted' ? 'Revoke' : 'Approve'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="p-12 text-center text-gray-500 font-bold text-lg">
                                No registrations found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}