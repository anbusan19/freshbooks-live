// src/components/RevenueChart.jsx
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar, FiClock } from 'react-icons/fi';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const RevenueChart = ({ monthlySales = [], weeklySales = [] }) => {
    const [timeframe, setTimeframe] = useState('monthly');
    const [chartData, setChartData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    // Update current time every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const getDataPoints = () => {
            const now = new Date();
            
            if (timeframe === 'weekly') {
                // Create array for all 7 days of the week
                const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const today = new Date();
                const last7Days = Array.from({ length: 7 }, (_, i) => {
                    const date = new Date();
                    date.setDate(today.getDate() - i); // Start from today and go back
                    
                    // Find matching sale data
                    const saleData = weeklySales.find(sale => {
                        const saleDate = new Date(sale.startDate);
                        return saleDate.toDateString() === date.toDateString();
                    });

                    return {
                        label: `${weekdays[date.getDay()]} (${date.getDate()}/${date.getMonth() + 1})`,
                        value: saleData ? saleData.totalSales : 0,
                        date: date
                    };
                }).reverse(); // Reverse to show oldest to newest
                return last7Days;
            } else if (timeframe === 'monthly') {
                // Get current week of the month
                const currentWeek = Math.ceil(now.getDate() / 7);
                
                // Create array for weeks up to current week
                const weeksInMonth = Array.from({ length: currentWeek }, (_, i) => {
                    const weekNumber = i + 1;
                    const weekData = weeklySales.find((sale, index) => {
                        const saleDate = new Date(sale.startDate);
                        return saleDate.getMonth() === now.getMonth() && 
                               Math.ceil(saleDate.getDate() / 7) === weekNumber;
                    });
                    
                    const weekStart = new Date(now.getFullYear(), now.getMonth(), (weekNumber - 1) * 7 + 1);
                    const weekEnd = new Date(now.getFullYear(), now.getMonth(), Math.min(weekNumber * 7, new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()));
                    
                    return {
                        label: `Week ${weekNumber} (${weekStart.getDate()}-${weekEnd.getDate()})`,
                        value: weekData ? weekData.totalSales : 0
                    };
                });
                return weeksInMonth;
            } else {
                // Yearly view - show all 12 months
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                
                if (selectedDate) {
                    const selectedMonth = selectedDate.getMonth();
                    const selectedYear = selectedDate.getFullYear();
                    
                    // Get all weeks in the selected month
                    const weeksInMonth = weeklySales.filter(week => {
                        const weekDate = new Date(week.startDate);
                        return weekDate.getMonth() === selectedMonth && 
                               weekDate.getFullYear() === selectedYear;
                    });

                    // If it's current month, show only up to current week
                    const isCurrentMonth = selectedMonth === now.getMonth() && 
                                         selectedYear === now.getFullYear();
                    const currentWeek = isCurrentMonth ? Math.ceil(now.getDate() / 7) : 
                        Math.ceil(new Date(selectedYear, selectedMonth + 1, 0).getDate() / 7);

                    return Array.from({ length: currentWeek }, (_, i) => {
                        const weekNumber = i + 1;
                        const weekData = weeksInMonth[i];
                        const weekStart = new Date(selectedYear, selectedMonth, (weekNumber - 1) * 7 + 1);
                        const weekEnd = new Date(selectedYear, selectedMonth, Math.min(weekNumber * 7, new Date(selectedYear, selectedMonth + 1, 0).getDate()));
                        
                        return {
                            label: `Week ${weekNumber} (${weekStart.getDate()}-${weekEnd.getDate()})`,
                            value: weekData ? weekData.totalSales : 0
                        };
                    });
                }
                
                // Show all months if no specific month is selected
                return months.map((month, index) => {
                    const monthStr = `${now.getFullYear()}-${String(index + 1).padStart(2, '0')}`;
                    const monthData = monthlySales.find(sale => sale._id === monthStr);
                    
                    return {
                        label: month,
                        value: monthData ? monthData.totalSales : 0
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
                    backgroundColor: dataPoints.map(d => 
                        d.value > 0 ? 'rgba(99, 102, 241, 0.5)' : 'rgba(156, 163, 175, 0.2)'
                    ),
                    borderColor: dataPoints.map(d => 
                        d.value > 0 ? 'rgb(99, 102, 241)' : 'rgb(156, 163, 175)'
                    ),
                    borderWidth: 1,
                    borderRadius: 4,
                    hoverBackgroundColor: dataPoints.map(d => 
                        d.value > 0 ? 'rgba(99, 102, 241, 0.7)' : 'rgba(156, 163, 175, 0.3)'
                    ),
                },
            ],
        });
    }, [timeframe, monthlySales, weeklySales, selectedDate, currentDateTime]);

    const handleTimeframeChange = (newTimeframe) => {
        setTimeframe(newTimeframe);
        if (newTimeframe !== 'yearly') {
            setSelectedDate(null);
        }
    };

    const handleMonthSelect = (date) => {
        setSelectedDate(date);
        setTimeframe('yearly');
    };

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
                    label: (context) => 
                        context.parsed.y > 0 
                            ? `₹${context.parsed.y.toLocaleString()}`
                            : 'No sales',
                },
            },
            datalabels: {
                anchor: 'end',
                align: 'top',
                formatter: (value) => 
                    value > 0 ? `₹${value.toLocaleString()}` : '',
                color: '#6B7280',
                font: {
                    size: 11,
                    weight: 'bold',
                },
                padding: {
                    top: 4,
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
                },
            },
            y: {
                beginAtZero: true,
                max: 12000,
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
                    stepSize: 2000,
                    values: [0, 2000, 4000, 6000, 8000, 10000, 12000]
                },
            },
        },
        animation: {
            duration: 1000,
        },
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 30,
                bottom: 10
            }
        }
    };

    // Custom month selection component
    const MonthPicker = () => {
        const months = [
            ['Jan', 'Feb', 'Mar'],
            ['Apr', 'May', 'Jun'],
            ['Jul', 'Aug', 'Sep'],
            ['Oct', 'Nov', 'Dec']
        ];
        const currentYear = new Date().getFullYear();

        return (
            <div className="absolute top-full mt-1 left-0 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2">
                <div className="grid gap-1">
                    {months.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex gap-1">
                            {row.map((month) => {
                                const date = new Date(currentYear, months.flat().indexOf(month), 1);
                                const isSelected = selectedDate && 
                                    selectedDate.getMonth() === date.getMonth() && 
                                    selectedDate.getFullYear() === date.getFullYear();

                                return (
                                    <button
                                        key={month}
                                        onClick={() => {
                                            handleMonthSelect(date);
                                            setIsMonthPickerOpen(false);
                                        }}
                                        className={`w-16 py-2 text-sm font-medium rounded-lg transition-colors
                                            ${isSelected
                                                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`}
                                    >
                                        {month}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-full">
            <div className="flex flex-col gap-4 mb-4">
                {/* Current Date and Time Display */}
                <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <FiClock className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            {currentDateTime.toLocaleString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    </div>
                </div>

                {/* Timeframe Controls */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleTimeframeChange('weekly')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors
                                ${timeframe === 'weekly'
                                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                        >
                            Weekly
                        </button>
                        <button
                            onClick={() => handleTimeframeChange('monthly')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors
                                ${timeframe === 'monthly'
                                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => handleTimeframeChange('yearly')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors
                                ${timeframe === 'yearly'
                                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                        >
                            Yearly
                        </button>
                        {timeframe === 'yearly' && (
                            <div className="relative">
                                <button
                                    onClick={() => setIsMonthPickerOpen(!isMonthPickerOpen)}
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg
                                             border border-gray-200 dark:border-gray-700 
                                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                                             hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    {selectedDate 
                                        ? selectedDate.toLocaleString('default', { month: 'short' }) 
                                        : 'Select Month'}
                                    <FiCalendar className="text-gray-400" />
                                </button>
                                {isMonthPickerOpen && <MonthPicker />}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="h-[calc(100%-96px)]">
                {chartData && chartData.labels.length > 0 ? (
                    <Bar data={chartData} options={options} />
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