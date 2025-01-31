import React from 'react'
import { FiShoppingCart, FiHeart } from 'react-icons/fi'
import { getImgUrl } from '../../utils/getImgUrl'

import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'

const BookCard = ({book}) => {
    const dispatch =  useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }
    return (
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md transition-shadow duration-300 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-1/3">
                <Link to={`/books/${book._id}`}>
                    <img
                        src={`${book.coverImage}`}
                        alt=""
                        className="w-full h-full object-cover rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                    />
                </Link>
            </div>

            <div className="flex-1">
                <Link to={`/books/${book._id}`}>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {book?.title}
                    </h3>
                </Link>
                <p className="text-gray-600 mb-4">
                    <strong>Rating:</strong> {Array.from({ length: 5 }, (_, index) => (
                        <span key={index} className={index < book.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                    ))}
                </p>
                <p className="text-lg font-semibold text-gray-800 mb-2">
                    ₹{book?.newPrice} <span className="line-through text-gray-500 ml-2">₹ {book?.oldPrice}</span>
                </p>
                <div className="flex items-center space-x-2">
                    <button className="bg-red-500 text-white p-2 rounded-full">
                        <FiHeart />
                    </button>
                    <button 
                        onClick={() => handleAddToCart(book)}
                        className="bg-yellow-500 text-white p-2 rounded-full flex items-center gap-1"
                    >
                        <FiShoppingCart />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookCard