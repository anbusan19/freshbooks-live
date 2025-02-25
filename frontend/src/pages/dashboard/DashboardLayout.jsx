import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";
import { FiGrid, FiLogOut, FiSearch, FiBell, FiMoon, FiSun, FiImage, FiShoppingBag, FiTag } from "react-icons/fi";
import './Dashboard.css';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('dashboard-theme');
      return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dashboard-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dashboard-theme', 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };
  
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
      <aside className="w-16 sm:w-20 lg:w-64 bg-white/80 dark:bg-gray-800/80 border-r border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl z-10">
        {/* Logo */}
        <div className="h-14 sm:h-16 flex items-center justify-center lg:justify-start px-3 sm:px-4 border-b border-gray-200/50 dark:border-gray-700/50">
          <Link to="/" className="flex items-center gap-3">
            <img src="/freshbooks-logo.svg" alt="Freshbooks" className="h-6 sm:h-8 w-auto block dark:hidden" />
            <img src="/freshbooks-logo-negative.svg" alt="Freshbooks" className="h-6 sm:h-8 w-auto hidden dark:block" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-2 sm:p-4 space-y-2 sm:space-y-3">
          <Link
            to="/admin-dashboard"
            className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-gray-600 dark:text-gray-300 
                     bg-transparent hover:bg-white/80 dark:hover:bg-gray-700/80 rounded-lg sm:rounded-xl 
                     transition-all duration-300 ${location.pathname === "/admin-dashboard" ? "bg-white/80 dark:bg-gray-700/80" : ""}`}
          >
            <div className="relative z-10 flex items-center gap-3 w-full">
              <div className="p-1.5 sm:p-2 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/30">
                <FiGrid className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="hidden lg:block text-sm font-medium">Dashboard</span>
            </div>
          </Link>
          
          <Link
            to="/admin-dashboard/add-new-book"
            className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-gray-600 dark:text-gray-300 
                     bg-transparent hover:bg-white/80 dark:hover:bg-gray-700/80 rounded-lg sm:rounded-xl 
                     transition-all duration-300 ${location.pathname === "/admin-dashboard/add-new-book" ? "bg-white/80 dark:bg-gray-700/80" : ""}`}
          >
            <div className="relative z-10 flex items-center gap-3 w-full">
              <div className="p-1.5 sm:p-2 rounded-lg bg-purple-50/50 dark:bg-purple-900/30">
                <HiViewGridAdd className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="hidden lg:block text-sm font-medium">Add Book</span>
            </div>
          </Link>
          
          <Link
            to="/admin-dashboard/manage-books"
            className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-gray-600 dark:text-gray-300 
                     bg-transparent hover:bg-white/80 dark:hover:bg-gray-700/80 rounded-lg sm:rounded-xl 
                     transition-all duration-300 ${location.pathname === "/admin-dashboard/manage-books" ? "bg-white/80 dark:bg-gray-700/80" : ""}`}
          >
            <div className="relative z-10 flex items-center gap-3 w-full">
              <div className="p-1.5 sm:p-2 rounded-lg bg-blue-50/50 dark:bg-blue-900/30">
                <MdOutlineManageHistory className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="hidden lg:block text-sm font-medium">Manage Books</span>
            </div>
          </Link>

          <Link
            to="/admin-dashboard/orders"
            className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-gray-600 dark:text-gray-300 
                     bg-transparent hover:bg-white/80 dark:hover:bg-gray-700/80 rounded-lg sm:rounded-xl 
                     transition-all duration-300 ${location.pathname === "/admin-dashboard/orders" ? "bg-white/80 dark:bg-gray-700/80" : ""}`}
          >
            <div className="relative z-10 flex items-center gap-3 w-full">
              <div className="p-1.5 sm:p-2 rounded-lg bg-green-50/50 dark:bg-green-900/30">
                <FiShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="hidden lg:block text-sm font-medium">Orders</span>
            </div>
          </Link>

          <Link
            to="/admin-dashboard/manage-banners"
            className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-gray-600 dark:text-gray-300 
                     bg-transparent hover:bg-white/80 dark:hover:bg-gray-700/80 rounded-lg sm:rounded-xl 
                     transition-all duration-300 ${location.pathname === "/admin-dashboard/manage-banners" ? "bg-white/80 dark:bg-gray-700/80" : ""}`}
          >
            <div className="relative z-10 flex items-center gap-3 w-full">
              <div className="p-1.5 sm:p-2 rounded-lg bg-green-50/50 dark:bg-green-900/30">
                <FiImage className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="hidden lg:block text-sm font-medium">Manage Banners</span>
            </div>
          </Link>

          <Link
            to="/admin-dashboard/manage-coupons"
            className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-gray-600 dark:text-gray-300 
                     bg-transparent hover:bg-white/80 dark:hover:bg-gray-700/80 rounded-lg sm:rounded-xl 
                     transition-all duration-300 ${location.pathname === "/admin-dashboard/manage-coupons" ? "bg-white/80 dark:bg-gray-700/80" : ""}`}
          >
            <div className="relative z-10 flex items-center gap-3 w-full">
              <div className="p-1.5 sm:p-2 rounded-lg bg-orange-50/50 dark:bg-orange-900/30">
                <FiTag className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="hidden lg:block text-sm font-medium">Manage Coupons</span>
            </div>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 relative flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-14 sm:h-16 bg-white/80 dark:bg-gray-800/80 border-b border-gray-200/50 dark:border-gray-700/50 px-3 sm:px-4 flex items-center justify-between backdrop-blur-xl z-10">
          {/* Empty div to maintain flex spacing */}
          <div className="flex-1"></div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-300"
            >
              {isDark ? <FiSun className="w-4 h-4 sm:w-5 sm:h-5" /> : <FiMoon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-300"
            >
              <FiLogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden lg:block text-sm">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-3 sm:p-6 relative z-10">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="mt-auto py-4 px-6 border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Freshbooks. All rights reserved. | <span className="font-bold">Crafted by Softrate Technologies (P) Ltd.</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;