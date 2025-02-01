import React, { useEffect, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';


const Recommened = () => {
    const {data: books = []} = useFetchAllBooksQuery();
    
    return (
        <div className='py-12 px-4 sm:px-6 lg:px-8'>
            <h2 className='text-2xl sm:text-3xl font-semibold mb-6'>Recommended for you</h2>

            <Swiper
                slidesPerView={2}
                spaceBetween={16}
                navigation={true}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 12,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    }
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    books.length > 0 && books.slice(8, 18).map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default Recommened