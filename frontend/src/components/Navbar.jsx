import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import ThemeToggle from './ThemeToggle';

import avatarImg from "../assets/avatar.png"
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
    {name: "Dashboard", href:"/user-dashboard"},
    {name: "Orders", href:"/orders"},
    {name: "Cart Page", href:"/cart"},
    {name: "Check Out", href:"/checkout"},
]

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const cartItems = useSelector(state => state.cart.cartItems);
    const {currentUser, logout} = useAuth()
    
    const handleLogOut = () => {
        logout()
    }

    const token = localStorage.getItem('token');
  
    return (
        <header className="bg-surface-light dark:bg-surface-dark border-b border-primary-light/10 dark:border-primary-light/5 transition-colors duration-200">
            <nav className="max-w-screen-2xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* left side */}
                    <div className="flex items-center gap-8">
                        <button className="lg:hidden text-primary-dark dark:text-primary-light">
                            <HiMiniBars3CenterLeft className="size-6" />
                        </button>
                        
                        <Link to="/" className="hidden lg:block">
                            <img 
                                src="/freshbooks-logo.svg" 
                                alt="Freshbooks" 
                                className="h-10 w-auto block dark:hidden"
                            />
                            <img 
                                src="/freshbooks-logo-negative.svg" 
                                alt="Freshbooks" 
                                className="h-10 w-auto hidden dark:block"
                            />
                        </Link>

                        <Link to="/" className="lg:hidden">
                            <img 
                                src="/freshbooks-logo.svg" 
                                alt="Freshbooks" 
                                className="h-8 w-auto block dark:hidden"
                            />
                            <img 
                                src="/freshbooks-logo-negative.svg" 
                                alt="Freshbooks" 
                                className="h-8 w-auto hidden dark:block"
                            />
                        </Link>
                    </div>

                    {/* middle - search */}
                    <div className="relative max-w-md w-full mx-4 hidden lg:block">
                        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-dark/50 dark:text-primary-light/50" />
                        <input 
                            type="text" 
                            placeholder="Search here"
                            className="w-full py-2 px-10 rounded-md bg-primary-light/20 dark:bg-dark-secondary/30 
                                     focus:outline-none focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary-light/30
                                     text-primary-dark dark:text-primary-light placeholder-primary-dark/50 dark:placeholder-primary-light/50"
                        />
                    </div>

                    {/* right side */}
                    <div className="flex items-center gap-4">
                        <button className="lg:hidden text-primary-dark dark:text-primary-light">
                            <IoSearchOutline className="size-6" />
                        </button>
                        
                        <Link to="/wishlist" className="hidden lg:block text-primary-dark dark:text-primary-light">
                            <HiOutlineHeart className="size-6" />
                        </Link>

                        <ThemeToggle />

                        <Link to="/cart" className="relative text-primary-dark dark:text-primary-light">
                            <HiOutlineShoppingCart className="size-6" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>

                        {token ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center gap-2"
                                >
                                    <img src={avatarImg} alt="" className="size-8 rounded-full ring-2 ring-primary dark:ring-primary-light" />
                                </button>
                                
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-surface-light dark:bg-dark-secondary rounded-md shadow-lg py-1 z-10
                                                  border border-primary-light/10 dark:border-primary-light/5">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className="block px-4 py-2 text-sm text-primary-dark dark:text-primary-light 
                                                         hover:bg-primary-light/20 dark:hover:bg-dark-primary/50"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                        <button
                                            onClick={handleLogOut}
                                            className="block w-full text-left px-4 py-2 text-sm text-primary-dark dark:text-primary-light
                                                     hover:bg-primary-light/20 dark:hover:bg-dark-primary/50"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="text-primary-dark dark:text-primary-light">
                                <HiOutlineUser className="size-6" />
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;