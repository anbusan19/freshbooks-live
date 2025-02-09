import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import ThemeToggle from './ThemeToggle';
import avatarImg from "../assets/avatar.png"
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { setSearchTerm, setSearchResults, setIsSearching, clearSearch } from "../redux/features/search/searchSlice";
import { useFetchAllBooksQuery } from "../redux/features/books/booksApi";
import navbarLogo from "../assets/freshbooks-navbar-logo.png"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const dropdownRef = useRef(null);
    const searchRef = useRef(null);
    
    const cartItems = useSelector(state => state.cart?.cartItems || []);
    const wishlistItems = useSelector(state => state.wishlist?.wishlistItems || []);
    const { currentUser, logout } = useAuth();
    const searchTerm = useSelector((state) => state.search.searchTerm);
    const searchResults = useSelector((state) => state.search.searchResults);
    const isSearching = useSelector((state) => state.search.isSearching);
    const dispatch = useDispatch();
    const { data: books = [] } = useFetchAllBooksQuery();

    const handleLogout = async () => {
        try {
            await logout();
            setIsOpen(false);
            setIsMobileMenuOpen(false);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    // Handle search input
    const handleSearchInput = (e) => {
        const term = e.target.value;
        dispatch(setSearchTerm(term));
        dispatch(setIsSearching(true));

        if (term.trim() === '') {
            dispatch(setSearchResults([]));
            dispatch(setIsSearching(false));
            return;
        }

        // Search in books array
        const results = books.filter(book => 
            book.title.toLowerCase().includes(term.toLowerCase()) ||
            book.author.toLowerCase().includes(term.toLowerCase())
        ).slice(0, 5); // Limit to 5 results

        dispatch(setSearchResults(results));
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                dispatch(clearSearch());
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dispatch]);
  
    return (
        <header className="sticky top-0 z-50">
            <nav className="bg-gray-50/98 dark:bg-[#2A2A2E]/98 backdrop-blur-md border-b border-gray-200/30 dark:border-gray-600/20 shadow-lg transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Left side - Logo */}
                        <div className="flex items-center gap-4">
                            <Link to="/" className="flex-shrink-0">
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
                            </Link>
                        </div>

                        {/* Middle - Search (Desktop) */}
                        <div className="hidden lg:block flex-1 max-w-lg mx-8">
                            <div className="relative" ref={searchRef}>
                                <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        <input 
                            type="text" 
                                    value={searchTerm}
                                    onChange={handleSearchInput}
                                    placeholder="Search books..."
                                    className="w-full py-2 px-10 rounded-full bg-gray-100/50 dark:bg-gray-800/50
                                             text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400
                                             border border-transparent hover:border-gray-300 dark:hover:border-gray-700
                                             focus:outline-none focus:border-gray-300 dark:focus:border-gray-700
                                             transition-all duration-300"
                                />
                                
                                {/* Search Results Dropdown */}
                                {isSearching && searchResults.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                                                  border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                                        {searchResults.map((book) => (
                                            <Link
                                                key={book._id}
                                                to={`/books/${book._id}`}
                                                onClick={() => dispatch(clearSearch())}
                                                className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 
                                                         transition-colors border-b border-gray-100 dark:border-gray-700/50 last:border-0"
                                            >
                                                <img 
                                                    src={book.coverImage} 
                                                    alt={book.title} 
                                                    className="w-10 h-14 object-cover rounded"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                        {book.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {book.author}
                                                    </p>
                                                    <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                                                        ₹{book.newPrice}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                    </div>

                        {/* Right side - Icons */}
                        <div className="flex items-center gap-2 sm:gap-4">
                            {/* Mobile Search Button */}
                            <button 
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                            >
                                <IoSearchOutline className="w-6 h-6" />
                            </button>
                            
                            <ThemeToggle />

                            {/* Wishlist - Hidden on mobile */}
                            <Link 
                                to="/wishlist" 
                                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all relative"
                            >
                                <HiOutlineHeart className="w-6 h-6" />
                                {wishlistItems?.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                        {wishlistItems.length}
                                    </span>
                                )}
                            </Link>

                            {/* Cart */}
                            <Link 
                                to="/cart" 
                                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all relative"
                            >
                                <HiOutlineShoppingCart className="w-6 h-6" />
                                {cartItems?.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>

                            {/* User Menu */}
                            <div className="relative" ref={dropdownRef}>
                                {currentUser ? (
                                <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all overflow-hidden"
                                    >
                                        <img
                                            src={currentUser.photoURL || avatarImg}
                                            alt="User"
                                            className="w-8 h-8 rounded-full"
                                        />
                                </button>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all"
                                    >
                                        <HiOutlineUser className="w-6 h-6" />
                                    </Link>
                                )}

                                {/* User Dropdown */}
                                {isOpen && currentUser && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg py-1 border border-gray-200/20 dark:border-gray-800/20">
                                        <div className="px-4 py-2 border-b border-gray-200/20 dark:border-gray-800/20">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                {currentUser.displayName || currentUser.email}
                                            </p>
                                        </div>
                                        <Link
                                            to="/user-dashboard"
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                            <Link
                                            to="/orders"
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Orders
                                            </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                {isSearchOpen && (
                    <div 
                        ref={searchRef}
                        className="lg:hidden border-t border-gray-200/20 dark:border-gray-800/20 px-4 py-3"
                    >
                        <div className="relative">
                            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                            <input 
                                type="text" 
                                value={searchTerm}
                                onChange={handleSearchInput}
                                placeholder="Search books..."
                                className="w-full py-2 px-10 rounded-full bg-gray-100/50 dark:bg-gray-800/50
                                         text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400
                                         border border-transparent hover:border-gray-300 dark:hover:border-gray-700
                                         focus:outline-none focus:border-gray-300 dark:focus:border-gray-700
                                         transition-all duration-300"
                            />

                            {/* Mobile Search Results */}
                            {isSearching && searchResults.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                                              border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                                    {searchResults.map((book) => (
                                        <Link
                                            key={book._id}
                                            to={`/books/${book._id}`}
                                            onClick={() => {
                                                dispatch(clearSearch());
                                                setIsSearchOpen(false);
                                            }}
                                            className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 
                                                     transition-colors border-b border-gray-100 dark:border-gray-700/50 last:border-0"
                                        >
                                            <img 
                                                src={book.coverImage} 
                                                alt={book.title} 
                                                className="w-10 h-14 object-cover rounded"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                    {book.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {book.author}
                                                </p>
                                                <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                                                    ₹{book.newPrice}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Navbar;