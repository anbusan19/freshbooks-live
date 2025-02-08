import React from 'react'
import { FiShoppingCart, FiHeart } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice'
import Swal from 'sweetalert2'

const BookCard = ({book}) => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.wishlist.items);
    const isInWishlist = wishlistItems.some(item => item.id === book._id);

    const handleAddToCart = () => {
        dispatch(addToCart(book));
        Swal.fire({
            icon: 'success',
            title: 'Added to cart',
            showConfirmButton: false,
            timer: 1500
        });
    }

    const toggleWishlist = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(book._id));
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

    return (
        <div className="bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-xl rounded-lg shadow-sm p-2 sm:p-4 relative overflow-hidden h-full flex flex-col transition-all duration-300 border border-gray-200/20 dark:border-gray-800/20 hover:scale-[1.02]">
            {/* Content Container */}
            <div className="flex-1 flex flex-col relative z-10">
                {/* Image Container */}
                <div className="relative w-full aspect-[3/4] mb-2 sm:mb-3 overflow-hidden rounded-lg group">
                <Link to={`/books/${book._id}`}>
                    <img
                        src={`${book.coverImage}`}
                            alt={book.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                    <button
                        onClick={toggleWishlist}
                        className={`absolute top-1 right-1 sm:top-2 sm:right-2 p-1 sm:p-1.5 rounded-full 
                                ${isInWishlist 
                                    ? 'bg-red-100/80 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                                    : 'bg-gray-100/80 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400'} 
                                transform hover:scale-110 transition-all duration-300 backdrop-blur-sm`}
                    >
                        <FiHeart className={`w-3 h-3 sm:w-4 sm:h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                    </button>
            </div>

                <Link to={`/books/${book._id}`}>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-800 dark:text-white mb-0.5 sm:mb-1 line-clamp-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {book?.title}
                    </h3>
                </Link>

                <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-300 mb-0.5 sm:mb-1">
                    {book?.author}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-1 sm:mb-2">
                    {Array.from({ length: 5 }, (_, index) => (
                        <span 
                            key={index} 
                            className={`text-[10px] sm:text-xs ${index < book.rating ? "text-yellow-400 dark:text-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
                        >
                            ★
                        </span>
                    ))}
                </div>

                {/* Price */}
                <div className="flex items-center mb-2">
                    <span className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400">₹{book?.newPrice}</span>
                    <span className="ml-1 text-[8px] sm:text-[10px] text-gray-500 dark:text-gray-400 line-through">₹{book?.oldPrice}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1 sm:gap-2 mt-auto">
                    <button 
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1"
                        onClick={() => handleAddToCart(book)}
                    >
                        <FiShoppingCart className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookCard