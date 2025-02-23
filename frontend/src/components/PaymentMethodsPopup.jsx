import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaCreditCard, FaGooglePay, FaPaypal } from 'react-icons/fa';
import { SiPaytm, SiPhonepe } from 'react-icons/si';
import { BsCashStack, BsCreditCard2Front } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';

const PaymentMethodsPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                    <IoMdClose size={24} />
                </button>

                {/* Content */}
                <div className="p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">Payment Methods</h2>
                    
                    {/* Supported Payment Methods */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <FaCreditCard className="text-green-500" />
                            Supported Payment Methods
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <FaGooglePay className="w-6 h-6 text-blue-600" />
                                <span className="text-gray-700 dark:text-gray-300">UPI - Google Pay</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <SiPhonepe className="w-6 h-6 text-purple-600" />
                                <span className="text-gray-700 dark:text-gray-300">UPI - PhonePe</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <SiPaytm className="w-6 h-6 text-blue-500" />
                                <span className="text-gray-700 dark:text-gray-300">UPI - Paytm</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <BsCreditCard2Front className="w-6 h-6 text-gray-600" />
                                <span className="text-gray-700 dark:text-gray-300">Credit/Debit Cards</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <FaPaypal className="w-6 h-6 text-blue-700" />
                                <span className="text-gray-700 dark:text-gray-300">Net Banking</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <FaCreditCard className="w-6 h-6 text-indigo-600" />
                                <span className="text-gray-700 dark:text-gray-300">Digital Wallets</span>
                            </div>
                        </div>
                    </div>

                    {/* Restricted Payment Methods */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <FaCreditCard className="text-red-500" />
                            Restricted Payment Methods
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                <BsCashStack className="w-6 h-6 text-red-600 dark:text-red-400" />
                                <span className="text-red-700 dark:text-red-300">Cash/Cheque Payments</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                <TbTruckDelivery className="w-6 h-6 text-red-600 dark:text-red-400" />
                                <span className="text-red-700 dark:text-red-300">Cash on Delivery</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                <BsCreditCard2Front className="w-6 h-6 text-red-600 dark:text-red-400" />
                                <span className="text-red-700 dark:text-red-300">EMI</span>
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            All payments are processed securely through Razorpay. Your payment information is never stored on our servers.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethodsPopup; 