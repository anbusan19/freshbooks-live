import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';
import logo from '../assets/freshbooks-logo.png';

const Register = () => {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { registerUser, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await registerUser(data.email, data.password);
            alert("User registered successfully!");
            navigate("/login");
        } catch (error) {
            setMessage("Please provide a valid email and password");
            console.error(error);
        }
        setIsLoading(false);
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signInWithGoogle();
            alert("Login successful!");
            navigate("/");
        } catch (error) {
            alert("Google sign in failed!");
            console.error(error);
        }
        setIsLoading(false);
    };

  return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300 overflow-hidden">
            {/* Background Effects - Positioned in corners */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Top-left corner */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-100/20 dark:bg-purple-900/10 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-50 animate-blob"></div>
                
                {/* Bottom-right corner */}
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100/20 dark:bg-indigo-900/10 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                
                {/* Top-right corner */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-pink-100/20 dark:bg-pink-900/10 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
            </div>

            <div className="flex items-center gap-12 max-w-4xl w-full relative z-10">
                {/* Brand Logo Section */}
                <div className="hidden lg:flex flex-col items-center space-y-8 w-80">
                    <img src={logo} alt="Freshbooks Logo" className="w-48 h-auto" />
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white tracking-tight">Join Us Today</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">Start your journey with Freshbooks</p>
                    </div>
                </div>

                {/* Register Form Section */}
                <div className="flex-1 max-w-md">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 relative overflow-hidden">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Create Account</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-4">
                                <div className="relative group">
                                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    <input
                                        {...register("email", { required: true })}
                                        type="email"
                                        placeholder="Email"
                                        className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-10 py-3 
                                                 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400
                                                 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 
                                                 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                                                 transition-all"
                                    />
                                </div>
                                <div className="relative group">
                                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                                    <input
                                        {...register("password", { required: true })}
                                        type="password"
                                        placeholder="Password"
                                        className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-10 py-3 
                                                 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400
                                                 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 
                                                 focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                                                 transition-all"
                                    />
                                </div>
                            </div>

                            {message && <p className="text-red-500 dark:text-red-400 text-sm">{message}</p>}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white rounded-lg px-4 py-3 font-medium 
                                         transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] 
                                         disabled:opacity-70 disabled:cursor-not-allowed 
                                         flex items-center justify-center gap-2 group"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Create account
                                        <FaUserPlus className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
            </div>

                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={isLoading}
                                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 
                                         rounded-lg px-4 py-3 font-medium transition-all duration-300 
                                         hover:bg-gray-50 dark:hover:bg-gray-800 
                                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 
                                         flex items-center justify-center gap-3"
                            >
                                <FcGoogle className="w-5 h-5" />
              Sign in with Google
            </button>

                            <div className="text-center">
                                <p className="text-gray-600 dark:text-gray-300">
                                    Already have an account?{" "}
                                    <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </form>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Register;