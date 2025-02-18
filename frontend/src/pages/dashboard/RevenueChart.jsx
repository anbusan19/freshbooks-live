// src/components/RevenueChart.jsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const RevenueChart = ({ monthlySales = [], weeklySales = [] }) => {
    const [timeframe, setTimeframe] = useState('monthly');
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const getDataPoints = () => {
            if (timeframe === 'weekly') {
                if (!weeklySales || weeklySales.length === 0) return [];
                return [...weeklySales].reverse().map(week => ({
                    label: week._id,
                    value: week.totalSales || 0
                }));
            } else {
                if (!monthlySales || monthlySales.length === 0) return [];
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return [...monthlySales].reverse().map(month => {
                    const [year, monthNum] = month._id.split('-');
                    const monthName = monthNames[parseInt(monthNum) - 1];
                    return {
                        label: `${monthName} ${year}`,
                        value: month.totalSales || 0
                    };
                });
            }
        };

        const dataPoints = getDataPoints();
        
        setChartData({
            labels: dataPoints.map(d => d.label),
            datasets: [
                {
                    label: 'Revenue',
                    data: dataPoints.map(d => d.value),
                    fill: true,
                    backgroundColor: (context) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
                        gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
                        return gradient;
                    },
                    borderColor: 'rgb(99, 102, 241)',
                    tension: 0.4,
                    pointBackgroundColor: 'rgb(99, 102, 241)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                },
            ],
        });
    }, [timeframe, monthlySales, weeklySales]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleColor: '#fff',
                titleFont: {
                    size: 14,
                    weight: 'bold',
                },
                bodyFont: {
                    size: 13,
                },
                displayColors: false,
                callbacks: {
                    label: (context) => `₹${context.parsed.y.toLocaleString()}`,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#9CA3AF',
                    font: {
                        size: 12,
                    },
                    maxRotation: 45,
                    minRotation: 45,
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(156, 163, 175, 0.1)',
                    drawBorder: false,
                },
                border: {
                    dash: [5, 5],
                },
                ticks: {
                    color: '#9CA3AF',
                    font: {
                        size: 12,
                    },
                    padding: 10,
                    callback: (value) => `₹${value.toLocaleString()}`,
                    maxTicksLimit: 5,
                },
                min: 0,
                suggestedMax: function(context) {
                    const values = context.chart.data.datasets[0].data;
                    const max = Math.max(...values);
                    return max + (max * 0.1); // Add 10% padding to the top
                },
            },
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
        animation: {
            duration: 1000,
        },
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            }
        },
    };

    return (
        <div className="w-full h-full">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setTimeframe('weekly')}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors
                            ${timeframe === 'weekly'
                                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={() => setTimeframe('monthly')}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors
                            ${timeframe === 'monthly'
                                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                    >
                        Monthly
                    </button>
                </div>
            </div>
            <div className="h-[calc(100%-48px)]">
                {chartData && chartData.labels.length > 0 ? (
                    <Line data={chartData} options={options} />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500 dark:text-gray-400">No data available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RevenueChart;