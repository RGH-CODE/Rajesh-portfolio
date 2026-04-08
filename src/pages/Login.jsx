import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTerminal } from '../context/TerminalContext';
import { motion } from 'framer-motion';
import { FiLock, FiMail, FiLoader } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { log } = useTerminal();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      log(`Attempting login for: ${email}`);
      await login(email, password);
      log("Login successful. Accessing administrative terminal.");
      navigate('/admin');
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
      log(`Login failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-20 px-6 bg-black">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass p-10 rounded-[2.5rem] bg-zinc-900/50"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <FiLock size={32} />
          </div>
          <h1 className="syne text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-gray-400">Restricted access area.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@rajesh.com" 
                className="w-full bg-zinc-800 border border-zinc-700 px-12 py-4 rounded-xl focus:outline-none focus:border-blue-600 transition-all text-white" 
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-zinc-800 border border-zinc-700 px-12 py-4 rounded-xl focus:outline-none focus:border-blue-600 transition-all text-white" 
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary w-full justify-center text-lg py-4 relative"
          >
            {loading ? <FiLoader className="animate-spin" size={24} /> : 'Access Dashboard'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
