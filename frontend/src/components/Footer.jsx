import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import { Link } from 'react-router-dom'
import navbarLogo from "../assets/freshbooks-navbar-logo.png"

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-transparent to-white/80 dark:to-black/40 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-800/20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-100/30 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100/30 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and About */}
          <div className="space-y-6">
            <div className="relative">
              {/* Left-side stronger glow */}
              <div className="absolute -left-4 -top-4 bottom-0 w-12 dark:bg-white/30 dark:blur-2xl dark:rounded-full"></div>
              {/* Main glow */}
              <div className="absolute inset-0 dark:bg-white/20 dark:blur-2xl dark:rounded-full"></div>
              <div className="relative p-1.5">
                <img 
                  src={navbarLogo}
                  alt="Freshbooks" 
                  className="h-8 w-auto brightness-90 dark:brightness-200 dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] dark:filter dark:contrast-150"
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
                <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Subscribe to our newsletter to receive updates and exclusive offers.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-gray-800/80 
                           border border-gray-200/20 dark:border-gray-700/20
                           text-gray-800 dark:text-gray-200
                           placeholder-gray-500 dark:placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:focus:ring-indigo-400/30
                           transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 
                         hover:from-indigo-700 hover:to-purple-700
                         text-white rounded-lg px-6 py-3 font-medium 
                         transition-all duration-300 transform 
                         hover:scale-[1.02] active:scale-[0.98]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200/20 dark:border-gray-800/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © {new Date().getFullYear()} Freshbooks. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-6">
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
  )
}

export default Footer