import React from 'react';
import { FiPackage, FiTruck, FiClock, FiCheckCircle, FiExternalLink } from 'react-icons/fi';

const orderStatuses = [
    { id: 'pending', label: 'Pending', icon: FiClock },
    { id: 'processing', label: 'Processing', icon: FiPackage },
    { id: 'out_for_delivery', label: 'Out for Delivery', icon: FiTruck },
    { id: 'delivered', label: 'Delivered', icon: FiCheckCircle }
];

const OrderStatusProgress = ({ status, trackingUrl }) => {
    const getCurrentStatusIndex = () => {
        return orderStatuses.findIndex(s => s.id === status);
    };

    const isCompleted = (statusId) => {
        const currentIndex = getCurrentStatusIndex();
        const statusIndex = orderStatuses.findIndex(s => s.id === statusId);
        return statusIndex <= currentIndex;
    };

    const isActive = (statusId) => status === statusId;

    return (
        <div className="w-full space-y-2">
            <div className="w-full py-1 sm:py-2">
                <div className="flex justify-between relative">
                    {/* Progress Line */}
                    <div className="absolute top-3.5 sm:top-4 left-0 right-0 h-0.5 sm:h-1 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    <div 
                        className="absolute top-3.5 sm:top-4 left-0 h-0.5 sm:h-1 bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 rounded-full transition-all duration-500"
                        style={{ 
                            width: `${(getCurrentStatusIndex() / (orderStatuses.length - 1)) * 100}%`
                        }}
                    />

                    {/* Status Points */}
                    {orderStatuses.map((s) => (
                        <div key={s.id} className="relative z-10 flex flex-col items-center gap-1 sm:gap-2 px-1">
                            <div 
                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300
                                    ${isCompleted(s.id)
                                        ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30'
                                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}
                            >
                                <s.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-300 ${
                                    isCompleted(s.id)
                                        ? 'text-white'
                                        : isActive(s.id)
                                            ? 'text-indigo-600 dark:text-indigo-400'
                                            : 'text-gray-400 dark:text-gray-500'
                                }`} />
                            </div>
                            <span className={`text-[10px] sm:text-xs font-medium text-center whitespace-nowrap transition-colors duration-300
                                ${isActive(s.id)
                                    ? 'text-indigo-600 dark:text-indigo-400'
                                    : isCompleted(s.id)
                                        ? 'text-gray-700 dark:text-gray-300'
                                        : 'text-gray-400 dark:text-gray-500'}`}>
                                {window.innerWidth < 380 ? s.label.split(' ')[0] : s.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tracking Button */}
            {status === 'out_for_delivery' && trackingUrl && (
                <a
                    href={trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-3 py-1.5 text-xs font-medium
                             bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400
                             hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg transition-colors"
                >
                    <FiTruck className="w-3.5 h-3.5" />
                    Track Package
                    <FiExternalLink className="w-3 h-3" />
                </a>
            )}
        </div>
    );
};

export default OrderStatusProgress; 