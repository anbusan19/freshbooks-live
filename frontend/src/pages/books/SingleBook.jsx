import React from 'react';
import { FiShoppingCart, FiHeart, FiStar } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import Swal from 'sweetalert2';
import '../../styles/shared-gradients.css';

const SingleBook = () => {
    const {id} = useParams();
    const {data: book, isLoading, isError} = useFetchBookByIdQuery(id);
    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.wishlist.items);
    const isInWishlist = wishlistItems.some(item => item.id === id);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        Swal.fire({
            icon: 'success',
            title: 'Added to cart',
            showConfirmButton: false,
            timer: 1500
        });
    }

    const toggleWishlist = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(id));
            Swal.fire({
                icon: 'success',
                title: 'Removed from wishlist',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            dispatch(addToWishlist({...book, id: book._id}));
            Swal.fire({
                icon: 'success',
                title: 'Added to wishlist',
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    if(isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-2xl text-gray-600 dark:text-gray-300">Loading...</div>
        </div>
    );
    
    if(isError) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-2xl text-red-600 dark:text-red-400">Error loading book information</div>
        </div>
    );

  return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-white/50 to-purple-50/50 dark:from-gray-900/50 dark:via-gray-900/50 dark:to-gray-800/50 relative">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-100/30 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100/30 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-96 h-96 bg-pink-100/30 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            {/* Content */}
            <div className="relative isolate z-10 container mx-auto px-4 py-4 sm:py-6">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/20 dark:border-gray-700/20 overflow-hidden">
                    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
                            {/* Image Section */}
                            <div className="lg:sticky lg:top-8 lg:self-start max-w-sm mx-auto lg:mx-0">
                                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg group">
                                    <img
                                        src={`${book.coverImage}`}
                                        alt={book.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="flex flex-col">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">{book.title}</h1>
                                
                                <div className="space-y-6">
                                    {/* Author */}
                                    <p className="text-gray-600 dark:text-gray-300">
                                        <span className="font-semibold text-gray-800 dark:text-white">Author:</span> {book.author || 'Admin'}
                                    </p>

                                    {/* Rating */}
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-800 dark:text-white">Rating:</span>
                                        <div className="flex items-center">
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <FiStar 
                                                    key={index}
                                                    className={`w-5 h-5 ${
                                                        index < book.rating 
                                                        ? "fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500" 
                                                        : "text-gray-300 dark:text-gray-600"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">₹{book.newPrice}</span>
                                        <span className="text-xl text-gray-500 dark:text-gray-400 line-through">₹{book.oldPrice}</span>
                                        <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                                            {((book.oldPrice - book.newPrice) / book.oldPrice * 100).toFixed(0)}% off
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <div className="py-6 border-t border-b border-gray-200/30 dark:border-gray-700/30">
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {book.description}
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                                        <button 
                                            onClick={toggleWishlist}
                                            className={`px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-all duration-300
                                                ${isInWishlist 
                                                    ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50' 
                                                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800/50 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800/70'}`}
                                        >
                                            <FiHeart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                                            <span>{isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
                                        </button>
                                        <button 
                                            onClick={() => handleAddToCart(book)} 
                                            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg px-6 py-3 font-medium transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            <FiShoppingCart className="w-5 h-5" />
                                            <span>Add to Cart</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleBook;