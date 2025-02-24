import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const ContactPopup = ({ isOpen, onClose }) => {
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
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">Contact Us</h2>
                    
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Get in Touch</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-3">
                                <FiMapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">Visit Us</h4>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        15A, N Mada St, Lalitha Nagar,<br />
                                        Thiruvanmiyur, Chennai,<br />
                                        Tamil Nadu 600041
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <FiPhone className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">Call Us</h4>
                                    <p className="text-gray-600 dark:text-gray-300">+91 9962126356</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <FiMail className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">Email Us</h4>
                                    <p className="text-gray-600 dark:text-gray-300">support@freshbooks.in</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Follow Us</h4>
                            <div className="flex gap-4">
                                <a
                                    href="https://www.facebook.com/freshbooks.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    <FaFacebook className="w-6 h-6" />
                                </a>
                                <a
                                    href="https://x.com/freshbooksindia"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    <FaXTwitter className="w-6 h-6" />
                                </a>
                                <a
                                    href="https://instagram.com/freshbooks.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                                >
                                    <FaInstagram className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPopup; 