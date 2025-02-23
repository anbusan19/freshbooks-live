import React from 'react';
import { IoMdClose } from 'react-icons/io';

const TermsOfServicePopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
                {/* Content */}
                <div className="p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">Terms of Service</h2>
                    
                    <div className="space-y-6 text-gray-600 dark:text-gray-300">
                        <section>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">1. Acceptance of Terms</h3>
                            <p className="mb-4">
                                By accessing and using Freshbooks, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">2. User Accounts</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>You must be at least 13 years old to use our services</li>
                                <li>You are responsible for maintaining the confidentiality of your account</li>
                                <li>You agree to provide accurate and complete information</li>
                                <li>You are responsible for all activities under your account</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">3. Purchase and Payment Terms</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>All prices are in Indian Rupees (₹) and include applicable taxes</li>
                                <li>Payment must be made through our approved payment methods</li>
                                <li>Orders are subject to availability and confirmation</li>
                                <li>We reserve the right to refuse or cancel any order</li>
                                <li>Digital content purchases are non-refundable unless required by law</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">4. Shipping and Delivery</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Delivery times are estimates and not guaranteed</li>
                                <li>Shipping costs are calculated based on delivery location</li>
                                <li>Risk of loss transfers upon delivery to the carrier</li>
                                <li>You are responsible for providing accurate shipping information</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">5. Returns and Refunds</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Returns accepted within 7 days of delivery</li>
                                <li>Books must be in original condition</li>
                                <li>Refunds processed through original payment method</li>
                                <li>Shipping costs for returns are buyer's responsibility</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">6. Intellectual Property</h3>
                            <p className="mb-4">
                                All content on Freshbooks, including text, graphics, logos, and software, is protected by copyright and other intellectual property laws.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">7. Prohibited Activities</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Using the service for illegal purposes</li>
                                <li>Attempting to gain unauthorized access</li>
                                <li>Interfering with service operation</li>
                                <li>Sharing account credentials</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">8. Limitation of Liability</h3>
                            <p className="mb-4">
                                Freshbooks is not liable for any indirect, incidental, special, or consequential damages arising from the use of our services.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">9. Changes to Terms</h3>
                            <p className="mb-4">
                                We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">10. Contact Information</h3>
                            <p className="mb-4">
                                For questions about these Terms of Service, please contact us at:
                            </p>
                            <div className="space-y-2">
                                <p><strong>Address:</strong> 15A, N Mada St, Lalitha Nagar, Thiruvanmiyur, Chennai, Tamil Nadu 600041</p>
                                <p><strong>Phone:</strong> +91 9962126356</p>
                                <p><strong>Email:</strong> support@freshbooks.in</p>
                            </div>
                        </section>
                    </div>

                    {/* Close Button */}
                    <div className="mt-8 flex justify-end">
                        <button 
                            onClick={onClose}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfServicePopup; 