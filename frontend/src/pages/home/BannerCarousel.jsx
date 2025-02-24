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
            <div className="py-4 sm:py-16 px-0 sm:px-4 relative">
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
        <div className="py-4 sm:py-16 px-0 sm:px-4 relative">
            <div className="max-w-7xl mx-auto">
                {/* Section Header - Hidden on mobile */}
                <div className="hidden sm:block text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
                        Special Offers
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Discover our latest promotions and exclusive deals
                    </p>
                </div>

                {/* Carousel */}
                <div className="-mx-4 sm:mx-0 sm:rounded-xl overflow-hidden">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation={{
                            enabled: true,
                            hideOnMobile: true
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        loop={true}
                        breakpoints={{
                            // Mobile view - 1 slide, full width
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 0,
                                navigation: {
                                    enabled: false
                                }
                            },
                            // Desktop view - 2 slides with spacing
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                                navigation: {
                                    enabled: true
                                }
                            }
                        }}
                        className="w-full"
                    >
                        {banners.map((banner) => (
                            <SwiperSlide key={banner._id}>
                                <div className="relative w-full group">
                                    {/* Aspect ratio container */}
                                    <div className="relative w-full pb-[56.25%] overflow-hidden rounded-lg">
                                        {/* Banner Image */}
                                        <img
                                            src={banner.image}
                                            alt={banner.title}
                                            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                                        />
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