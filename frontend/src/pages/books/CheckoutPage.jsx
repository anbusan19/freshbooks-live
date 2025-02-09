import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiCreditCard, FiTruck, FiShoppingBag } from "react-icons/fi";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import '../../styles/shared-gradients.css';

const CheckoutPage = () => {
    const [message, setMessage] = useState("");
    const [isChecked, setIsChecked] = useState(false)
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const {  currentUser} = useAuth()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const [createOrder, {isLoading, error}] = useCreateOrderMutation();
    const navigate =  useNavigate()

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = async (orderData) => {
        try {
            // Create Razorpay order
            const response = await axios.post(`${import.meta.env.VITE_PROD_BACKEND_BASEURL}/api/orders/create-razorpay-order`, {
                amount: totalPrice
            });

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: response.data.amount,
                currency: response.data.currency,
                name: "FreshBooks",
                description: "Book Purchase",
                order_id: response.data.id,
                handler: async function (response) {
                    const orderWithPayment = {
                        ...orderData,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id
                    };
                    
                    try {
                        await createOrder(orderWithPayment).unwrap();
                        Swal.fire({
                            title: "Payment Successful",
                            text: "Your order has been placed successfully!",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate("/orders");
                    } catch (error) {
                        console.error("Error creating order", error);
                        Swal.fire({
                            title: "Error",
                            text: "Failed to create order. Please try again.",
                            icon: "error"
                        });
                    }
                },
                prefill: {
                    name: watch('name'),
                    email: currentUser?.email,
                    contact: watch('phone')
                },
                theme: {
                    color: "#4F46E5"
                }
            };

            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.open();
        } catch (error) {
            console.error("Error initiating payment", error);
            Swal.fire({
                title: "Error",
                text: "Failed to initiate payment. Please try again.",
                icon: "error"
            });
        }
    };

    const onSubmit = async (data) => {
        const orderData = {
            name: data.name,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: parseFloat(totalPrice)
        };
        
        await handlePayment(orderData);
    };

    if(isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-2xl text-gray-600 dark:text-gray-300">Loading...</div>
        </div>
    );
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="gradient-blob gradient-blob-1 opacity-30"></div>
                <div className="gradient-blob gradient-blob-2 opacity-30"></div>
                <div className="gradient-blob gradient-blob-3 opacity-30"></div>
                
                {/* Floating Bubbles */}
                <div className="aural-bubble aural-bubble-1 opacity-20"></div>
                <div className="aural-bubble aural-bubble-2 opacity-20"></div>
                <div className="aural-bubble aural-bubble-3 opacity-20"></div>
                <div className="aural-bubble aural-bubble-4 opacity-20"></div>
                <div className="aural-bubble aural-bubble-5 opacity-20"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/20 dark:border-gray-700/20">
                    <div className="p-4 sm:p-6 md:p-8">
                        {/* Order Summary */}
                        <div className="mb-4 sm:mb-6">
                            <h2 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">Checkout</h2>
                            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:gap-4 items-start sm:items-center">
                                <div className="flex items-center gap-2 sm:gap-3 bg-indigo-50/50 dark:bg-indigo-900/30 px-2 sm:px-4 py-2 rounded-lg">
                                    <FiShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Total Items</p>
                                        <p className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">{cartItems.length}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 bg-green-50/50 dark:bg-green-900/30 px-2 sm:px-4 py-2 rounded-lg">
                                    <FiCreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                                    <div>
                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Total Price</p>
                                        <p className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">₹{totalPrice}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Checkout Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {/* Personal Details */}
                                <div className="space-y-2 sm:space-y-3">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                        <FiTruck className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
                                        Shipping Details
                                    </h3>
                                    
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                        <input
                                            {...register("name", { required: true })}
                                            type="text"
                                            className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                     text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                     transition-all duration-200"
                                />
                                        {errors.name && <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">Name is required</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                                <input
                                            type="email"
                                                    disabled
                                                    defaultValue={currentUser?.email}
                                            className="w-full px-3 sm:px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700
                                                     text-sm sm:text-base text-gray-900 dark:text-white cursor-not-allowed"
                                        />
                                            </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                                <input
                                                    {...register("phone", { required: true })}
                                            type="tel"
                                            className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                     text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                     transition-all duration-200"
                                            
                                        />
                                        {errors.phone && <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">Phone number is required</p>}
                                            </div>
                                            </div>

                                {/* Address Details */}
                                <div className="space-y-2 sm:space-y-3">
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                                                    <input
                                                        {...register("country", { required: true })}
                                            type="text"
                                            className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                     text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                     transition-all duration-200"
                                            
                                        />
                                        {errors.country && <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">Country is required</p>}
                                            </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State</label>
                                                    <input
                                                        {...register("state", { required: true })}
                                            type="text"
                                            className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                     text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                     transition-all duration-200"
                                            
                                        />
                                        {errors.state && <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">State is required</p>}
                                                </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                                        <input
                                            {...register("city", { required: true })}
                                            type="text"
                                            className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                     text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                     transition-all duration-200"
                                            
                                        />
                                        {errors.city && <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">City is required</p>}
                                            </div>

                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ZIP Code</label>
                                                <input
                                                    {...register("zipcode", { required: true })}
                                            type="text"
                                            className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                     text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                     transition-all duration-200"
                                            
                                        />
                                        {errors.zipcode && <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">ZIP code is required</p>}
                                            </div>
                                                </div>
                                            </div>

                            {/* Terms and Conditions */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-2">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        checked={isChecked}
                                        onChange={(e) => setIsChecked(e.target.checked)}
                                        className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    />
                                    <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
                                        I agree to the{" "}
                                        <Link to="/terms" className="text-indigo-600 hover:text-indigo-700">Terms & Conditions</Link>{" "}
                                        and{" "}
                                        <Link to="/privacy" className="text-indigo-600 hover:text-indigo-700">Privacy Policy</Link>
                                    </label>
                                </div>

                                {message && <p className="text-sm text-red-600">{message}</p>}

                                {/* Button Container */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        type="submit"
                                        disabled={!isChecked || isLoading}
                                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-2.5 text-sm font-medium
                                                 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed
                                                 flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                Place Order
                                                <FiShoppingBag className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                    <Link
                                        to="/cart"
                                        className="flex justify-center items-center px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 
                                                 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700
                                                 transition-colors duration-200"
                                    >
                                        Back to Cart
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage