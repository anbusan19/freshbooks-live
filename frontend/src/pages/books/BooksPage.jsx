import React, { useState, useEffect } from 'react';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import BookCard from './BookCard';
import { FiChevronDown } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import './BooksPage.css';

const categories = [
    "All Books",
    "Self Development",
    "Business",
    "Mystery & Crime Thriller",
    "Romance",
    "Kids Book"
];

const categoryMapping = {
    "self-development": "Self Development",
    "business": "Business",
    "mystery&crimethriller": "Mystery & Crime Thriller",
    "romance": "Romance",
    "kids-book": "Kids Book"
};

const BooksPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    const [selectedCategory, setSelectedCategory] = useState(
        categoryParam ? (categoryMapping[categoryParam] || "All Books") : "All Books"
    );
    const { data: books = [], isLoading } = useFetchAllBooksQuery();
    const [sortBy, setSortBy] = useState("default");

    // Update selected category when URL parameter changes
    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryMapping[categoryParam] || "All Books");
        } else {
            setSelectedCategory("All Books");
        }
    }, [categoryParam]);

    // Handle category change
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === "All Books") {
            searchParams.delete('category');
        } else {
            const urlCategory = Object.entries(categoryMapping).find(([key, value]) => value === category)?.[0];
            if (urlCategory) {
                searchParams.set('category', urlCategory);
            }
        }
        setSearchParams(searchParams);
    };

    // Filter books by category
    const filteredBooks = selectedCategory === "All Books"
        ? books
        : books.filter(book => book.category === Object.entries(categoryMapping).find(([key, value]) => value === selectedCategory)?.[0]);

    // Sort books based on selection
    const sortedBooks = [...filteredBooks].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.newPrice - b.newPrice;
            case "price-high":
                return b.newPrice - a.newPrice;
            case "name-asc":
                return a.title.localeCompare(b.title);
            case "name-desc":
                return b.title.localeCompare(a.title);
            default:
                return 0;
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl text-gray-600 dark:text-gray-300">Loading...</div>
            </div>
        );
    }

    return (
        <div className="books-page-container min-h-screen pb-32 sm:pb-28 pt-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
            {/* Aural Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient Blobs */}
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-100/30 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100/30 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-96 h-96 bg-pink-100/30 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
                
                {/* Background Bubbles */}
                <div className="bubble bubble-1 bg-blue-400/20 dark:bg-blue-600/20"></div>
                <div className="bubble bubble-2 bg-purple-400/20 dark:bg-purple-600/20"></div>
                <div className="bubble bubble-3 bg-indigo-400/20 dark:bg-indigo-600/20"></div>
                <div className="bubble bubble-4 bg-pink-400/20 dark:bg-pink-600/20"></div>
                <div className="bubble bubble-5 bg-violet-400/20 dark:bg-violet-600/20"></div>
            </div>

            {/* Content */}
            <div className="max-w-[1920px] mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 filter drop-shadow-lg animate-fade-in">
                        Explore Our Books
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed animate-fade-in animation-delay-200">
                        Discover your next favorite read from our collection
                    </p>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 px-4 sm:px-6 animate-fade-in animation-delay-600">
                    {sortedBooks.map((book, index) => (
                        <div key={book._id} 
                             className={`animate-fade-in transform transition-transform duration-300 hover:-translate-y-1 w-full`} 
                             style={{ animationDelay: `${(index % 5) * 100}ms` }}>
                            <BookCard book={book} />
                        </div>
                    ))}
                </div>

                {/* No Results Message */}
                {sortedBooks.length === 0 && (
                    <div className="text-center py-12 animate-fade-in">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                            No books found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Try adjusting your filters to find what you're looking for.
                        </p>
                    </div>
                )}
            </div>

            {/* Fixed Bottom Filter Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-xl border-t border-gray-200/20 dark:border-gray-800/20 z-50 px-4 py-3 sm:py-4">
                <div className="max-w-[1920px] mx-auto flex flex-row gap-3 items-center">
                    {/* Category Filter */}
                    <div className="relative flex-1">
                        <select
                            value={selectedCategory}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            className="w-full appearance-none bg-white/90 dark:bg-[#1a1a1a]/90 text-gray-800 dark:text-gray-200
                                     border border-gray-200/20 dark:border-gray-800/20 rounded-lg px-3 py-2
                                     focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:focus:ring-indigo-400/30
                                     cursor-pointer transition-all duration-300 text-sm"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none w-4 h-4" />
                    </div>

                    {/* Sort Filter */}
                    <div className="relative flex-1">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full appearance-none bg-white/90 dark:bg-[#1a1a1a]/90 text-gray-800 dark:text-gray-200
                                     border border-gray-200/20 dark:border-gray-800/20 rounded-lg px-3 py-2
                                     focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:focus:ring-indigo-400/30
                                     cursor-pointer transition-all duration-300 text-sm"
                        >
                            <option value="default">Sort by</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="name-asc">Name: A to Z</option>
                            <option value="name-desc">Name: Z to A</option>
                        </select>
                        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none w-4 h-4" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BooksPage; 