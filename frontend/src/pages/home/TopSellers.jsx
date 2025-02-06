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
  
    const filteredBooks = books
        .filter(book => book.trending)
        .filter(book => selectedCategory === "Choose a genre" ? true : book.category === selectedCategory.toLowerCase());

    return (
        <section className='relative isolate py-16 px-4 md:px-8 overflow-hidden'>
            {/* Background Effects - Moved lower z-index */}
            <div className="absolute inset-0 -z-20">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 -translate-x-1/2 -translate-y-1/2">
                        <div className="gradient-blob gradient-blob-1 animate-blob-slow opacity-70"></div>
                    </div>
                    <div className="absolute top-3/4 right-1/4 w-96 h-96 translate-x-1/2 -translate-y-1/2">
                        <div className="gradient-blob gradient-blob-2 animate-blob-slow animation-delay-2000 opacity-70"></div>
                    </div>
                    <div className="absolute top-1/2 left-2/3 w-96 h-96">
                        <div className="gradient-blob gradient-blob-3 animate-blob-slow animation-delay-4000 opacity-70"></div>
                    </div>
                </div>
            </div>

            {/* Subtle backdrop gradient - separate from blobs */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/40 to-transparent dark:from-black/20 dark:to-transparent"></div>

            <div className="max-w-7xl mx-auto relative">
                {/* Header Section */}
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-12'>
                    <h2 className='text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-6 md:mb-0'>
                        Trending Books
                    </h2>
                    
                    {/* Category Filtering */}
                    <div className='relative'>
                        <select
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            name="category" 
                            id="category" 
                            className='appearance-none bg-white/90 dark:bg-[#1a1a1a]/90 text-gray-800 dark:text-gray-200
                                     border border-gray-200/20 dark:border-gray-800/20 rounded-lg px-6 py-3 pr-12
                                     focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:focus:ring-indigo-400/30
                                     cursor-pointer transition-all duration-300
                                     hover:bg-gray-50 dark:hover:bg-gray-800/50'
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

                {/* Books Carousel - Increased z-index and added background */}
                <div className="relative z-20 bg-transparent">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={30}
                        slidesPerView={2}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                            // Mobile view (default) - 2 slides
                            0: {
                                slidesPerView: 2,
                                spaceBetween: 16,
                            },
                            // Tablet view - 3 slides
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 24,
                            },
                            // Desktop view - 4 slides
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                        }}
                        className="w-full"
                    >
                        {filteredBooks.map((book) => (
                            <SwiperSlide key={book._id}>
                                <div className="h-full bg-transparent">
                                    <BookCard book={book} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default TopSellers