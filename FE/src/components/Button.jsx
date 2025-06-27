import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ children, type = 'submit', onClick, disabled = false, className = '' }) => {
  return (
    <motion.button
      className={`mt-5 w-full py-3 px-4 bg-white text-black 
        font-bold rounded-lg shadow-md hover:bg-gray-100
        focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 
        focus:ring-offset-black transition duration-200 ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};
