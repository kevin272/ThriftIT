import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const HomePage = () => {
  const { user } = useAuthStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl w-full bg-gray-800 bg-opacity-50 backdrop-blur-xl p-10 rounded-2xl shadow-2xl text-white"
    >
      <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
        Welcome, {user?.name || 'User'}!
      </h1>

      <p className="text-center text-gray-300 text-lg mb-6">
        You have successfully logged in and verified your email.
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-center"
      >
        <div className="bg-emerald-600 hover:bg-emerald-700 transition-colors px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 cursor-pointer">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold">Email Verified</span>
        </div>

        <div className="bg-red-600 hover:bg-red-700 transition-colors px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 cursor-pointer">
          <LogOut className="w-5 h-5" />
          <span className="font-semibold">Logout</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
