import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBook, FiDollarSign, FiTrendingUp, FiShoppingBag } from 'react-icons/fi';
import axios from 'axios';
import Loading from '../../components/Loading';
import getBaseUrl from '../../utils/baseURL';
import RevenueChart from './RevenueChart';
import '../../styles/shared-gradients.css';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const navigate = useNavigate();

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

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-8 px-3 sm:px-4 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">Welcome to your dashboard</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                        {/* Total Books */}
                        <div className="glass-card rounded-xl p-4 sm:p-6">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-indigo-100/50 dark:bg-indigo-900/30">
                                    <FiBook className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Books</p>
                                    <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{data?.totalBooks || 0}</p>
                                </div>
                            </div>
                        </div>

                        {/* Total Sales */}
                        <div className="glass-card rounded-xl p-4 sm:p-6">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-green-100/50 dark:bg-green-900/30">
                                    <FiDollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Sales</p>
                                    <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">₹{data?.totalSales?.toLocaleString() || 0}</p>
                                </div>
                            </div>
                        </div>

                        {/* Trending Books */}
                        <div className="glass-card rounded-xl p-4 sm:p-6">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-purple-100/50 dark:bg-purple-900/30">
                                    <FiTrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Trending Books</p>
                                    <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{data?.trendingBooks || 0}</p>
                                </div>
                            </div>
                        </div>

                        {/* Total Orders */}
                        <div className="glass-card rounded-xl p-4 sm:p-6">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-blue-100/50 dark:bg-blue-900/30">
                                    <FiShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                                    <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{data?.totalOrders || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 mt-3 sm:mt-6">
                        {/* Revenue Chart */}
                        <div className="glass-card rounded-xl p-4 sm:p-6">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-4">Revenue Overview</h2>
                            <div className="h-60 sm:h-80">
                                <RevenueChart monthlySales={data.monthlySales || []} />
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <div className="glass-card rounded-xl p-4 sm:p-6">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Orders</h2>
                            <div className="space-y-3 sm:space-y-4">
                                {data.monthlySales && data.monthlySales.length > 0 ? (
                                    data.monthlySales.slice(0, 4).map((monthData, index) => (
                                        <div key={monthData._id} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg backdrop-blur-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-indigo-100/50 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <FiShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div>
                                                    <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                                                        {monthData._id}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {monthData.totalOrders} orders
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                                                ₹{monthData.totalSales.toLocaleString()}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                                        No recent orders
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;