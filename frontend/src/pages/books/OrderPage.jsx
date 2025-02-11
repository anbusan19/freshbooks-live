import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import Loading from '../../components/Loading';
import { FiPackage, FiTruck, FiCheck, FiClock } from 'react-icons/fi';

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

    if (isLoading) return <Loading />;
    if (isError) return (
        <div className="min-h-[60vh] flex items-center justify-center text-red-500 dark:text-red-400">
            Error getting orders data
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-8 px-3 sm:px-4 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Your Orders</h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">View and manage your order history</p>
                </div>

                {/* Orders List */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="p-4 sm:p-6">
                        {orders.length > 0 ? (
                            <div className="space-y-4 sm:space-y-6">
                                {orders.map((order, index) => (
                                    <div 
                                        key={order._id}
                                        className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 sm:p-6 transition-all duration-200
                                                 hover:shadow-md border border-gray-200/50 dark:border-gray-600/50"
                                    >
                                        {/* Order Header */}
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                                                    <span className="text-base sm:text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                                                        #{index + 1}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm sm:text-base font-medium text-gray-800 dark:text-white">
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
                                            <div className="flex items-center justify-between sm:block text-right mt-2 sm:mt-0">
                                                <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 sm:block">
                                                    Total Amount
                                                </span>
                                                <p className="text-base sm:text-lg font-semibold text-indigo-600 dark:text-indigo-400 ml-2 sm:ml-0">
                                                    ₹{order.totalPrice}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Order Details */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                                            {/* Customer Info and Address */}
                                            <div className="space-y-4 md:col-span-2">
                                                <div>
                                                    <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                                        Customer Details
                                                    </h4>
                                                    <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 sm:p-4 space-y-2">
                                                        <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200">
                                                            <span className="font-medium">Name:</span> {order.name}
                                                        </p>
                                                        <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200">
                                                            <span className="font-medium">Email:</span> {order.email}
                                                        </p>
                                                        <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200">
                                                            <span className="font-medium">Phone:</span> {order.phone}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                                        Shipping Address
                                                    </h4>
                                                    <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                                                        <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 space-y-1">
                                                            <span className="block">{order.address.houseNo}, {order.address.street}</span>
                                                            <span className="block">{order.address.area}</span>
                                                            <span className="block">{order.address.city}, {order.address.state}</span>
                                                            <span className="block">{order.address.country} - {order.address.zipcode}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Products */}
                                            <div>
                                                <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                                    Products ({order.productIds?.length || 0})
                                                </h4>
                                                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                                                    <div className="space-y-2">
                                                        {order.productIds && order.productIds.length > 0 && order.productIds.map((book) => {
                                                            if (!book || typeof book !== 'object') return null;
                                                            return (
                                                                <div 
                                                                    key={book._id}
                                                                    className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2"
                                                                >
                                                                    {typeof book.coverImage === 'string' && (
                                                                        <img 
                                                                            src={book.coverImage} 
                                                                            alt={typeof book.title === 'string' ? book.title : 'Book cover'}
                                                                            className="w-16 h-20 object-cover rounded-lg shadow-sm"
                                                                        />
                                                                    )}
                                                                    <div className="min-w-0 flex-1">
                                                                        <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                                                                            {typeof book.title === 'string' ? book.title : 'Untitled Book'}
                                                                        </p>
                                                                        {typeof book.price === 'number' && book.price > 0 && (
                                                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                                ₹{book.price}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Delivery Status */}
                                            <div className="md:col-span-3">
                                                <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                                    Delivery Status
                                                </h4>
                                                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                                                    <DeliveryStatusBadge status={order.deliveryStatus || 'pending'} />
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
        </div>
    );
};

export default OrderPage;