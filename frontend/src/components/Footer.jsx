import React, { useState } from 'react'
import { FaFacebook, FaInstagram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { FaWhatsapp } from "react-icons/fa"
import { Link, useLocation } from 'react-router-dom'
import navbarLogo from "../assets/freshbooks-footer-logo.png"
import PrivacyPolicyPopup from './PrivacyPolicyPopup'
import PaymentMethodsPopup from './PaymentMethodsPopup'
import TermsOfServicePopup from './TermsOfServicePopup'
import ContactPopup from './ContactPopup'
import ReturnPolicyModal from './ReturnPolicyModal'

const Footer = () => {
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isPaymentMethodsOpen, setIsPaymentMethodsOpen] = useState(false);
  const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isReturnPolicyOpen, setIsReturnPolicyOpen] = useState(false);
  const [isCareerPopupOpen, setIsCareerPopupOpen] = useState(false);
  const [isFranchisePopupOpen, setIsFranchisePopupOpen] = useState(false);
  const location = useLocation();

  // Add bottom padding only for the books page
  const isAllBooksPage = location.pathname === '/books';
  const bottomPaddingClass = isAllBooksPage ? 'pb-24 sm:pb-20' : 'pb-6 sm:pb-8';

  return (
    <>
      <footer className="bg-white dark:bg-gray-900 relative z-30">
        <div className="max-w-[1920px] mx-auto w-full px-2 sm:px-4 lg:px-6 py-6 lg:py-8">
          <div className="md:flex md:justify-between gap-12">
            {/* Logo Section */}
            <div className="mb-6 md:mb-0 max-w-xs">
              <Link to="/" className="flex items-center">
                <img src={navbarLogo} className="h-12 w-auto" alt="Freshbooks Logo" />
              </Link>
              <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Discover a world of books at your fingertips. Your one-stop destination for all your reading needs.
              </p>
            </div>

            {/* Footer Links Grid */}
            <div className="grid grid-cols-2 gap-8 sm:gap-12 sm:grid-cols-5 pr-4">
              {/* Categories */}
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Categories</h2>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li>
                    <Link to="/category/self-development" className="hover:text-blue-600 transition-colors">Self Development</Link>
                  </li>
                  <li>
                    <Link to="/category/business" className="hover:text-blue-600 transition-colors">Business</Link>
                  </li>
                  <li>
                    <Link to="/category/mystery-thriller" className="hover:text-blue-600 transition-colors">Mystery & Crime Thriller</Link>
                  </li>
                  <li>
                    <Link to="/category/romance" className="hover:text-blue-600 transition-colors">Romance Novels</Link>
                  </li>
                  <li>
                    <Link to="/category/kids" className="hover:text-blue-600 transition-colors">Kids Books</Link>
                  </li>
                </ul>
              </div>

              {/* Useful Links */}
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Useful Links</h2>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li>
                    <Link to="/dashboard" className="hover:text-blue-600 transition-colors">My Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/wishlist" className="hover:text-blue-600 transition-colors">My Wishlist</Link>
                  </li>
                  <li>
                    <Link to="/orders" className="hover:text-blue-600 transition-colors">My Orders</Link>
                  </li>
                  <li>
                    <Link to="/orders" className="hover:text-blue-600 transition-colors">Track Order</Link>
                  </li>
                  <li>
                    <button onClick={() => setIsCareerPopupOpen(true)} className="hover:text-blue-600 transition-colors text-sm">Career</button>
                  </li>
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Quick Links</h2>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li>
                    <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                  </li>
                  <li>
                    <Link to="/books" className="hover:text-blue-600 transition-colors">All Books</Link>
                  </li>
                  <li>
                    <button onClick={() => setIsContactOpen(true)} className="hover:text-blue-600 transition-colors text-sm">Contact Us</button>
                  </li>
                  <li>
                    <button onClick={() => setIsFranchisePopupOpen(true)} className="hover:text-blue-600 transition-colors text-sm">Become a Franchisee</button>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <li>
                    <button onClick={() => setIsPrivacyPolicyOpen(true)} className="hover:text-blue-600 transition-colors text-sm">Privacy Policy</button>
                  </li>
                  <li>
                    <button onClick={() => setIsTermsOfServiceOpen(true)} className="hover:text-blue-600 transition-colors text-sm">Terms of Service</button>
                  </li>
                  <li>
                    <button onClick={() => setIsReturnPolicyOpen(true)} className="hover:text-blue-600 transition-colors text-sm">Return Policy</button>
                  </li>
                  <li>
                    <button onClick={() => setIsPaymentMethodsOpen(true)} className="hover:text-blue-600 transition-colors text-sm">Payment Methods</button>
                  </li>
                </ul>
              </div>

              {/* Chat with Us */}
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Chat with Us</h2>
                <a
                  href="https://wa.me/+919962126356"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  <span className="ml-2 text-sm whitespace-nowrap">Support</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-200 dark:border-gray-700" />
          
        <div className={`mx-auto w-full max-w-screen-xl px-2 sm:px-4 lg:px-6 ${bottomPaddingClass}`}>
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} freshbooks™. All rights reserved. | Crafted by <b>Softrate Technologies (P) Ltd.</b>
            </span>
            
            {/* Social Links */}
            <div className="flex mt-4 sm:mt-0 space-x-6">
              <a href="https://www.facebook.com/freshbooks.in" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="https://x.com/freshbooksindia" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/freshbooks.in" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-white transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Popups */}
      <PrivacyPolicyPopup 
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
      />
      <PaymentMethodsPopup 
        isOpen={isPaymentMethodsOpen}
        onClose={() => setIsPaymentMethodsOpen(false)}
      />
      <TermsOfServicePopup 
        isOpen={isTermsOfServiceOpen}
        onClose={() => setIsTermsOfServiceOpen(false)}
      />
      <ContactPopup 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <ReturnPolicyModal 
        isOpen={isReturnPolicyOpen}
        onClose={() => setIsReturnPolicyOpen(false)}
      />
      
      {/* Career Popup */}
      {isCareerPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Join Our Team</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Are you passionate about books and technology? At Freshbooks, we're building the future of online book retail.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We're looking for talented individuals who share our vision of making books accessible to everyone.
            </p>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Send your resume to: <a href="mailto:careers@freshbooks.com" className="text-blue-600 hover:underline">careers@freshbooks.com</a>
            </p>
            <button
              onClick={() => setIsCareerPopupOpen(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Franchise Popup */}
      {isFranchisePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Become A Freshbooks Partner</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Why Partner With Us?</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Access to extensive book collection
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    State-of-the-art inventory management system
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Marketing and operational support
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Proven business model
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl mb-4 text-gray-800 dark:text-white">Start Your Journey With Us</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Join India's fastest-growing online bookstore network. Partner with Freshbooks and be part of the digital reading revolution.
                </p>
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                  For partnership inquiries, contact us at: <a href="mailto:franchise@freshbooks.com" className="text-blue-600 hover:underline">franchise@freshbooks.com</a>
                </p>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mr-4"
                  onClick={() => window.location.href = 'mailto:franchise@freshbooks.com'}
                >
                  Send Inquiry
                </button>
                <button
                  onClick={() => setIsFranchisePopupOpen(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Footer