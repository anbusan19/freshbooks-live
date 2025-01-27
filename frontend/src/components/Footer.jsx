import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-primary-light/5 dark:bg-dark-secondary border-t border-primary-light/10 dark:border-primary-light/5">
      <div className="max-w-screen-2xl mx-auto py-10 px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left Side - Logo and Nav */}
          <div className="md:w-1/2 w-full">
            <img 
              src="/freshbooks-logo.svg" 
              alt="Freshbooks" 
              className="mb-6 h-8 w-auto block dark:hidden"
            />
            <img 
              src="/freshbooks-logo-negative.svg" 
              alt="Freshbooks" 
              className="mb-6 h-8 w-auto hidden dark:block"
            />
            <ul className="flex flex-col md:flex-row gap-6">
              <li>
                <a href="#home" className="text-primary-dark dark:text-primary-light hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-primary-dark dark:text-primary-light hover:text-primary transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-primary-dark dark:text-primary-light hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-dark dark:text-primary-light hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Right Side - Newsletter */}
          <div className="md:w-1/2 w-full">
            <p className="mb-4 text-primary-dark dark:text-primary-light">
              Subscribe to our newsletter to receive the latest updates, news, and offers!
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-md bg-white dark:bg-dark-primary 
                         text-primary-dark dark:text-primary-light
                         placeholder-primary-dark/50 dark:placeholder-primary-light/50
                         border border-primary-light/20 dark:border-primary-light/10
                         focus:outline-none focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary-light/30"
              />
              <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-6
                      border-t border-primary-light/10 dark:border-primary-light/5">
          {/* Left Side - Privacy Links */}
          <ul className="flex gap-6 mb-4 md:mb-0">
            <li>
              <a href="#privacy" className="text-primary-dark dark:text-primary-light hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#terms" className="text-primary-dark dark:text-primary-light hover:text-primary transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>

          {/* Right Side - Social Icons */}
          <div className="flex gap-6">
            <a href="https://facebook.com" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-primary-dark dark:text-primary-light hover:text-primary transition-colors">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-primary-dark dark:text-primary-light hover:text-primary transition-colors">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-primary-dark dark:text-primary-light hover:text-primary transition-colors">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer