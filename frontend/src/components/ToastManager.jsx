import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import CustomToast from './CustomToast';

const ToastManager = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setToasts((currentToasts) => 
        currentToasts.filter((toast) => Date.now() - toast.timestamp < 3000)
      );
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Add this to window for global access
  window.showToast = (type, message) => {
    const newToast = {
      id: Date.now(),
      type,
      message,
      timestamp: Date.now(),
    };
    setToasts((currentToasts) => [...currentToasts, newToast]);
  };

  const removeToast = (id) => {
    setToasts((currentToasts) => 
      currentToasts.filter((toast) => toast.id !== id)
    );
  };

  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-4 z-50">
      <AnimatePresence>
        {toasts.map((toast) => (
          <CustomToast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastManager;
