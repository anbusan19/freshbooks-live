import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';
import Loading from '../../../components/Loading';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const { currentUser, logOut } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logOut();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    if (isLoading) return <Loading />;
    if (isError) return (
        <div className="min-h-[60vh] flex items-center justify-center text-red-500 dark:text-red-400">
            Error getting orders data
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your orders and account</p>
                    </div>
                    
                    {/* User Menu Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 bg-white dark:bg-gray-800 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-0.5">
                                <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                                    <span className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                                        {currentUser?.email?.[0]?.toUpperCase() || 'U'}
                                    </span>
                                </div>
                            </div>
                            <div className="text-left hidden sm:block">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User'}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">View profile</p>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 border border-gray-200 dark:border-gray-700">
                                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    Profile Settings
                                </Link>
                                <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    My Orders
                                </Link>
                                <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    Wishlist
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Sign out
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Orders Grid */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Orders</h2>
                        
                    {orders.length > 0 ? (
                            <div className="space-y-4">
                                {orders.map((order, index) => (
                                    <div 
                                        key={order._id}
                                        className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 transition-all duration-200
                                                 hover:shadow-md border border-gray-200/50 dark:border-gray-600/50"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                                                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                                        #{index + 1}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-800 dark:text-white">
                                                        Order #{order._id.slice(-8)}
                                                    </h3>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {new Date(order?.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Amount</p>
                                                <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
                                                    ₹{order.totalPrice}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="border-t border-gray-200 dark:border-gray-600/50 pt-4 mt-4">
                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                                                Products ({order.productIds.length})
                                            </p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {order.productIds.map((productId) => (
                                                    <div 
                                                        key={productId}
                                                        className="text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800/50 rounded p-2"
                                                    >
                                                        {productId}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No orders yet</h3>
                                <p className="text-gray-500 dark:text-gray-400">Start shopping to see your orders here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
