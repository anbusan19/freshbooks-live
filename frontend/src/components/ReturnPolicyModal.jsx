import React, { useEffect } from 'react';
import { FiX, FiPackage, FiAlertTriangle, FiClock, FiCheck } from 'react-icons/fi';

const ReturnPolicyModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 overflow-y-auto">
            <div className="relative min-h-screen flex items-center justify-center p-4 w-full">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl my-8">
                    <div className="max-h-[90vh] overflow-y-auto">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <FiX className="w-5 h-5" />
                        </button>

                        {/* Header */}
                        <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Return Policy</h2>
                            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                We want you to be completely satisfied with your purchase. Here's what you need to know about our return policy.
                            </p>
                        </div>

                        {/* Content */}
                        <div className="p-6 sm:p-8 space-y-8">
                            {/* Eligibility */}
                            <div className="space-y-3">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                    <FiCheck className="text-green-500 flex-shrink-0" />
                                    Return Eligibility
                                </h3>
                                <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 dark:text-gray-300 space-y-2 ml-6">
                                    <li>Returns are accepted within 3 days of delivery</li>
                                    <li>Book must be in original condition</li>
                                    <li>Original packaging should be intact</li>
                                    <li>Proof of purchase (order ID) is required</li>
                                </ul>
                            </div>

                            {/* Valid Reasons */}
                            <div className="space-y-3">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                    <FiPackage className="text-indigo-500 flex-shrink-0" />
                                    Valid Reasons for Return
                                </h3>
                                <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 dark:text-gray-300 space-y-2 ml-6">
                                    <li>Damaged book received</li>
                                    <li>Wrong book delivered</li>
                                    <li>Missing pages or printing defects</li>
                                    <li>Book not as described</li>
                                </ul>
                            </div>

                            {/* Process */}
                            <div className="space-y-3">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                    <FiClock className="text-blue-500 flex-shrink-0" />
                                    Return Process
                                </h3>
                                <ol className="list-decimal list-inside text-sm sm:text-base text-gray-600 dark:text-gray-300 space-y-2 ml-6">
                                    <li>Initiate return from your order details</li>
                                    <li>Select the reason for return</li>
                                    <li>Pack the book securely</li>
                                    <li>Our delivery partner will pick up the book</li>
                                    <li>Refund will be processed after inspection</li>
                                </ol>
                            </div>

                            {/* Important Notes */}
                            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
                                <h3 className="text-base sm:text-lg font-semibold text-yellow-800 dark:text-yellow-400 flex items-center gap-2 mb-2">
                                    <FiAlertTriangle className="text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                                    Important Notes
                                </h3>
                                <ul className="list-disc list-inside text-sm text-yellow-800 dark:text-yellow-300 space-y-2 ml-6">
                                    <li>Returns must be initiated within 3 days of delivery</li>
                                    <li>Refunds will be processed to the original payment method</li>
                                    <li>Damaged items due to customer handling are not eligible for return</li>
                                </ul>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 sm:p-8 border-t border-gray-200 dark:border-gray-700 flex justify-end">
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
        </div>
    );
};

export default ReturnPolicyModal; 