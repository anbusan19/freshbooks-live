import React from 'react';
import { FiPackage } from 'react-icons/fi';

const RecentOrders = ({ orders = [] }) => {
    // Get the 5 most recent orders
    const recentOrders = orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
            
            {recentOrders.length > 0 ? (
                <div className="space-y-3">
                    {recentOrders.map((order) => (
                        <div 
                            key={order._id}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg
                                     border border-gray-200/50 dark:border-gray-600/50 hover:border-indigo-200 
                                     dark:hover:border-indigo-800/50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                                    <FiPackage className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        #{order._id.slice(-8)}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                ₹{order.totalPrice.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center py-6 text-gray-500 dark:text-gray-400">
                    No recent orders
                </div>
            )}
        </div>
    );
};

export default RecentOrders; 