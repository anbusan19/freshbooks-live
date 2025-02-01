import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/features/cart/cartSlice';
import { FiShoppingCart, FiTrash2, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Wishlist = () => {
    const wishlistItems = useSelector(state => state.wishlist.items);
    const dispatch = useDispatch();

    const handleRemoveFromWishlist = (bookId) => {
        dispatch(removeFromWishlist(bookId));
        Swal.fire({
            icon: 'success',
            title: 'Removed from wishlist',
            showConfirmButton: false,
            timer: 1500
        });
    };

    const handleAddToCart = (book) => {
        dispatch(addToCart(book));
        Swal.fire({
            icon: 'success',
            title: 'Added to cart',
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <div className="min-h-screen py-16 px-4 md:px-8 dark:bg-black/40 bg-gradient-to-b from-white/80 to-transparent dark:from-black/40 dark:to-transparent backdrop-blur-3xl relative">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-100/30 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100/30 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-96 h-96 bg-pink-100/30 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
                
                {/* Additional background elements */}
                <div className="bubble bubble-1"></div>
                <div className="bubble bubble-2"></div>
                <div className="bubble bubble-3"></div>
                <div className="bubble bubble-4"></div>
                <div className="bubble bubble-5"></div>
                <div className="bubble bubble-blue-1"></div>
                <div className="bubble bubble-blue-2"></div>
                <div className="bubble bubble-blue-3"></div>
                <div className="bubble bubble-yellow-1"></div>
                <div className="bubble bubble-yellow-2"></div>
                <div className="bubble bubble-yellow-3"></div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                        My Wishlist
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Keep track of all your favorite books
                    </p>
                </div>

                {/* Wishlist Content */}
                {wishlistItems.length === 0 ? (
                    <div className="bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl shadow-xl p-12 border border-gray-200/20 dark:border-gray-800/20 text-center max-w-2xl mx-auto">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100/80 dark:bg-gray-800/80 flex items-center justify-center">
                            <FiHeart className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                            Your wishlist is empty
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                            Start adding some books to your wishlist!
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center px-8 py-4 rounded-xl
                                     bg-gradient-to-r from-indigo-600 to-purple-600
                                     hover:from-indigo-700 hover:to-purple-700
                                     text-white font-medium text-lg
                                     transform hover:scale-[1.02] active:scale-[0.98]
                                     transition-all duration-300
                                     shadow-lg hover:shadow-xl"
                        >
                            Browse Books
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {wishlistItems.map((book) => (
                            <div key={book.id} 
                                className="bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200/20 dark:border-gray-800/20 
                                         transform hover:scale-[1.02] transition-all duration-300">
                                {/* Image Container */}
                                <div className="relative aspect-[3/4] mb-4 rounded-xl overflow-hidden group">
                                    <img
                                        src={book.coverImage}
                                        alt={book.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Book Details */}
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    {book.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm">
                                    {book.author}
                                </p>

                                {/* Price */}
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">₹{book.newPrice}</span>
                                    {book.oldPrice && (
                                        <>
                                            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">₹{book.oldPrice}</span>
                                            <span className="text-sm text-green-600 dark:text-green-400">
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
                                                 text-white rounded-lg px-4 py-2 font-medium transition-all duration-300 
                                                 transform hover:scale-[1.02] active:scale-[0.98] 
                                                 flex items-center justify-center gap-2"
                                    >
                                        <FiShoppingCart className="w-4 h-4" />
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleRemoveFromWishlist(book.id)}
                                        className="p-2 bg-red-100/80 text-red-600 dark:bg-red-900/30 dark:text-red-400 
                                                 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 
                                                 transition-all duration-300 flex items-center justify-center"
                                        title="Remove from wishlist"
                                    >
                                        <FiTrash2 className="w-5 h-5" />
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