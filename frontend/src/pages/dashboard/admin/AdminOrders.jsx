import React, { useState } from 'react';
import { useGetAllOrdersQuery, useUpdateDeliveryStatusMutation } from '../../../redux/features/orders/ordersApi';
import Loading from '../../../components/Loading';
import { FiPackage, FiCreditCard, FiTruck, FiCheck, FiClock, FiSearch } from 'react-icons/fi';

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

const AdminOrders = () => {
    const { data: orders = [], isLoading, isError } = useGetAllOrdersQuery();
    const [updateDeliveryStatus] = useUpdateDeliveryStatusMutation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [timePeriod, setTimePeriod] = useState('all');

    const getFilteredOrdersByTime = (orders) => {
        const currentDate = new Date();
        const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);

        switch (timePeriod) {
            case 'week':
                return orders.filter(order => new Date(order.createdAt) >= oneWeekAgo);
            case 'month':
                return orders.filter(order => new Date(order.createdAt) >= oneMonthAgo);
            default:
                return orders;
        }
    };

    const filteredOrders = orders.filter(order => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
            order.name?.toLowerCase().includes(searchLower) ||
            order.email?.toLowerCase().includes(searchLower) ||
            order._id?.toLowerCase().includes(searchLower) ||
            order.phone?.includes(searchTerm) ||
            order.address?.city?.toLowerCase().includes(searchLower) ||
            order.address?.state?.toLowerCase().includes(searchLower) ||
            order.address?.country?.toLowerCase().includes(searchLower) ||
            order.address?.zipcode?.includes(searchTerm) ||
            order.productIds?.some(book => book.title?.toLowerCase().includes(searchLower));

        const matchesStatus = filterStatus === 'all' ? true : order.deliveryStatus === filterStatus;
        
        return matchesSearch && matchesStatus;
    });

    const timeFilteredOrders = getFilteredOrdersByTime(filteredOrders);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await updateDeliveryStatus({
                orderId,
                status: newStatus,
                note: `Order status updated to ${newStatus.replace(/_/g, ' ')}`
            }).unwrap();
            setSelectedOrder(null);
        } catch (error) {
            console.error('Failed to update delivery status:', error);
        }
    };

    if (isLoading) return <Loading />;
    if (isError) return (
        <div className="min-h-[60vh] flex items-center justify-center text-red-500 dark:text-red-400">
            Error getting orders data
        </div>
    );

    return (
        <div className="p-6 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Orders Management</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">View and manage all customer orders</p>
                </div>
                
                {/* Search and Filter Section */}
                <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
                    {/* Time Period Filter */}
                    <select
                        value={timePeriod}
                        onChange={(e) => setTimePeriod(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                                 text-sm"
                    >
                        <option value="all">All Time</option>
                        <option value="week">Past Week</option>
                        <option value="month">Past Month</option>
                    </select>

                    {/* Status Filter */}
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                                 text-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                    </select>

                    {/* Search Bar */}
                    <div className="relative flex-1 sm:w-72">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                                     placeholder-gray-500 dark:placeholder-gray-400"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                            <FiPackage className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Filtered Orders</p>
                            <p className="text-xl font-semibold text-gray-900 dark:text-white">{timeFilteredOrders.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                            <FiCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Delivered Orders</p>
                            <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                {timeFilteredOrders.filter(order => order.deliveryStatus === 'delivered').length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order Details</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer Info</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Books</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment & Delivery</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {timeFilteredOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm">
                                            <p className="font-medium text-gray-900 dark:text-white">#{order._id.slice(-8)}</p>
                                            <p className="text-gray-600 dark:text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            <p className="text-gray-900 dark:text-white font-medium mt-1">₹{order.totalPrice}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm">
                                            <p className="font-medium text-gray-900 dark:text-white">{order.name}</p>
                                            <p className="text-gray-600 dark:text-gray-400">{order.email}</p>
                                            <p className="text-gray-600 dark:text-gray-400">{order.phone}</p>
                                            <div className="text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                                                <p>{order.address.houseNo}, {order.address.street}</p>
                                                <p>{order.address.area}</p>
                                                <p>{order.address.city}, {order.address.state}</p>
                                                <p>{order.address.country}</p>
                                                <p>PIN: {order.address.zipcode}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-3">
                                            {order.productIds.map((book) => (
                                                <div key={book._id} className="flex items-center gap-3">
                                                    <img 
                                                        src={book.coverImage} 
                                                        alt={book.title}
                                                        className="w-12 h-16 object-cover rounded-md shadow-sm"
                                                    />
                                                    <div className="text-sm">
                                                        <p className="font-medium text-gray-900 dark:text-white">{book.title}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm space-y-4">
                                            {/* Payment Details */}
                                            <div>
                                                <p className="text-gray-600 dark:text-gray-400">Payment ID:</p>
                                                <p className="font-medium text-gray-900 dark:text-white">{order.paymentId}</p>
                                                <span className={`inline-flex mt-2 px-2 py-1 text-xs font-medium rounded-full
                                                    ${order.paymentStatus === 'completed' 
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                    }`}>
                                                    {order.paymentStatus}
                                                </span>
                                            </div>

                                            {/* Delivery Status */}
                                            <div>
                                                <p className="text-gray-600 dark:text-gray-400 mb-2">Delivery Status:</p>
                                                <DeliveryStatusBadge status={order.deliveryStatus} />
                                                
                                                {/* Update Status Button */}
                                                <button
                                                    onClick={() => setSelectedOrder(order._id)}
                                                    className="mt-2 w-full px-3 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 
                                                             border border-indigo-200 dark:border-indigo-800 rounded-lg
                                                             hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                                                >
                                                    Update Status
                                                </button>

                                                {/* Status Update Modal */}
                                                {selectedOrder === order._id && (
                                                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                                                Update Delivery Status
                                                            </h3>
                                                            <div className="space-y-2">
                                                                {['pending', 'processing', 'out_for_delivery', 'delivered'].map((status) => (
                                                                    <button
                                                                        key={status}
                                                                        onClick={() => handleStatusUpdate(order._id, status)}
                                                                        className={`w-full px-4 py-2 rounded-lg text-sm font-medium
                                                                                  ${order.deliveryStatus === status
                                                                                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200'
                                                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                                                  }`}
                                                                    >
                                                                        {status.replace(/_/g, ' ')}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                            <button
                                                                onClick={() => setSelectedOrder(null)}
                                                                className="mt-4 w-full px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400
                                                                         border border-gray-200 dark:border-gray-700 rounded-lg
                                                                         hover:bg-gray-50 dark:hover:bg-gray-700"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders; 