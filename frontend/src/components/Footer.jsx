import React, { useState } from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import { Link } from 'react-router-dom'
import navbarLogo from "../assets/freshbooks-navbar-logo.png"
import PrivacyPolicyPopup from './PrivacyPolicyPopup'
import PaymentMethodsPopup from './PaymentMethodsPopup'
import TermsOfServicePopup from './TermsOfServicePopup'
import ContactPopup from './ContactPopup'

const Footer = () => {
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isPaymentMethodsOpen, setIsPaymentMethodsOpen] = useState(false);
  const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <footer className="relative bg-gradient-to-b from-transparent to-white/80 dark:to-black/40 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-800/20 w-full">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-100/30 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100/30 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        {/* Content */}
        <div className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
            {/* Logo and About */}
            <div className="space-y-4 sm:space-y-6">
              <div className="relative">
                {/* Left-side stronger glow */}
                <div className="absolute -left-4 -top-4 bottom-0 w-12 dark:bg-white/30 dark:blur-2xl dark:rounded-full"></div>
                {/* Main glow */}
                <div className="absolute inset-0 dark:bg-white/20 dark:blur-2xl dark:rounded-full"></div>
                <div className="relative p-1.5">
                  <img 
                    src={navbarLogo}
                    alt="Freshbooks" 
                    className="h-12 w-auto brightness-90 dark:brightness-200 dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] dark:filter dark:contrast-150"
                  />
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Discover a world of books at your fingertips. Your one-stop destination for all your reading needs.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/books" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Books
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Legal</h3>
              <ul className="space-y-4">
                <li>
                  <button 
                    onClick={() => setIsPrivacyPolicyOpen(true)}
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setIsTermsOfServiceOpen(true)}
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <Link to="/shipping" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => setIsPaymentMethodsOpen(true)}
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Payment Methods
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-6 sm:pt-8 border-t border-gray-200/20 dark:border-gray-800/20">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center sm:text-left">
                © {new Date().getFullYear()} Freshbooks. All rights reserved. | Crafted by <b>Softrate Technologies (P) Ltd.</b>
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4 sm:gap-6">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
              </div>
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
    </>
  )
}

export default Footer