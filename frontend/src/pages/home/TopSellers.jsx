import React, { useState } from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import '../../styles/shared-gradients.css';

const genres = ["All", "Self Development", "Business", "Mystery & Crime Thriller", "Romance", "Kids Book"];

const categoryMapping = {
    "Self Development": "self-development",
    "Business": "business",
    "Mystery & Crime Thriller": "mystery&crimethriller",
    "Romance": "romance",
    "Kids Book": "kids-book"
};

const TopSellers = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const { data: books = [] } = useFetchAllBooksQuery();
  
    const filteredBooks = books
        .filter(book => book.trending)
        .filter(book => selectedCategory === "All" ? true : book.category === categoryMapping[selectedCategory]);

    return (
        <section className='relative py-4 sm:py-8 px-2 sm:px-4 bg-gray-50/50 dark:bg-gray-900/50'>
            <div className="max-w-7xl mx-auto relative">
                {/* Header Section */}
                <div className='flex flex-col gap-2 sm:gap-4 mb-4 sm:mb-6'>
                    <h2 className='text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400'>
                        Trending Books
                    </h2>
                    
                    {/* Genre Buttons */}
                    <div className='flex flex-wrap gap-2 justify-center'>
                        {genres.map((genre) => (
                            <button
                                key={genre}
                                onClick={() => setSelectedCategory(genre)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                    ${selectedCategory === genre
                                        ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                                        : 'bg-white/90 dark:bg-[#1a1a1a]/90 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                    } border border-gray-200/20 dark:border-gray-800/20`}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Books Swiper */}
                <Swiper
                    modules={[FreeMode]}
                    spaceBetween={20}
                    slidesPerView="auto"
                    freeMode={true}
                    className='!pb-4'
                >
                    {filteredBooks.map((book) => (
                        <SwiperSlide key={book._id} className='!w-[180px]'>
                            <BookCard book={book} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default TopSellers;