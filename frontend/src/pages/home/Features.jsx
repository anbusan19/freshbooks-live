import React from 'react';
import { FiTruck, FiAward, FiClock, FiShield, FiBookOpen, FiCreditCard } from 'react-icons/fi';

const features = [
    {
        icon: FiTruck,
        title: "Free Delivery",
        description: "Free shipping on all orders over ₹1000"
    },
    {
        icon: FiAward,
        title: "Best Quality",
        description: "Curated collection of premium books"
    },
    {
        icon: FiClock,
        title: "24/7 Support",
        description: "Round the clock customer service"
    },
    {
        icon: FiShield,
        title: "Secure Payment",
        description: "100% secure payment methods"
    },
    {
        icon: FiBookOpen,
        title: "Wide Selection",
        description: "Thousands of titles to choose from"
    },
    {
        icon: FiCreditCard,
        title: "Easy Returns",
        description: "Hassle-free 3-day returns"
    }
];

const Features = () => {
    return (
        <div className='py-16 px-4 relative'>
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="gradient-blob gradient-blob-1 animate-blob-slow"></div>
                <div className="gradient-blob gradient-blob-2 animate-blob-slow animation-delay-2000"></div>
                <div className="gradient-blob gradient-blob-3 animate-blob-slow animation-delay-4000"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
                        Why Choose Us
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Experience the best online bookstore with our premium services and features
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-4 sm:p-6
                                     border border-gray-200/20 dark:border-gray-700/20
                                     hover:transform hover:-translate-y-1 transition-all duration-300
                                     hover:shadow-xl hover:shadow-indigo-500/10"
                        >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg
                                          flex items-center justify-center mb-3 sm:mb-4">
                                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-1 sm:mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features; 