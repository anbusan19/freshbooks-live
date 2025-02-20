import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/freshbooks-navbar-logo.png';

const ResetPassword = () => {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { confirmPasswordReset } = useAuth();
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const oobCode = searchParams.get('oobCode');
    const password = watch("password");

    useEffect(() => {
        if (window.history.replaceState) {
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
        }

        if (!oobCode) {
            setMessage("Invalid or expired password reset link. Please request a new one.");
            setIsSuccess(false);
        }
    }, [oobCode]);

    const onSubmit = async (data) => {
        if (!oobCode) {
            setMessage("Invalid or expired password reset link. Please request a new one.");
            setIsSuccess(false);
            return;
        }
        
        setIsLoading(true);
        setMessage("");
        try {
            await confirmPasswordReset(oobCode, data.password);
            setIsSuccess(true);
            setMessage("Password has been reset successfully! Redirecting to login...");
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            setIsSuccess(false);
            setMessage(error.message || "Failed to reset password. The link may have expired.");
            console.error(error);
        }
        setIsLoading(false);
    };

    return (
        <div className="h-120 flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <img src={logo} alt="Logo" className="mx-auto h-12 w-auto" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                        Set New Password
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Please enter your new password below.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {message && (
                        <div className={`p-3 rounded-lg text-sm ${isSuccess ? 'bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-800/30 dark:text-red-400'}`}>
                            {message}
                        </div>
                    )}

                    <div>
                        <label htmlFor="password" className="sr-only">New Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                                type="password"
                                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 
                                         placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700
                                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="New password"
                            />
                        </div>
                        {errors.password && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: value => value === password || "Passwords do not match"
                                })}
                                type="password"
                                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 
                                         placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700
                                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm password"
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading || !oobCode}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md 
                                     text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                                     focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword; 