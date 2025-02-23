import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearCart, removeFromCart, incrementQuantity, decrementQuantity, updateQuantity } from '../../redux/features/cart/cartSlice';
import { FiTrash2, FiShoppingBag, FiMinus, FiPlus } from 'react-icons/fi';
import Swal from 'sweetalert2';
import '../../styles/shared-gradients.css';

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    const subtotal = cartItems.reduce((acc, item) => acc + (item.newPrice * item.quantity), 0);
    const gstAmount = cartItems.reduce((acc, item) => {
        const itemGst = (item.newPrice * item.quantity) * (item.gst / 100);
        return acc + itemGst;
    }, 0);
    const totalPrice = (subtotal + gstAmount).toFixed(2);

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
        Swal.fire({
            icon: 'success',
            title: 'Removed from cart',
            showConfirmButton: false,
            timer: 1500
        });
    }

    const handleClearCart = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This will remove all items from your cart!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, clear it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(clearCart());
                Swal.fire({
                    icon: 'success',
                    title: 'Cart cleared!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }

    const handleQuantityChange = (e, id) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            dispatch(updateQuantity({ id, quantity: value }));
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-100/20 dark:bg-purple-900/10 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100/20 dark:bg-indigo-900/10 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute top-0 right-0 w-80 h-80 bg-pink-100/20 dark:bg-pink-900/10 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-8 py-8 md:py-16 overflow-hidden">
                <div className="bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border border-gray-200/20 dark:border-gray-800/20">
                    <div className="p-4 md:p-8">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4 md:mb-8">
                            <h1 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-white">Shopping Bag</h1>
                            {cartItems.length > 0 && (
                                <button
                                    onClick={handleClearCart}
                                    className="px-2 sm:px-4 py-1.5 sm:py-2.5 text-red-600 dark:text-red-400 bg-red-100/80 dark:bg-red-900/30 
                                             rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 
                                             transition-all duration-300 flex items-center gap-1 sm:gap-2
                                             text-xs sm:text-base"
                                >
                                    <FiTrash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="hidden sm:inline">Clear Bag</span>
                                </button>
                            )}
                        </div>

                        {/* Cart Items */}
                        {cartItems.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 md:gap-6">
                                {cartItems.map((product) => (
                                    <div 
                                        key={product?._id} 
                                        className="bg-white/50 dark:bg-gray-800/50 border border-gray-200/20 dark:border-gray-700/20
                                                 rounded-lg overflow-hidden transition-all duration-300 
                                                 hover:bg-white/80 dark:hover:bg-gray-800/80
                                                 flex items-start sm:items-center flex-col sm:flex-row"
                                    >
                                        {/* Image Container with Remove Button Overlay */}
                                        <div className="relative w-full sm:w-48 aspect-[3/4] sm:aspect-[3/4] overflow-hidden">
                                            <img
                                                src={`${product?.coverImage}`}
                                                alt={product?.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                onClick={() => handleRemoveFromCart(product)}
                                                className="absolute top-2 right-2 p-1.5 rounded-full
                                                         bg-red-100/80 dark:bg-red-900/30 text-red-600 dark:text-red-400
                                                         hover:bg-red-200 dark:hover:bg-red-900/50 
                                                         transition-all duration-300 sm:hidden"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Details */}
                                        <div className="p-3 sm:p-6 sm:flex-1 w-full sm:flex sm:flex-col sm:justify-between">
                                            <div>
                                                <Link 
                                                    to={`/books/${product._id}`}
                                                    className="block text-base sm:text-xl font-bold text-gray-800 dark:text-white 
                                                             hover:text-indigo-600 dark:hover:text-indigo-400 
                                                             transition-colors line-clamp-1 mb-1 sm:mb-3"
                                                >
                                                    {product?.title}
                                                </Link>
                                                <p className="text-xs sm:text-base text-gray-600 dark:text-gray-300 capitalize mb-2 sm:mb-3">
                                                    <span className="font-medium">Category:</span> {product?.category}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between sm:flex-row sm:items-center sm:gap-4">
                                                <div className="flex items-center gap-4">
                                                <span className="text-lg sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                                        ₹{(product?.newPrice * product.quantity).toFixed(2)}
                                                </span>
                                                    <div className="flex items-center gap-2 bg-gray-100/80 dark:bg-gray-800/80 rounded-lg p-1">
                                                        <button
                                                            onClick={() => dispatch(decrementQuantity(product._id))}
                                                            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 
                                                                     text-gray-600 dark:text-gray-400 transition-colors"
                                                        >
                                                            <FiMinus className="w-4 h-4" />
                                                        </button>
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={product.quantity}
                                                            onChange={(e) => handleQuantityChange(e, product._id)}
                                                            className="w-12 text-center bg-transparent border-none focus:outline-none 
                                                                     text-gray-800 dark:text-gray-200 text-sm"
                                                        />
                                                        <button
                                                            onClick={() => dispatch(incrementQuantity(product._id))}
                                                            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 
                                                                     text-gray-600 dark:text-gray-400 transition-colors"
                                                        >
                                                            <FiPlus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveFromCart(product)}
                                                    className="hidden sm:flex text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 
                                                             transition-colors items-center gap-2 text-base hover:bg-red-50 dark:hover:bg-red-900/20
                                                             px-4 py-2 rounded-lg"
                                                >
                                                    <FiTrash2 className="w-4 h-4" />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 sm:py-12">
                                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-gray-100/80 dark:bg-gray-800/80 
                                              flex items-center justify-center">
                                    <FiShoppingBag className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 dark:text-gray-500" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-4">
                                    Your Bag is empty
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
                                    Looks like you haven't added any books to your Bag yet.
                                </p>
                                <Link
                                    to="/"
                                    className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl
                                             bg-gradient-to-r from-indigo-600 to-purple-600
                                             hover:from-indigo-700 hover:to-purple-700
                                             text-white font-medium text-sm sm:text-lg
                                             transform hover:scale-[1.02] active:scale-[0.98]
                                             transition-all duration-300
                                             shadow-lg hover:shadow-xl"
                                >
                                    Browse Books
                                </Link>
                            </div>
                        )}

                        {cartItems.length > 0 && (
                            <div className="mt-4 sm:mt-8 p-3 sm:p-6 rounded-xl bg-gray-50/80 dark:bg-gray-800/50 border border-gray-200/20 dark:border-gray-700/20 sm:max-w-md sm:ml-auto">
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Subtotal</span>
                                        <span className="text-base sm:text-lg font-medium text-gray-800 dark:text-white">₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">GST</span>
                                        <span className="text-base sm:text-lg font-medium text-gray-800 dark:text-white">₹{gstAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                                        <span className="text-sm sm:text-lg font-medium text-gray-800 dark:text-white">Total</span>
                                        <span className="text-lg sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">₹{totalPrice}</span>
                                    </div>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-3 mb-6">
                                    Shipping calculated at checkout.
                                </p>
                                <div className="space-y-2 sm:space-y-4">
                                    <Link
                                        to="/checkout"
                                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
                                                 text-white rounded-lg px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-base font-medium 
                                                 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] 
                                                 flex items-center justify-center gap-1 sm:gap-2"
                                    >
                                        <FiShoppingBag className="w-3 h-3 sm:w-5 sm:h-5" />
                                        Proceed to Checkout
                                    </Link>
                                    <Link
                                        to="/"
                                        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                                                 text-gray-800 dark:text-gray-200 rounded-lg px-4 sm:px-6 py-2 sm:py-3 
                                                 text-xs sm:text-base font-medium transition-all duration-300 
                                                 flex items-center justify-center gap-1 sm:gap-2
                                                 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;