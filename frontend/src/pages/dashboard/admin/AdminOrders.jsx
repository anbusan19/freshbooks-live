import React, { useState } from 'react';
import { useGetAllOrdersQuery, useUpdateDeliveryStatusMutation } from '../../../redux/features/orders/ordersApi';
import Loading from '../../../components/Loading';
import { FiPackage, FiCreditCard, FiTruck, FiCheck, FiClock, FiSearch, FiCalendar, FiTag } from 'react-icons/fi';
import OrderStatusProgress from '../../../components/OrderStatusProgress';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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
    const [selectedDate, setSelectedDate] = useState(null);
    const [trackingUrl, setTrackingUrl] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    const getFilteredOrdersByDate = (orders) => {
        if (!selectedDate) return orders;
        
        return orders.filter(order => {
            const orderDate = new Date(order.createdAt);
            return orderDate.toDateString() === selectedDate.toDateString();
        });
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

    const dateFilteredOrders = getFilteredOrdersByDate(filteredOrders);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await updateDeliveryStatus({
                orderId,
                status: newStatus,
                note: `Order status updated to ${newStatus.replace(/_/g, ' ')}`,
                trackingUrl: newStatus === 'out_for_delivery' ? trackingUrl : ''
            }).unwrap();
            setSelectedOrder(null);
            setTrackingUrl('');
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
                    {/* Date Picker */}
                    <div className="relative w-[150px]">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="dd/MM/yyyy"
                            isClearable
                            placeholderText="Select Date"
                            className="px-3 pr-16 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                                     text-sm w-full"
                        />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2">
                            <FiCalendar className="w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

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
                            <p className="text-xl font-semibold text-gray-900 dark:text-white">{dateFilteredOrders.length}</p>
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
                                {dateFilteredOrders.filter(order => order.deliveryStatus === 'delivered').length}
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
                            {dateFilteredOrders.map((order) => (
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
                                                            className="w-12 h-16 object-cover rounded-md shadow-sm"
                                                        />
                                                        <div className="min-w-0 flex-1">
                                                            <p className="font-medium text-gray-900 dark:text-white truncate">
                                                                {item.book.title}
                                                            </p>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                                    ₹{item.price}
                                                                </p>
                                                                <span className="text-sm text-gray-400 dark:text-gray-500">×</span>
                                                                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                                                    {item.quantity || 1}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
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

                                                {/* Price Breakdown */}
                                                <div className="mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                                                        <span className="font-medium">₹{order.subtotal}</span>
                                                    </div>
                                                    
                                                    {order.shippingCharges > 0 && (
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                                                            <span className="font-medium">₹{order.shippingCharges}</span>
                                                        </div>
                                                    )}

                                                    {order.coupon && (
                                                        <div className="flex justify-between text-green-600 dark:text-green-400">
                                                            <span className="flex items-center gap-1">
                                                                <FiTag className="w-4 h-4" />
                                                                Discount ({order.coupon.code}):
                                                            </span>
                                                            <span className="font-medium">-₹{order.coupon.discountAmount}</span>
                                                        </div>
                                                    )}

                                                    <div className="flex justify-between font-medium text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                                                        <span>Total:</span>
                                                        <span>₹{order.totalPrice}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Delivery Status */}
                                            <div>
                                                <p className="text-gray-600 dark:text-gray-400 mb-2">Order Status:</p>
                                                <OrderStatusProgress 
                                                    status={order.deliveryStatus}
                                                    trackingUrl={order.trackingUrl}
                                                />
                                                
                                                {/* Update Status Button */}
                                                <button
                                                    onClick={() => setSelectedOrder(order._id)}
                                                    className="mt-4 w-full px-3 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 
                                                             border border-indigo-200 dark:border-indigo-800 rounded-lg
                                                             hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                                                >
                                                    Update Status
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Update Delivery Status
                        </h3>
                        <div className="space-y-2">
                            {['pending', 'processing', 'out_for_delivery', 'delivered'].map((status) => {
                                const order = orders.find(o => o._id === selectedOrder);
                                const isSelected = selectedStatus === status || (!selectedStatus && order?.deliveryStatus === status);
                                
                                return (
                                    <div key={status}>
                                        <button
                                            onClick={() => {
                                                setSelectedStatus(status);
                                                if (status !== 'out_for_delivery') {
                                                    handleStatusUpdate(selectedOrder, status);
                                                }
                                            }}
                                            className={`w-full px-4 py-2 rounded-lg text-sm font-medium
                                                ${isSelected
                                                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            {status.replace(/_/g, ' ')}
                                        </button>
                                        
                                        {/* Show tracking URL input when out_for_delivery is selected */}
                                        {status === 'out_for_delivery' && selectedStatus === 'out_for_delivery' && (
                                            <div className="mt-2 mb-4">
                                                <input
                                                    type="url"
                                                    value={trackingUrl}
                                                    onChange={(e) => setTrackingUrl(e.target.value)}
                                                    placeholder="Enter tracking URL"
                                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                                                             text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700
                                                             focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                                                             placeholder-gray-400 dark:placeholder-gray-500"
                                                />
                                                <button
                                                    onClick={() => handleStatusUpdate(selectedOrder, 'out_for_delivery')}
                                                    className="mt-2 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium
                                                             hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                                             dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                                >
                                                    Update with Tracking URL
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <button
                            onClick={() => {
                                setSelectedOrder(null);
                                setTrackingUrl('');
                                setSelectedStatus('');
                            }}
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
    );
};

export default AdminOrders; 