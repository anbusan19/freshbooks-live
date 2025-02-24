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
import { FiCalendar } from 'react-icons/fi';

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

    useEffect(() => {
        const getDataPoints = () => {
            if (timeframe === 'weekly') {
                // Create array for all 7 days of the week
                const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const today = new Date();
                const last7Days = weekdays.map((day, index) => {
                    const date = new Date(today);
                    date.setDate(today.getDate() - (6 - index)); // Start from 6 days ago
                    
                    // Find matching sale data
                    const saleData = weeklySales.find(sale => {
                        const saleDate = new Date(sale.startDate);
                        return saleDate.toDateString() === date.toDateString();
                    });

                    return {
                        label: day,
                        value: saleData ? saleData.totalSales : 0,
                        date: date
                    };
                });
                return last7Days;
            } else if (timeframe === 'monthly') {
                // Create array for all 4 weeks
                const last4Weeks = Array.from({ length: 4 }, (_, i) => {
                    const weekNumber = i + 1;
                    
                    // Find matching sale data
                    const saleData = weeklySales[i];

                    return {
                        label: `Week ${weekNumber}`,
                        value: saleData ? saleData.totalSales : 0
                    };
                });
                return last4Weeks;
            } else {
                // Yearly view - show all 12 months
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                
                // If a month is selected, filter data for that month
                if (selectedDate) {
                    const selectedMonth = selectedDate.getMonth();
                    const selectedYear = selectedDate.getFullYear();
                    
                    // Get the current date
                    const currentDate = new Date();
                    const isCurrentMonth = selectedMonth === currentDate.getMonth() && 
                                         selectedYear === currentDate.getFullYear();
                    
                    // Calculate which week of the month we are in
                    const currentWeek = isCurrentMonth ? 
                        Math.ceil((currentDate.getDate()) / 7) : 4;

                    // Get all weeks that fall within the selected month
                    const weeksInMonth = weeklySales.filter(week => {
                        const weekDate = new Date(week.startDate);
                        return weekDate.getMonth() === selectedMonth && 
                               weekDate.getFullYear() === selectedYear;
                    });

                    // Create array for all weeks up to current week
                    return Array.from({ length: currentWeek }, (_, i) => {
                        const weekNumber = i + 1;
                        const weekData = weeksInMonth.find((_, index) => index === i);
                        
                        return {
                            label: `Week ${weekNumber}`,
                            value: weekData ? weekData.totalSales : 0
                        };
                    });
                }
                
                // Show all months if no specific month is selected
                return months.map((month, index) => {
                    const monthStr = `${new Date().getFullYear()}-${String(index + 1).padStart(2, '0')}`;
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
    }, [timeframe, monthlySales, weeklySales, selectedDate]);

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
                    // Set fixed steps of 2000
                    stepSize: 2000,
                    // Include specific values
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
        },
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
            <div className="flex items-center justify-between mb-4">
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
            <div className="h-[calc(100%-48px)]">
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