import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { FaEnvelope } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/freshbooks-navbar-logo.png';

const ForgotPassword = () => {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { sendPasswordResetEmail } = useAuth();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        setMessage("");
        try {
            await sendPasswordResetEmail(data.email);
            setIsSuccess(true);
            setMessage("Password reset link has been sent to your email!");
        } catch (error) {
            setIsSuccess(false);
            setMessage("Failed to send reset email. Please check your email address.");
            console.error(error);
        }
        setIsLoading(false);
    };

    return (
        <div className="h-120 flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-10 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <img src={logo} alt="Logo" className="mx-auto h-12 w-auto" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                        Reset Password
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {message && (
                        <div className={`p-3 rounded-lg text-sm ${isSuccess ? 'bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-800/30 dark:text-red-400'}`}>
                            {message}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                type="email"
                                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 
                                         placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700
                                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md 
                                     text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                                     focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Remember your password?{" "}
                            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword; 