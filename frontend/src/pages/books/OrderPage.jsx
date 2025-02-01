import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import Loading from '../../components/Loading';

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
                                            <div className="flex items-center gap-3 sm:gap-4">
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
                                        <div className="grid grid-cols-1 gap-4 sm:gap-6">
                                            {/* Customer Info */}
                                            <div className="space-y-4">
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
                                                        <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200">
                                                            {`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Products */}
                                            <div>
                                                <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                                    Products ({order.productIds.length})
                                                </h4>
                                                <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                                                    <div className="space-y-2">
                                    {order.productIds.map((productId) => (
                                                            <div 
                                                                key={productId}
                                                                className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-gray-700/50"
                                                            >
                                                                <span className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 break-all">
                                                                    {productId}
                                                                </span>
                                                            </div>
                                                        ))}
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
        </div>
    );
};

export default OrderPage;