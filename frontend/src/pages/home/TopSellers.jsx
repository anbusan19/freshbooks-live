import React, { useState } from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
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
        <section className='relative py-4 sm:py-8 px-2 sm:px-4 bg-gray-50/50 dark:bg-gray-900/50'>
            <div className="max-w-7xl mx-auto relative">
                {/* Header Section */}
                <div className='flex flex-col gap-2 sm:gap-4 mb-4 sm:mb-6'>
                    <h2 className='text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400'>
                        Trending Books
                    </h2>
                    
                    {/* Category Filtering */}
                    <div className='relative z-10 w-full sm:w-auto'>
                        <select
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            name="category" 
                            id="category" 
                            className='w-full sm:w-auto appearance-none bg-white/90 dark:bg-[#1a1a1a]/90 text-gray-800 dark:text-gray-200
                                     border border-gray-200/20 dark:border-gray-800/20 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5
                                     focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:focus:ring-indigo-400/30
                                     cursor-pointer transition-all duration-300
                                     hover:bg-gray-50 dark:hover:bg-gray-800/50
                                     backdrop-blur-sm shadow-lg text-sm'
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
                        <FiChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none w-4 h-4" />
                    </div>
                </div>

                {/* Books Swiper */}
                <div className="px-4 -mx-4 sm:mx-0 sm:px-0">
                    <Swiper
                        modules={[FreeMode]}
                        freeMode={{
                            enabled: true,
                            sticky: false,
                            momentumBounce: false
                        }}
                        spaceBetween={12}
                        slidesPerView={2.2}
                        breakpoints={{
                            0: {
                                slidesPerView: 2.2,
                                spaceBetween: 12,
                            },
                            640: {
                                slidesPerView: 3.2,
                                spaceBetween: 16,
                            },
                            1024: {
                                slidesPerView: 4.2,
                                spaceBetween: 20,
                            },
                            1280: {
                                slidesPerView: 5.2,
                                spaceBetween: 24,
                            }
                        }}
                        className="!pb-4"
                    >
                        {filteredBooks.map((book) => (
                            <SwiperSlide key={book._id}>
                                <BookCard book={book} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default TopSellers