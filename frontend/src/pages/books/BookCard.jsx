import React from 'react'
import { FiShoppingCart, FiHeart } from 'react-icons/fi'
import { HiOutlineShoppingBag } from 'react-icons/hi'
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
            title: 'Added to bag',
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
        <div className="bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-xl rounded-lg shadow-sm p-2.5 relative overflow-hidden flex flex-col transition-all duration-300 border border-gray-200/20 dark:border-gray-800/20 hover:scale-[1.02] h-full">
            {/* Content Container */}
            <div className="flex-1 flex flex-col relative z-10">
                {/* Image Container */}
                <div className="relative w-full aspect-[3/4] mb-2 sm:mb-3 overflow-hidden rounded-lg">
                    <Link to={`/books/${book._id}`}>
                        <img
                            src={`${book.coverImage}`}
                            alt={book.title}
                            className="w-full h-full object-cover"
                        />
                    </Link>
                    {/* Wishlist Button - Moved inside image container */}
                    <button
                        onClick={toggleWishlist}
                        className={`absolute top-2 right-2 p-1.5 rounded-full transform hover:scale-110 transition-all duration-300 backdrop-blur-sm
                            ${isInWishlist 
                                ? 'bg-red-100/90 text-red-600 dark:bg-red-900/90 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/70' 
                                : 'bg-gray-100/90 text-gray-600 dark:bg-gray-900/90 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-900/70'}`}
                        title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                        <FiHeart className={`w-3.5 h-3.5 ${isInWishlist ? 'fill-current' : ''}`} />
                    </button>
                </div>

                <div className="flex-1 flex flex-col min-h-0">
                    <Link to={`/books/${book._id}`}>
                        <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-0.5 truncate hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" title={book?.title}>
                            {book?.title}
                        </h3>
                    </Link>

                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-1 truncate" title={book?.author}>
                        {book?.author}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                        {Array.from({ length: 5 }, (_, index) => (
                            <span 
                                key={index} 
                                className={`text-xs ${index < book.rating ? "text-yellow-400 dark:text-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    {/* Price and Action Button */}
                    <div className="mt-auto">
                        <div className="flex items-center gap-1.5 mb-2">
                            <div className="flex items-center gap-1.5">
                                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">₹{book?.newPrice}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 line-through">₹{book?.oldPrice}</span>
                            </div>
                            {book?.oldPrice && book?.newPrice && (
                                <span className="text-[10px] font-medium text-green-600 dark:text-green-400 bg-green-100/80 dark:bg-green-900/30 px-1 py-0.5 rounded ml-auto whitespace-nowrap">
                                    {((book.oldPrice - book.newPrice) / book.oldPrice * 100).toFixed(0)}% off
                                </span>
                            )}
                        </div>
                        
                        {/* Add to Bag Button */}
                        <button
                            onClick={() => handleAddToCart(book)}
                            className="w-full flex items-center justify-center gap-2 py-1.5 rounded-lg bg-indigo-100/80 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 
                                     hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-all duration-300 backdrop-blur-sm text-sm font-medium"
                            title="Add to Bag"
                        >
                            <HiOutlineShoppingBag className="w-3.5 h-3.5" />
                            Add to Bag
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookCard