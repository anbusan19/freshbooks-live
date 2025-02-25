import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/features/cart/cartSlice';
import { FiShoppingCart, FiTrash2, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../styles/shared-gradients.css';

const Wishlist = () => {
    const wishlistItems = useSelector(state => state.wishlist.items);
    const dispatch = useDispatch();

    const handleRemoveFromWishlist = (bookId) => {
        dispatch(removeFromWishlist(bookId));
        window.showToast('removeWishlist', 'Removed from wishlist');
    };

    const handleAddToCart = (book) => {
        dispatch(addToCart(book));
        window.showToast('addCart', 'Added to cart');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white/80 to-transparent dark:from-black/40 dark:to-transparent backdrop-blur-3xl relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-100/20 dark:bg-purple-900/10 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100/20 dark:bg-indigo-900/10 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute top-0 right-0 w-80 h-80 bg-pink-100/20 dark:bg-pink-900/10 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-8 py-8 md:py-16 overflow-hidden">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                        My Wishlist
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-lg">
                        Keep track of all your favorite books
                    </p>
                </div>

                {/* Wishlist Content */}
                {wishlistItems.length === 0 ? (
                    <div className="bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-6 md:p-12 border border-gray-200/20 dark:border-gray-800/20 text-center max-w-sm md:max-w-2xl mx-auto">
                        <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 rounded-full bg-gray-100/80 dark:bg-gray-800/80 flex items-center justify-center">
                            <FiHeart className="w-8 h-8 md:w-12 md:h-12 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h2 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2 md:mb-4">
                            Your wishlist is empty
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-lg mb-6 md:mb-8">
                            Start adding some books to your wishlist!
                        </p>
                        <Link
                            to="/books"
                            className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl
                                     bg-gradient-to-r from-indigo-600 to-purple-600
                                     hover:from-indigo-700 hover:to-purple-700
                                     text-white font-medium text-sm md:text-lg
                                     transform hover:scale-[1.02] active:scale-[0.98]
                                     transition-all duration-300
                                     shadow-lg hover:shadow-xl"
                        >
                            Browse Books
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                        {wishlistItems.map((book) => (
                            <div key={book.id} 
                                className="bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-4 md:p-6 border border-gray-200/20 dark:border-gray-800/20 
                                         transform hover:scale-[1.02] transition-all duration-300">
                                {/* Image Container */}
                                <div className="relative aspect-[3/4] mb-3 md:mb-4 rounded-lg md:rounded-xl overflow-hidden group">
                                    <img
                                        src={book.coverImage}
                                        alt={book.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Book Details */}
                                <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-1 md:mb-2 line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    {book.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs md:text-sm">
                                    {book.author}
                                </p>

                                {/* Price */}
                                <div className="flex items-center gap-2 mb-3 md:mb-4">
                                    <span className="text-xl md:text-2xl font-bold text-indigo-600 dark:text-indigo-400">₹{book.newPrice}</span>
                                    {book.oldPrice && (
                                        <>
                                            <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 line-through">₹{book.oldPrice}</span>
                                            <span className="text-xs md:text-sm text-green-600 dark:text-green-400">
                                                ({((book.oldPrice - book.newPrice) / book.oldPrice * 100).toFixed(0)}% off)
                                            </span>
                                        </>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleAddToCart(book)}
                                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
                                                 text-white rounded-lg px-3 md:px-4 py-2 text-sm md:text-base font-medium transition-all duration-300 
                                                 transform hover:scale-[1.02] active:scale-[0.98] 
                                                 flex items-center justify-center gap-1 md:gap-2"
                                    >
                                        <FiShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleRemoveFromWishlist(book.id)}
                                        className="p-2 bg-red-100/80 text-red-600 dark:bg-red-900/30 dark:text-red-400 
                                                 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 
                                                 transition-all duration-300 flex items-center justify-center"
                                        title="Remove from wishlist"
                                    >
                                        <FiTrash2 className="w-4 h-4 md:w-5 md:h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Wishlist; 