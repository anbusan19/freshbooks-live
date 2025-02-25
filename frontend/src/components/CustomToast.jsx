import React from 'react';
import { FiHeart, FiShoppingBag, FiCheck, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const CustomToast = ({ type, message, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'addWishlist':
        return <FiHeart className="text-red-500 w-6 h-6" />;
      case 'removeWishlist':
        return <FiHeart className="text-gray-400 w-6 h-6" />;
      case 'addCart':
        return <FiShoppingBag className="text-green-500 w-6 h-6" />;
      case 'removeCart':
        return <FiShoppingBag className="text-gray-400 w-6 h-6" />;
      default:
        return <FiCheck className="text-blue-500 w-6 h-6" />;
    }
  };

  const getAnimation = () => {
    switch (type) {
      case 'addWishlist':
        return {
          scale: [1, 1.2, 1],
          rotate: [0, 15, -15, 0],
        };
      case 'removeWishlist':
        return {
          scale: [1, 0.8, 1],
          rotate: [0, -10, 10, 0],
        };
      case 'addCart':
        return {
          y: [0, -10, 0],
          scale: [1, 1.1, 1],
        };
      case 'removeCart':
        return {
          x: [0, 10, -10, 0],
          scale: [1, 0.9, 1],
        };
      default:
        return {
          scale: [1, 1.1, 1],
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center space-x-3 z-50"
    >
      <motion.div
        animate={getAnimation()}
        transition={{ duration: 0.5 }}
      >
        {getIcon()}
      </motion.div>
      <span className="text-gray-800 dark:text-gray-200 font-medium">
        {message}
      </span>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
      >
        <FiX className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

export default CustomToast;
