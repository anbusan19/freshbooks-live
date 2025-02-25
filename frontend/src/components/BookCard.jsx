import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/features/cart/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/features/wishlist/wishlistSlice';
import { FiHeart } from 'react-icons/fi';
import { slugify } from '../utils/slugify';

const BookCard = ({ book }) => {
    const cardRef = useRef(null);
    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
    const isInWishlist = wishlistItems.some(item => item._id === book._id);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        };

        card.addEventListener('mousemove', handleMouseMove);
        return () => card.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleAddToCart = () => {
        dispatch(addToCart(book));
    };

    const toggleWishlist = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(book._id));
            window.showToast('removeWishlist', 'Removed from wishlist');
        } else {
            dispatch(addToWishlist({...book, id: book._id}));
            window.showToast('addWishlist', 'Added to wishlist');
        }
    };

    return (
        <div className="book-card-container w-full sm:w-auto">
            <div ref={cardRef} className="book-card rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md">
                {/* Wishlist Button */}
                <button
                    onClick={toggleWishlist}
                    className="absolute top-2 right-2 z-10 p-1.5 sm:p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
                             hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
                >
                    <FiHeart
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            isInWishlist 
                            ? 'text-red-500 fill-current' 
                            : 'text-gray-600 dark:text-gray-300'
                        }`}
                    />
                </button>

                {/* Book Image */}
                <Link to={`/books/${slugify(book.title)}`} className="block relative aspect-[3/4] overflow-hidden">
                    <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                </Link>

                {/* Book Details */}
                <div className="p-3 sm:p-4">
                    <Link 
                        to={`/books/${slugify(book.title)}`}
                        className="text-sm sm:text-base font-bold text-gray-800 dark:text-white hover:text-indigo-600 
                                 dark:hover:text-indigo-400 transition-colors line-clamp-1"
                    >
                        {book.title}
                    </Link>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-0.5 sm:mt-1 capitalize">
                        {book.author}
                    </p>
                    
                    {/* Price and Rating */}
                    <div className="mt-2 sm:mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-1 sm:gap-2">
                            <span className="text-lg sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                ₹{book.newPrice}
                            </span>
                            {book.oldPrice && (
                                <span className="text-xs sm:text-sm text-gray-500 line-through">
                                    ₹{book.oldPrice}
                                </span>
                            )}
                        </div>
                        
                        <div className="flex items-center">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                        index < Math.floor(book.rating || 0)
                                            ? 'text-yellow-400'
                                            : 'text-gray-300 dark:text-gray-600'
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="mt-2 sm:mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 
                                 hover:to-purple-700 text-white rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base 
                                 font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard; 