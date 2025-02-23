import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import Loading from '../../components/Loading';
import { FiPackage, FiTruck, FiCheck, FiClock, FiRotateCcw } from 'react-icons/fi';
import DownloadInvoice from '../../components/DownloadInvoice';
import ReturnPolicyModal from '../../components/ReturnPolicyModal';

const DeliveryStatusBadge = ({ status }) => {
    const getStatusStyles = () => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'processing':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'out_for_delivery':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
            case 'delivered':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'pending':
                return <FiClock className="w-4 h-4" />;
            case 'processing':
                return <FiPackage className="w-4 h-4" />;
            case 'out_for_delivery':
                return <FiTruck className="w-4 h-4" />;
            case 'delivered':
                return <FiCheck className="w-4 h-4" />;
            default:
                return null;
        }
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-full ${getStatusStyles()}`}>
            {getStatusIcon()}
            {status.replace(/_/g, ' ')}
        </span>
    );
};

const OrderPage = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);
    const [isReturnPolicyOpen, setIsReturnPolicyOpen] = useState(false);

    if (isLoading) return <Loading />;
    if (isError) return (
        <div className="min-h-[60vh] flex items-center justify-center text-red-500 dark:text-red-400">
            Error getting orders data
        </div>
    );

    // Function to check if order is eligible for return (within 3 days of delivery)
    const isEligibleForReturn = (order) => {
        if (order.deliveryStatus !== 'delivered') return false;
        
        const deliveryUpdate = order.deliveryUpdates.find(update => update.status === 'delivered');
        if (!deliveryUpdate) return false;

        const deliveryDate = new Date(deliveryUpdate.timestamp);
        const currentDate = new Date();
        const daysDifference = Math.floor((currentDate - deliveryDate) / (1000 * 60 * 60 * 24));
        
        return daysDifference <= 3;
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-8 px-2 sm:px-4 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Your Orders</h1>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">View and manage your order history</p>
                    </div>
                    <button
                        onClick={() => setIsReturnPolicyOpen(true)}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 
                                 dark:text-indigo-400 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-100 
                                 dark:hover:bg-indigo-900/50 transition-colors whitespace-nowrap"
                    >
                        <FiRotateCcw className="w-4 h-4" />
                        Return Policy
                    </button>
                </div>

                {/* Orders List */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-3 sm:p-6">
                        {orders.length > 0 ? (
                            <div className="space-y-4 sm:space-y-6">
                                {orders.map((order, index) => (
                                    <div 
                                        key={order._id}
                                        className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 sm:p-6 transition-all duration-200
                                                 hover:shadow-md border border-gray-200/50 dark:border-gray-600/50"
                                    >
                                        {/* Order Header */}
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex-shrink-0">
                                                    <span className="text-base sm:text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                                                        #{index + 1}
                                                    </span>
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="text-sm sm:text-base font-medium text-gray-800 dark:text-white truncate">
                                                        Order #{order._id.slice(-8)}
                                                    </h3>
                                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                                        {new Date(order?.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <DownloadInvoice order={order} />
                                                <span className="text-sm sm:text-base font-medium text-gray-800 dark:text-white whitespace-nowrap">
                                                    ₹{order.totalPrice}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Grid Layout */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                            {/* Customer Info */}
                                            <div className="space-y-3">
                                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    Customer Details
                                                </h4>
                                                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 space-y-2">
                                                    <p className="text-sm text-gray-800 dark:text-gray-200">
                                                        <span className="font-medium">Name:</span> {order.name}
                                                    </p>
                                                    <p className="text-sm text-gray-800 dark:text-gray-200">
                                                        <span className="font-medium">Email:</span> {order.email}
                                                    </p>
                                                    <p className="text-sm text-gray-800 dark:text-gray-200">
                                                        <span className="font-medium">Phone:</span> {order.phone}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Shipping Address */}
                                            <div className="space-y-3">
                                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    Shipping Address
                                                </h4>
                                                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 space-y-1">
                                                    <p className="text-sm text-gray-800 dark:text-gray-200">{order.address?.houseNo}</p>
                                                    <p className="text-sm text-gray-800 dark:text-gray-200">{order.address?.street}</p>
                                                    <p className="text-sm text-gray-800 dark:text-gray-200">{order.address?.area}</p>
                                                    <p className="text-sm text-gray-800 dark:text-gray-200">
                                                        {order.address?.city}, {order.address?.state}
                                                    </p>
                                                    <p className="text-sm text-gray-800 dark:text-gray-200">{order.address?.country}</p>
                                                    <p className="text-sm text-gray-800 dark:text-gray-200">PIN: {order.address?.zipcode}</p>
                                                </div>
                                            </div>

                                            {/* Products */}
                                            <div className="space-y-3 sm:col-span-2 lg:col-span-1">
                                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    Products ({order.productIds?.length || 0})
                                                </h4>
                                                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3">
                                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                                        {order.productIds && order.productIds.length > 0 && order.productIds.map((item) => {
                                                            if (!item || !item.book) return null;
                                                            return (
                                                                <div 
                                                                    key={item.book._id}
                                                                    className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2"
                                                                >
                                                                    <img 
                                                                        src={item.book.coverImage} 
                                                                        alt={item.book.title}
                                                                        className="w-12 h-16 object-cover rounded"
                                                                    />
                                                                    <div className="flex-1 min-w-0">
                                                                        <h5 className="text-sm font-medium text-gray-800 dark:text-white truncate">
                                                                            {item.book.title}
                                                                        </h5>
                                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                            Quantity: {item.quantity}
                                                                        </p>
                                                                        <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                                                                            ₹{item.price * item.quantity}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Delivery Status - Full Width */}
                                            <div className="col-span-full">
                                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                                                    Delivery Status
                                                </h4>
                                                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                        <div className="flex items-center gap-3">
                                                            <DeliveryStatusBadge status={order.deliveryStatus || 'pending'} />
                                                            
                                                            {order.trackingUrl && (
                                                                <a
                                                                    href={order.trackingUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                                                                >
                                                                    Track Order
                                                                </a>
                                                            )}
                                                        </div>
                                                        
                                                        {isEligibleForReturn(order) && (
                                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full
                                                                         bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                                <FiRotateCcw className="w-3 h-3" />
                                                                Eligible for Return
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 sm:py-12">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-1">No orders found</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Start shopping to see your orders here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Return Policy Modal */}
            <ReturnPolicyModal 
                isOpen={isReturnPolicyOpen}
                onClose={() => setIsReturnPolicyOpen(false)}
            />
        </div>
    );
};

export default OrderPage;