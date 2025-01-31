import React, { useState } from 'react';
import BookCard from '../books/BookCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"]

const TopSellers = () => {
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
    const {data: books = []} = useFetchAllBooksQuery();
  
    const filteredBooks = selectedCategory === "Choose a genre" 
        ? books 
        : books.filter(book => book.category === selectedCategory.toLowerCase());

    return (
        <div className='py-10'>
            <h2 className='text-3xl font-semibold mb-6 text-primary-dark dark:text-primary-light'>
                Top Sellers
            </h2>
            
            {/* category filtering */}
            <div className='mb-8 flex items-center'>
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category" 
                    id="category" 
                    className='bg-primary-light/20 dark:bg-dark-secondary/30 
                             text-primary-dark dark:text-primary-light
                             border border-primary-light/20 dark:border-primary-light/10
                             rounded-md px-4 py-2
                             focus:outline-none focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary-light/30
                             cursor-pointer transition-all duration-200
                             hover:bg-primary-light/30 dark:hover:bg-dark-secondary/50'
                >
                    {categories.map((category, index) => (
                        <option 
                            key={index} 
                            value={category}
                            className='bg-surface-light dark:bg-dark-secondary text-primary-dark dark:text-primary-light'
                        >
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper min-h-[400px] w-full"
            >
                {filteredBooks.map((book) => (
                    <SwiperSlide key={book._id} className="flex items-center justify-center h-full">
                        <div className="w-full h-full flex items-center justify-center">
                            <BookCard book={book} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default TopSellers