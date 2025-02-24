import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBook, FiTrendingUp, FiShoppingBag } from 'react-icons/fi';
import { BiRupee } from 'react-icons/bi';
import axios from 'axios';
import Loading from '../../components/Loading';
import getBaseUrl from '../../utils/baseURL';
import RevenueChart from './RevenueChart';
import '../../styles/shared-gradients.css';
import RecentOrders from './RecentOrders';
import { useGetAllOrdersQuery } from '../../redux/features/orders/ordersApi';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const { data: orders = [], isLoading } = useGetAllOrdersQuery();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/api/admin`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Loading />;

    // Calculate monthly and weekly sales data
    const calculateSales = () => {
        const monthlySales = [];
        const weeklySales = [];
        const now = new Date();

        // Process orders for sales data
        orders.forEach(order => {
            const orderDate = new Date(order.createdAt);
            const monthStr = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}`;
            
            // Monthly sales
            const monthIndex = monthlySales.findIndex(m => m._id === monthStr);
            if (monthIndex === -1) {
                monthlySales.push({ _id: monthStr, totalSales: order.totalPrice });
            } else {
                monthlySales[monthIndex].totalSales += order.totalPrice;
            }

            // Weekly sales (only for current month)
            if (orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear()) {
                const weekStart = new Date(orderDate);
                weekStart.setDate(orderDate.getDate() - orderDate.getDay()); // Start of the week (Sunday)
                const weekStr = weekStart.toISOString();

                const weekIndex = weeklySales.findIndex(w => w.startDate === weekStr);
                if (weekIndex === -1) {
                    weeklySales.push({ startDate: weekStr, totalSales: order.totalPrice });
                } else {
                    weeklySales[weekIndex].totalSales += order.totalPrice;
                }
            }
        });

        return { monthlySales, weeklySales };
    };

    const { monthlySales, weeklySales } = calculateSales();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-3 sm:py-8 px-2 sm:px-4 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10">
                    {/* Header */}
                    <div className="mb-4 sm:mb-6">
                        <h1 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>
                        <p className="text-xs sm:text-base text-gray-600 dark:text-gray-300 mt-1">Welcome to your dashboard</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-6 mb-3 sm:mb-6">
                        {/* Total Books */}
                        <div className="glass-card rounded-lg sm:rounded-xl p-3 sm:p-6">
                            <div className="flex items-center gap-2 sm:gap-4">
                                <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-indigo-100/50 dark:bg-indigo-900/30">
                                    <FiBook className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Books</p>
                                    <p className="text-base sm:text-2xl font-bold text-gray-900 dark:text-white">{data?.totalBooks || 0}</p>
                                </div>
                            </div>
                        </div>

                        {/* Total Sales */}
                        <div className="glass-card rounded-lg sm:rounded-xl p-3 sm:p-6">
                            <div className="flex items-center gap-2 sm:gap-4">
                                <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-green-100/50 dark:bg-green-900/30">
                                    <BiRupee className="w-4 h-4 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Sales</p>
                                    <p className="text-base sm:text-2xl font-bold text-gray-900 dark:text-white">₹{data?.totalSales?.toLocaleString() || 0}</p>
                                </div>
                            </div>
                        </div>

                        {/* Trending Books */}
                        <div className="glass-card rounded-lg sm:rounded-xl p-3 sm:p-6">
                            <div className="flex items-center gap-2 sm:gap-4">
                                <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-purple-100/50 dark:bg-purple-900/30">
                                    <FiTrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Trending Books</p>
                                    <p className="text-base sm:text-2xl font-bold text-gray-900 dark:text-white">{data?.trendingBooks || 0}</p>
                                </div>
                            </div>
                        </div>

                        {/* Total Orders */}
                        <div className="glass-card rounded-lg sm:rounded-xl p-3 sm:p-6">
                            <div className="flex items-center gap-2 sm:gap-4">
                                <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-blue-100/50 dark:bg-blue-900/30">
                                    <FiShoppingBag className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                                    <p className="text-base sm:text-2xl font-bold text-gray-900 dark:text-white">{data?.totalOrders || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-6">
                        {/* Revenue Chart */}
                        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Overview</h2>
                            <div className="h-[400px]">
                                <RevenueChart monthlySales={monthlySales} weeklySales={weeklySales} />
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <div className="lg:col-span-1">
                            <RecentOrders orders={orders} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;