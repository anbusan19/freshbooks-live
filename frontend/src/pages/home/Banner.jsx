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
        <section className="relative py-4 sm:py-8 px-2 sm:px-4 bg-gray-50/50 dark:bg-gray-900/50">
            <div className="banner-overlay absolute inset-0 -z-10"></div>
            
            {/* Content */}
            <div className="max-w-7xl mx-auto relative z-20">
                <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-16">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-8
                                 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600
                                 filter drop-shadow-lg animate-fade-in">
                        Discover The Difference with freshbooks™ 
                    </h1>
                    <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-8 leading-relaxed animate-fade-in animation-delay-200">
                        Explore our vast collection of books across all genres. From bestsellers to hidden gems, find your perfect read today.
                    </p>
                    <Link
                        to="/books"
                        className="inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base font-medium text-white 
                                 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg
                                 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105
                                 transition-all duration-200 animate-fade-in animation-delay-400"
                    >
                        Explore Books
                    </Link>
                </div>

                {/* Infinite Scroll Books */}
                <div className="relative max-w-7xl mx-auto overflow-hidden -mx-3 sm:mx-0 z-20">
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
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="bubble bubble-blue-1 scale-50 sm:scale-100"></div>
                <div className="bubble bubble-blue-2 scale-50 sm:scale-100"></div>
                <div className="bubble bubble-blue-3 scale-50 sm:scale-100"></div>
                <div className="bubble bubble-yellow-1 scale-50 sm:scale-100"></div>
                <div className="bubble bubble-yellow-2 scale-50 sm:scale-100"></div>
                <div className="bubble bubble-yellow-3 scale-50 sm:scale-100"></div>
            </div>
        </section>
    );
};

export default Banner;