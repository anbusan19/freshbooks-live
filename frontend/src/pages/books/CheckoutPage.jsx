import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiCreditCard, FiTruck, FiShoppingBag } from "react-icons/fi";

import Swal from'sweetalert2';
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

    const onSubmit = async (data) => {
     
        const newOrder = {
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
            totalPrice: totalPrice,
        }
        
        try {
            await createOrder(newOrder).unwrap();
            Swal.fire({
                title: "Confirmed Order",
                text: "Your order placed successfully!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
              });
              navigate("/orders")
        } catch (error) {
            console.error("Error place an order", error);
            setMessage("Failed to place order. Please try again.");
        }
    }

    if(isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-2xl text-gray-600 dark:text-gray-300">Loading...</div>
        </div>
    );
    return (
        <div className="min-h-screen py-16 px-4 md:px-8 dark:bg-black/40 bg-gradient-to-b from-white/80 to-transparent dark:from-black/40 dark:to-transparent backdrop-blur-3xl relative">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="gradient-blob gradient-blob-1"></div>
                <div className="gradient-blob gradient-blob-2"></div>
                <div className="gradient-blob gradient-blob-3"></div>
                
                {/* Floating Bubbles */}
                <div className="aural-bubble aural-bubble-1"></div>
                <div className="aural-bubble aural-bubble-2"></div>
                <div className="aural-bubble aural-bubble-3"></div>
                <div className="aural-bubble aural-bubble-4"></div>
                <div className="aural-bubble aural-bubble-5"></div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/20 dark:border-gray-800/20">
                    <div className="p-6 sm:p-8">
                        {/* Order Summary */}
                        <div className="mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">Checkout</h2>
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                <div className="flex items-center gap-3 bg-indigo-50/50 dark:bg-indigo-900/30 px-4 py-2 rounded-lg">
                                    <FiShoppingBag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Total Items</p>
                                        <p className="text-lg font-semibold text-gray-800 dark:text-white">{cartItems.length}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-green-50/50 dark:bg-green-900/30 px-4 py-2 rounded-lg">
                                    <FiCreditCard className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Total Price</p>
                                        <p className="text-lg font-semibold text-gray-800 dark:text-white">₹{totalPrice}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Checkout Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Personal Details */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                        <FiTruck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                        Shipping Details
                                    </h3>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                        <input
                                            {...register("name", { required: true })}
                                            type="text"
                                            className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                     text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                     transition-all duration-200"
                            
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">Name is required</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                                <input
                                            type="email"
                                                    disabled
                                                    defaultValue={currentUser?.email}
                                            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700
                                                     text-gray-900 dark:text-white cursor-not-allowed"
                                        />
                                            </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                                <input
                                                    {...register("phone", { required: true })}
                                            type="tel"
                                            className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                     text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                     transition-all duration-200"
                                            
                                        />
                                        {errors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">Phone number is required</p>}
                                            </div>
                                            </div>

                                {/* Address Details */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                                                    <input
                                                        {...register("country", { required: true })}
                                            type="text"
                                            className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                     text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                     transition-all duration-200"
                                            
                                        />
                                        {errors.country && <p className="mt-1 text-sm text-red-600 dark:text-red-400">Country is required</p>}
                                            </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State</label>
                                                    <input
                                                        {...register("state", { required: true })}
                                            type="text"
                                            className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                     text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                     transition-all duration-200"
                                            
                                        />
                                        {errors.state && <p className="mt-1 text-sm text-red-600 dark:text-red-400">State is required</p>}
                                                </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                                        <input
                                            {...register("city", { required: true })}
                                            type="text"
                                            className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                     text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                     transition-all duration-200"
                                            
                                        />
                                        {errors.city && <p className="mt-1 text-sm text-red-600 dark:text-red-400">City is required</p>}
                                            </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ZIP Code</label>
                                                <input
                                                    {...register("zipcode", { required: true })}
                                            type="text"
                                            className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                     text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                     transition-all duration-200"
                                            
                                        />
                                        {errors.zipcode && <p className="mt-1 text-sm text-red-600 dark:text-red-400">ZIP code is required</p>}
                                            </div>
                                                </div>
                                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={isChecked}
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                    className="w-4 h-4 text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-700 rounded
                                             focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
                                    I agree to the{" "}
                                    <Link to="/terms" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                                        Terms & Conditions
                                    </Link>{" "}
                                    and{" "}
                                    <Link to="/privacy" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                                        Privacy Policy
                                    </Link>
                                </label>
                                            </div>

                            {message && <p className="text-sm text-red-600 dark:text-red-400">{message}</p>}

                            {/* Submit Button */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={!isChecked || isLoading}
                                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
                                             text-white rounded-lg px-6 py-3 font-medium transition-all duration-300 
                                             transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 
                                             disabled:cursor-not-allowed disabled:transform-none
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
                                    className="flex-1 sm:flex-none px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                                             rounded-lg font-medium transition-all duration-300 hover:bg-gray-200 
                                             dark:hover:bg-gray-700 text-center"
                                >
                                    Back to Cart
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage