import React, { useState } from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import { FiChevronDown } from 'react-icons/fi';
import '../../styles/shared-gradients.css';

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"]

const TopSellers = () => {
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
    const { data: books = [] } = useFetchAllBooksQuery();
  
    const filteredBooks = selectedCategory === "Choose a genre" 
        ? books 
        : books.filter(book => book.category === selectedCategory.toLowerCase());

    return (
        <div className='relative py-16 px-4 md:px-8 dark:bg-black/40 bg-gradient-to-b from-white/80 to-transparent dark:from-black/40 dark:to-transparent backdrop-blur-3xl'>
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

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-12'>
                    <h2 className='text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-6 md:mb-0'>
                        Top Sellers
                    </h2>
                    
                    {/* Category Filtering */}
                    <div className='relative'>
                        <select
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            name="category" 
                            id="category" 
                            className='appearance-none bg-white/80 dark:bg-[#1a1a1a]/80 text-gray-800 dark:text-gray-200
                                     border border-gray-200/20 dark:border-gray-800/20 rounded-lg px-6 py-3 pr-12
                                     focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:focus:ring-indigo-400/30
                                     cursor-pointer transition-all duration-300
                                     hover:bg-gray-50 dark:hover:bg-gray-800/50
                                     backdrop-blur-xl'
                        >
                            {categories.map((category, index) => (
                                <option 
                                    key={index} 
                                    value={category}
                                    className='bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-200'
                                >
                                    {category}
                                </option>
                            ))}
                        </select>
                        <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
                    {filteredBooks.map((book) => (
                        <div key={book._id} className="h-full">
                            <BookCard book={book} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopSellers