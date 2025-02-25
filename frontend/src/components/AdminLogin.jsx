import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { FiUser, FiLock, FiLogIn } from "react-icons/fi"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import getBaseUrl from '../utils/baseURL'
import logo from '../assets/freshbooks-logo.png'

const AdminLogin = () => {
    const [message, setMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data)
            const auth = response.data;
            if (auth.token) {
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token')
                    alert('Token has been expired!, Please login again.');
                    navigate("/")
                }, 3600 * 1000)

                alert("Admin Login successful!")
                navigate("/admin-dashboard")
            }
        } catch (error) {
            setMessage("Please provide a valid username and password")
            console.error(error)
        }
        setIsLoading(false);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 transition-colors duration-300 overflow-hidden admin-bg">
            {/* Enhanced background animations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Original blobs with updated animation */}
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-100/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-96 h-96 bg-pink-100/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                
                {/* Original bubbles */}
                <div className="bubble bubble-1"></div>
                <div className="bubble bubble-2"></div>
                <div className="bubble bubble-3"></div>
                <div className="bubble bubble-4"></div>
                <div className="bubble bubble-5"></div>

                {/* New blue bubbles */}
                <div className="bubble bubble-blue-1"></div>
                <div className="bubble bubble-blue-2"></div>
                <div className="bubble bubble-blue-3"></div>

                {/* New yellow bubbles */}
                <div className="bubble bubble-yellow-1"></div>
                <div className="bubble bubble-yellow-2"></div>
                <div className="bubble bubble-yellow-3"></div>

                {/* Depth-enhancing elements */}
                <div className="depth-bubble depth-bubble-1"></div>
                <div className="depth-bubble depth-bubble-2"></div>
                <div className="depth-bubble depth-bubble-3"></div>
                <div className="depth-layer-1 absolute inset-0"></div>
                <div className="depth-layer-2"></div>
            </div>

            <div className="flex items-center gap-12 max-w-4xl w-full relative z-10">
                {/* Brand Logo Section with larger logo */}
                <div className="hidden lg:flex flex-col items-center space-y-8 w-80">
                    <img src={logo} alt="Freshbooks Logo" className="w-60 h-auto" />
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                            Admin Portal
                        </h1>
                        <p className="text-gray-600 mt-2">Manage your bookstore with ease</p>
                    </div>
                </div>

                {/* Login Form Section */}
                <div className="flex-1 max-w-md">
                    <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shine pointer-events-none"></div>

                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Admin Login</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-4">
                                <div className="relative group">
                                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-indigo-500 transition-colors group-focus-within:text-indigo-600" />
                        <input
                            {...register("username", { required: true })}
                                        type="text"
                                        placeholder="Username"
                                        className="w-full bg-white/50 backdrop-blur-sm border border-gray-200 rounded-lg px-12 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-400"
                        />
                    </div>
                                <div className="relative group">
                                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-indigo-500 transition-colors group-focus-within:text-indigo-600" />
                                    <input
                                        {...register("password", { required: true })}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        className="w-full bg-white/50 backdrop-blur-sm border border-gray-200 rounded-lg px-12 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-400 pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="w-5 h-5" />
                                        ) : (
                                            <FaEye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {message && <p className="text-red-500 text-sm">{message}</p>}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg px-4 py-3 font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-lg"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Sign in to Dashboard
                                        <FiLogIn className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-500">
                                2025 Freshbooks. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin