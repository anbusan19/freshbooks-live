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
            }
        };
        fetchData();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="space-y-6 animate-fadeIn relative">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="gradient-blob gradient-blob-1"></div>
                <div className="gradient-blob gradient-blob-2"></div>
                <div className="gradient-blob gradient-blob-3"></div>
                
                {/* Floating Bubbles */}
                <div className="aural-bubble aural-bubble-1"></div>
                <div className="aural-bubble aural-bubble-2"></div>
                <div className="aural-bubble aural-bubble-3"></div>
                <div className="aural-bubble aural-bubble-4"></div>
                <div className="aural-bubble aural-bubble-5"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">Welcome to your dashboard</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Books */}
                    <div className="glass-card rounded-xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-100/50 dark:bg-indigo-900/30">
                                <FiBook className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Books</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{data?.totalBooks}</p>
                            </div>
                        </div>
                    </div>

                    {/* Total Sales */}
                    <div className="glass-card rounded-xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-green-100/50 dark:bg-green-900/30">
                                <FiDollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sales</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">${data?.totalSales}</p>
                            </div>
                        </div>
                    </div>

                    {/* Trending Books */}
                    <div className="glass-card rounded-xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-purple-100/50 dark:bg-purple-900/30">
                                <FiTrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Trending Books</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{data?.trendingBooks}</p>
                                    <span className="text-sm font-medium text-green-600 dark:text-green-400">+13%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Total Orders */}
                    <div className="glass-card rounded-xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100/50 dark:bg-blue-900/30">
                                <FiShoppingBag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{data?.totalOrders}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Revenue Chart */}
                    <div className="glass-card rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Revenue Overview</h2>
                        <div className="h-80">
                            <RevenueChart />
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="glass-card rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Orders</h2>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((_, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg backdrop-blur-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-100/50 dark:bg-indigo-900/30 flex items-center justify-center">
                                            <FiShoppingBag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">Order #{(1000 + index).toString()}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">2 mins ago</p>
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">$149.99</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;