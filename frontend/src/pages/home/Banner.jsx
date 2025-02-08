import { Link } from "react-router-dom";
import book1 from "../../assets/books/book-1.png";
import book2 from "../../assets/books/book-2.png";
import book3 from "../../assets/books/book-3.png";
import book4 from "../../assets/books/book-4.png";
import book5 from "../../assets/books/book-5.png";
import book6 from "../../assets/books/book-6.png";
import book7 from "../../assets/books/book-7.png";
import book8 from "../../assets/books/book-8.png";
import book9 from "../../assets/books/book-9.png";
import book10 from "../../assets/books/book-10.png";

const Banner = () => {
    const firstRowBooks = [book1, book2, book3, book4, book5, book1, book2, book3, book4, book5];
    const secondRowBooks = [book6, book7, book8, book9, book10, book6, book7, book8, book9, book10];

    return (
        <div className="banner-container relative overflow-hidden min-h-[85vh] sm:min-h-0">
            <div className="banner-overlay absolute inset-0"></div>
            
            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-8 sm:pt-32 pb-6 sm:pb-16">
                <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-16">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-8
                                 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600
                                 filter drop-shadow-lg animate-fade-in">
                        Discover Your Next Favorite Book
                    </h1>
                    <p className="text-sm sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-8
                                leading-relaxed animate-fade-in animation-delay-200 px-4 sm:px-0">
                        Explore our vast collection of books across all genres. 
                        From bestsellers to hidden gems, find your perfect read today.
                    </p>
                    <Link
                        to="/books"
                        className="inline-flex items-center px-6 py-2.5 sm:px-8 sm:py-3 rounded-full
                                 bg-gradient-to-r from-indigo-600 to-purple-600
                                 text-white font-semibold text-sm sm:text-lg
                                 transform hover:scale-105 transition-all duration-200
                                 shadow-lg hover:shadow-xl animate-fade-in animation-delay-400"
                    >
                        Explore Books
                    </Link>
                </div>

                {/* Infinite Scroll Books */}
                <div className="relative max-w-7xl mx-auto overflow-hidden -mx-3 sm:mx-0">
                    {/* First Row */}
                    <div className="flex gap-2 sm:gap-8 mb-2 sm:mb-8 infinite-scroll-left">
                        {firstRowBooks.map((book, index) => (
                            <div
                                key={index}
                                className="flex-none w-20 sm:w-48 h-28 sm:h-64 rounded-lg overflow-hidden
                                         transform hover:scale-105 transition-all duration-200
                                         shadow-lg hover:shadow-xl"
                            >
                                <img
                                    src={book}
                                    alt={`Book ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Second Row */}
                    <div className="flex gap-2 sm:gap-8 infinite-scroll-right">
                        {secondRowBooks.map((book, index) => (
                            <div
                                key={index}
                                className="flex-none w-20 sm:w-48 h-28 sm:h-64 rounded-lg overflow-hidden
                                         transform hover:scale-105 transition-all duration-200
                                         shadow-lg hover:shadow-xl"
                            >
                                <img
                                    src={book}
                                    alt={`Book ${index + 6}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Bubbles */}
            <div className="bubble bubble-blue-1 scale-50 sm:scale-100"></div>
            <div className="bubble bubble-blue-2 scale-50 sm:scale-100"></div>
            <div className="bubble bubble-blue-3 scale-50 sm:scale-100"></div>
            <div className="bubble bubble-yellow-1 scale-50 sm:scale-100"></div>
            <div className="bubble bubble-yellow-2 scale-50 sm:scale-100"></div>
            <div className="bubble bubble-yellow-3 scale-50 sm:scale-100"></div>
        </div>
    );
};

export default Banner;