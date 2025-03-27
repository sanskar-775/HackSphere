// components/Auth/LoginModal.js
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';

const LoginModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="modal modal-open"
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">Login Required</h3>
        <p className="py-4">You need to be logged in to save bookmarks!</p>
        
        <div className="modal-action flex flex-col gap-4">
          <button
            onClick={() => signIn('google')}
            className="btn btn-primary w-full gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
              {/* Google SVG icon */}
            </svg>
            Continue with Google
          </button>
          
          <button
            onClick={() => signIn('github')}
            className="btn btn-secondary w-full gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
              {/* GitHub SVG icon */}
            </svg>
            Continue with GitHub
          </button>
          
          <button onClick={onClose} className="btn btn-ghost w-full">
            Maybe Later
          </button>
        </div>
      </div>
    </motion.div>
  );
};