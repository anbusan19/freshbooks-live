import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useGetActiveBannersQuery } from '../../redux/features/banners/bannersApi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BannerCarousel = () => {
    const { data: banners = [], isLoading, error } = useGetActiveBannersQuery();

    if (isLoading) {
        return (
            <div className="py-16 px-4 relative">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-gray-600 dark:text-gray-300">Loading banners...</p>
                </div>
            </div>
        );
    }

    if (!banners || banners.length === 0) {
        return null;
    }

    return (
        <div className="py-16 px-4 relative">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
                        Special Offers
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Discover our latest promotions and exclusive deals
                    </p>
                </div>

                {/* Carousel */}
                <div className="rounded-xl overflow-hidden shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            // Mobile view - 1 slide
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 0,
                            },
                            // Tablet view - 1 slide with better spacing
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            // Desktop view - 2 slides
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                        }}
                        className="w-full h-[300px] sm:h-[400px] md:h-[500px]"
                    >
                        {banners.map((banner) => (
                            <SwiperSlide key={banner._id} className="p-2">
                                <div className="relative w-full h-full rounded-lg overflow-hidden group">
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                                    
                                    {/* Banner Image */}
                                    <img
                                        src={banner.image}
                                        alt={banner.title}
                                        className="w-full h-full object-cover rounded-lg transform transition-transform duration-700 group-hover:scale-105"
                                    />
                                    
                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20">
                                        <div className="max-w-xl">
                                            <h2 className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-4 line-clamp-2">
                                                {banner.title}
                                            </h2>
                                            <p className="text-sm sm:text-base text-gray-200 line-clamp-2">
                                                {banner.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default BannerCarousel; 