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
import PrivacyPolicyPopup from '../../components/PrivacyPolicyPopup';
import TermsOfServicePopup from '../../components/TermsOfServicePopup';

const CheckoutPage = () => {
    const [message, setMessage] = useState("");
    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
    const [isTermsChecked, setIsTermsChecked] = useState(false);
    const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
    const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] = useState(false);
    const cartItems = useSelector(state => state.cart.cartItems);
    const subtotal = cartItems.reduce((acc, item) => acc + (item.newPrice * item.quantity), 0);
    const gstAmount = cartItems.reduce((acc, item) => {
        const itemGst = (item.newPrice * item.quantity) * (item.gst / 100);
        return acc + itemGst;
    }, 0);
    const totalPrice = (subtotal + gstAmount).toFixed(2);
    const { currentUser } = useAuth();
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
        if (!isPrivacyChecked || !isTermsChecked) {
            Swal.fire({
                title: "Agreement Required",
                text: "Please agree to our Privacy Policy and Terms of Service to proceed",
                icon: "warning"
            });
            return;
        }

        const orderData = {
            name: data.name,
            email: currentUser?.email,
            address: {
                houseNo: data.houseNo,
                street: data.street,
                area: data.area,
                city: data.city,
                state: data.state,
                country: data.country,
                zipcode: data.zipcode
            },
            phone: data.phone,
            productIds: cartItems.map(item => ({
                book: item._id,
                quantity: item.quantity || 1,
                price: item.newPrice
            })),
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
        <>
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
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
                                <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-row sm:gap-4 items-start sm:items-center">
                                    <div className="flex items-center gap-2 sm:gap-3 bg-indigo-50/50 dark:bg-indigo-900/30 px-2 sm:px-4 py-2 rounded-lg">
                                        <FiShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
                                        <div>
                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Items</p>
                                            <p className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">{cartItems.length}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3 bg-purple-50/50 dark:bg-purple-900/30 px-2 sm:px-4 py-2 rounded-lg">
                                        <FiCreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                                        <div>
                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Subtotal</p>
                                            <p className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">₹{subtotal.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3 bg-green-50/50 dark:bg-green-900/30 px-2 sm:px-4 py-2 rounded-lg">
                                        <FiTruck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                                        <div>
                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">GST</p>
                                            <p className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">₹{gstAmount.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm sm:text-base font-medium text-gray-800 dark:text-white">Total Amount</span>
                                        <span className="text-lg sm:text-xl font-bold text-indigo-600 dark:text-indigo-400">₹{totalPrice}</span>
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
                                                {...register("name", { 
                                                    required: "Name is required",
                                                    pattern: {
                                                        value: /^[A-Za-z\s]+$/,
                                                        message: "Name should only contain letters and spaces"
                                                    }
                                                })}
                                                type="text"
                                                className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                         text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                         focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                         transition-all duration-200"
                                            />
                                            {errors.name && <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>}
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
                                                {...register("phone", { 
                                                    required: "Phone number is required",
                                                    pattern: {
                                                        value: /^\d{10}$/,
                                                        message: "Phone number must be exactly 10 digits"
                                                    }
                                                })}
                                            type="tel"
                                            className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                     text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                     transition-all duration-200"
                                            
                                        />
                                            {errors.phone && <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>}
                                                </div>
                                                </div>

                                    {/* Address Details */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">House/Flat Number</label>
                                            <input
                                                {...register("houseNo", { required: true })}
                                                type="text"
                                                placeholder="e.g., No: 10, East Apartments"
                                                className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                         text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                         focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                         transition-all duration-200"
                                            />
                                            {errors.houseNo && <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">House/Flat number is required</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Street Address</label>
                                            <input
                                                {...register("street", { required: true })}
                                                type="text"
                                                placeholder="e.g., West Main Street"
                                                className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                         text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                         focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                         transition-all duration-200"
                                            />
                                            {errors.street && <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">Street address is required</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Area/Locality</label>
                                            <input
                                                {...register("area", { required: true })}
                                                type="text"
                                                placeholder="e.g., Mangadu"
                                                className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                         text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                         focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                         transition-all duration-200"
                                            />
                                            {errors.area && <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">Area/Locality is required</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                                            <input
                                                {...register("city", { required: true })}
                                                type="text"
                                                placeholder="e.g., Chennai"
                                                className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                         text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                         focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                         transition-all duration-200"
                                            />
                                            {errors.city && <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">City is required</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State</label>
                                            <input
                                                {...register("state", { required: true })}
                                                type="text"
                                                placeholder="e.g., Tamil Nadu"
                                                className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                         text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                         focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                         transition-all duration-200"
                                            />
                                            {errors.state && <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">State is required</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                                            <input
                                                {...register("country", { required: true })}
                                                type="text"
                                                placeholder="e.g., India"
                                                className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                         text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                         focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                         transition-all duration-200"
                                            />
                                            {errors.country && <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">Country is required</p>}
                                        </div>

                                        <div>
                                            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ZIP Code</label>
                                            <input
                                                {...register("zipcode", { 
                                                    required: "ZIP code is required",
                                                    pattern: {
                                                        value: /^[0-9]{6}$/,
                                                        message: "ZIP code must be exactly 6 digits"
                                                    }
                                                })}
                                                type="text"
                                                placeholder="e.g., 560034"
                                                className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
                                                         text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                                                         focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent
                                                         transition-all duration-200"
                                            />
                                            {errors.zipcode && <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">{errors.zipcode.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Agreements Section */}
                                <div className="mt-6 space-y-3">
                                    <div className="flex items-start gap-2">
                                        <input
                                            type="checkbox"
                                            id="privacy-policy"
                                            checked={isPrivacyChecked}
                                            onChange={(e) => setIsPrivacyChecked(e.target.checked)}
                                            className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-400"
                                        />
                                        <label htmlFor="privacy-policy" className="text-sm text-gray-600 dark:text-gray-300">
                                            I agree to the{' '}
                                            <button
                                                type="button"
                                                onClick={() => setIsPrivacyPolicyOpen(true)}
                                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium underline"
                                            >
                                                Privacy Policy
                                            </button>
                                        </label>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <input
                                            type="checkbox"
                                            id="terms-of-service"
                                            checked={isTermsChecked}
                                            onChange={(e) => setIsTermsChecked(e.target.checked)}
                                            className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-400"
                                        />
                                        <label htmlFor="terms-of-service" className="text-sm text-gray-600 dark:text-gray-300">
                                            I agree to the{' '}
                                            <button
                                                type="button"
                                                onClick={() => setIsTermsOfServiceOpen(true)}
                                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium underline"
                                            >
                                                Terms of Service
                                            </button>
                                        </label>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
                                             text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl
                                             transform transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                             flex items-center justify-center gap-2"
                                >
                                    <FiCreditCard className="w-5 h-5" />
                                    <span>Proceed to Payment</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popups */}
            <PrivacyPolicyPopup 
                isOpen={isPrivacyPolicyOpen}
                onClose={() => setIsPrivacyPolicyOpen(false)}
            />
            <TermsOfServicePopup 
                isOpen={isTermsOfServiceOpen}
                onClose={() => setIsTermsOfServiceOpen(false)}
            />
        </>
    )
}

export default CheckoutPage