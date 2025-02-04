import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";
import { FiGrid, FiLogOut, FiSearch, FiBell } from "react-icons/fi";
import './Dashboard.css';

const DashboardLayout = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex relative overflow-hidden">
      {/* Gradient Bubbles */}
      <div className="gradient-blob gradient-blob-1"></div>
      <div className="gradient-blob gradient-blob-2"></div>
      <div className="gradient-blob gradient-blob-3"></div>
      
      {/* Floating Bubbles */}
      <div className="bubble bubble-1"></div>
      <div className="bubble bubble-2"></div>
      <div className="bubble bubble-3"></div>
      <div className="bubble bubble-4"></div>

      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-white/80 dark:bg-gray-800/80 border-r border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl z-10">
        {/* Logo */}
        <div className="h-16 flex items-center justify-center lg:justify-start px-4 border-b border-gray-200/50 dark:border-gray-700/50">
          <Link to="/" className="flex items-center gap-3">
            <img src="/freshbooks-logo.svg" alt="Freshbooks" className="h-8 w-auto block dark:hidden" />
            <img src="/freshbooks-logo-negative.svg" alt="Freshbooks" className="h-8 w-auto hidden dark:block" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-300"
          >
            <FiGrid className="w-5 h-5" />
            <span className="hidden lg:block">Dashboard</span>
          </Link>
          <Link
            to="/dashboard/add-new-book"
            className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-300"
          >
            <HiViewGridAdd className="w-5 h-5" />
            <span className="hidden lg:block">Add Book</span>
          </Link>
          <Link
            to="/dashboard/manage-books"
            className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-300"
          >
            <MdOutlineManageHistory className="w-5 h-5" />
            <span className="hidden lg:block">Manage Books</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 relative">
        {/* Header */}
        <header className="h-16 bg-white/80 dark:bg-gray-800/80 border-b border-gray-200/50 dark:border-gray-700/50 px-4 flex items-center justify-between backdrop-blur-xl z-10">
          {/* Search */}
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-gray-700/50 border-0 rounded-lg
                         text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400
                         focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                         transition-all backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-300">
              <FiBell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-300"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="hidden lg:block">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;