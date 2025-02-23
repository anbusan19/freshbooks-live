import React from 'react';
import { IoMdClose } from 'react-icons/io';

const PrivacyPolicyPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
                {/* Content */}
                <div className="p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">Privacy Policy</h2>
                    
                    <div className="space-y-6 text-gray-600 dark:text-gray-300">
                        <p className="leading-relaxed">
                            Freshbooks places special focus on maintaining their customers' privacy. We collect personal data to enhance customer experience and to improve our products and services. Following is information regarding how we use the collected data:
                        </p>

                        <section>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">The Data We Collect</h3>
                            <p className="mb-2">Data is collected in the following forms:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Identity data – this includes your name, language, contact information, location, etc.</li>
                                <li>Transaction details – this includes payment or card data, orders and returns, purchase history and details, etc.</li>
                                <li>Geolocation data – If you interact with us using your phones, this data is collected.</li>
                                <li>Commercial Information – If you have subscribed to our newsletter or promotional emailer.</li>
                                <li>Preferences – this includes data pertaining to your tastes and preferences.</li>
                                <li>Browser information and IP address</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Data Usage</h3>
                            <p>Your data will be used by us primarily for:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Managing your registration</li>
                                <li>Processing your purchases of our products and services</li>
                                <li>Responding to your queries and clearing your doubts</li>
                                <li>Sending customized communications (if opted in)</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Information Sharing</h3>
                            <p>Freshbooks handles personal data with immense sensitivity. We share information only when:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Required by reliable partners (with confidentiality agreements)</li>
                                <li>Required by the court of law</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Security & Confidentiality</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Encryption protocols for data transmission</li>
                                <li>PCI DSS compliance for payment handling</li>
                                <li>Additional security features against unauthorized access</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Your Choices</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Opt out of newsletter and email services</li>
                                <li>Update or modify your information</li>
                                <li>Adjust advertising preferences</li>
                                <li>Manage cookie preferences</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Contact Us</h3>
                            <p className="mb-4">For any privacy-related concerns or to update your information, you can reach us at:</p>
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

export default PrivacyPolicyPopup; 