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
                <div className="relative w-full h-[240px] mb-3 overflow-hidden rounded-lg">
                    <Link to={`/books/${book._id}`}>
                        <img
                            src={`${book.coverImage}`}
                            alt={book.title}
                            className="w-full h-full object-cover"
                        />
                    </Link>
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

                {/* Price and Action Buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400">₹{book?.newPrice}</span>
                        <span className="ml-1 text-[8px] sm:text-[10px] text-gray-500 dark:text-gray-400 line-through">₹{book?.oldPrice}</span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleAddToCart(book)}
                            className="p-1.5 sm:p-2 rounded-full bg-indigo-100/80 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 
                                     hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transform hover:scale-110 transition-all duration-300 backdrop-blur-sm"
                            title="Add to Cart"
                        >
                            <FiShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <button
                            onClick={toggleWishlist}
                            className={`p-1.5 sm:p-2 rounded-full transform hover:scale-110 transition-all duration-300 backdrop-blur-sm
                                ${isInWishlist 
                                    ? 'bg-red-100/80 text-red-600 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50' 
                                    : 'bg-rose-100/80 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-900/50'}`}
                            title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                        >
                            <FiHeart className={`w-3 h-3 sm:w-4 sm:h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookCard