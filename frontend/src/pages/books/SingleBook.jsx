import React from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import { addToCart } from '../../redux/features/cart/cartSlice';

const SingleBook = () => {
    const {id} = useParams();
    const {data: book, isLoading, isError} = useFetchBookByIdQuery(id);

    const dispatch =  useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error happending to load book info</div>
  return (
    <div className="max-w-4xl mx-auto p-8">
        <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
                <img
                    src={`${book.coverImage}`}
                    alt={book.title}
                    className="w-full h-auto mb-4 md:mb-0"
                />
            </div>
            <div className="md:w-2/3 md:pl-8">
                <h1 className="text-4xl font-semibold mb-4">{book.title}</h1>
                <hr className="mb-4" />
                <p className="text-gray-800 mb-2"><strong>Author :</strong> {book.author || 'Admin'}</p>
                <p className="text-gray-800 mb-4"><strong>Description :</strong> {book.description}</p>
                <p className="text-gray-800 mb-4"><strong>Rating :</strong><span> </span> 
                    {Array.from({ length: 5 }, (_, index) => (
                        <span key={index} className={index < book.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                    ))}
                </p>
                <p className="text-red-600 text-lg mb-4">
                    <strong>Price:</strong> Rs. {book.newPrice}
                    <span> </span>
                    <span className="line-through text-gray-500">Rs. {book.oldPrice}</span> 
                    <span> </span>
                    <span className="text-red-500">
                        ({((book.oldPrice - book.newPrice) / book.oldPrice * 100).toFixed(0)}% off)
                    </span>
                </p>

                <div className="flex space-x-4">
                    <button className="bg-pink-600 text-white px-6 py-3 rounded">Add to wishlist</button>
                    <button onClick={() => handleAddToCart(book)} className="bg-orange-500 text-white px-6 py-3 rounded flex items-center">
                        <FiShoppingCart className="mr-2" /> Add to cart
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleBook