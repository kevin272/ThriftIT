import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PageCardLayout = ({ title, children, redirect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 max-w-md w-full bg-[#111] bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
    >
      <div className="p-8">
        {title && (
          <h2 className="text-3xl font-bold mb-6 text-center text-white tracking-tight">
            {title}
          </h2>
        )}
        {children}
      </div>

      {redirect && (
        <div className="px-8 py-4 bg-black bg-opacity-70 flex justify-center border-t border-gray-700">
          <p className="text-sm text-gray-400">
            {redirect === "signup" ? "Don’t have an account? " : "Already have an account? "}
            <Link to={`/${redirect}`} className="text-white underline hover:text-gray-200">
              {redirect.charAt(0).toUpperCase() + redirect.slice(1)}
            </Link>
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default PageCardLayout;
