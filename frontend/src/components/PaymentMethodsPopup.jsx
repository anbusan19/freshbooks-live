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
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
                <div className="p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">Payment Methods</h2>
                    
                    {/* Supported Payment Methods */}
                    <div className="mb-8">
                        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <FaCreditCard className="text-green-500" />
                            Supported Payment Methods
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <FaGooglePay className="w-8 h-8 text-blue-600" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">UPI - Google Pay</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <SiPhonepe className="w-8 h-8 text-purple-600" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">UPI - PhonePe</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png" alt="Paytm" className="w-8 h-8 object-contain" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">UPI - Paytm</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <BsCreditCard2Front className="w-8 h-8 text-gray-600" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Credit/Debit Cards</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <FaPaypal className="w-8 h-8 text-blue-700" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Net Banking</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                <FaCreditCard className="w-8 h-8 text-indigo-600" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Digital Wallets</span>
                            </div>
                        </div>
                    </div>

                    {/* Restricted Payment Methods */}
                    <div className="mb-8">
                        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <FaCreditCard className="text-red-500" />
                            Restricted Payment Methods
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                <BsCashStack className="w-8 h-8 text-red-600 dark:text-red-400" />
                                <span className="text-sm text-red-700 dark:text-red-300">Cash/Cheque Payments</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                <TbTruckDelivery className="w-8 h-8 text-red-600 dark:text-red-400" />
                                <span className="text-sm text-red-700 dark:text-red-300">Cash on Delivery</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                <BsCreditCard2Front className="w-8 h-8 text-red-600 dark:text-red-400" />
                                <span className="text-sm text-red-700 dark:text-red-300">EMI</span>
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            All payments are processed securely through Razorpay. Your payment information is never stored on our servers.
                        </p>
                    </div>

                    {/* Close Button */}
                    <div className="flex justify-end">
                        <button 
                            onClick={onClose}
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethodsPopup; 