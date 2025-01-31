import React from 'react'

// Import first 10 book images
import book1 from "../../assets/books/book-1.png"
import book10 from "../../assets/books/book-10.png"
import book2 from "../../assets/books/book-2.png"
import book3 from "../../assets/books/book-3.png"
import book4 from "../../assets/books/book-4.png"
import book5 from "../../assets/books/book-5.png"
import book6 from "../../assets/books/book-6.png"
import book7 from "../../assets/books/book-7.png"
import book8 from "../../assets/books/book-8.png"
import book9 from "../../assets/books/book-9.png"

const Banner = () => {
  const books = [book1, book2, book3, book4, book5, book6, book7, book8, book9, book10];
  // Split books into two rows and duplicate them for seamless animation
  const firstRow = [...books.slice(0, 5), ...books.slice(0, 5)];
  const secondRow = [...books.slice(5), ...books.slice(5)];

  return (
    <div className='py-16 px-8 bg-light rounded-lg overflow-hidden'>
      {/* Header Section */}
      <div className='text-center mb-12'>
        <h2 className='text-sm uppercase tracking-wider text-dark/60 mb-4'>A TOP BOOK SELECTION FOR 2024</h2>
        <h1 className="md:text-6xl text-4xl font-bold mb-6 tracking-tight animated-text">
  DISCOVER THE DIFFERENCE
</h1>

      </div>

      {/* Book Rows with Animation */}
      <div className='space-y-8'>
        {/* First Row - Left to Right */}
        <div className='relative'>
          <div className='animate-scroll-left flex gap-4 md:gap-6'>
            {firstRow.map((book, index) => (
              <div 
                key={index} 
                className='group relative w-40 flex-none aspect-[3/4] overflow-hidden rounded-lg transition-transform duration-1000 hover:-translate-y-2'
              >
                <img 
                  src={book} 
                  alt={`Book ${index + 1}`} 
                  className='w-full h-full object-contain rounded-lg shadow-lg'
                />
                <div className='absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-1000'></div>
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Right to Left */}
        <div className='relative'>
          <div className='animate-scroll-right flex gap-4 md:gap-6'>
            {secondRow.map((book, index) => (
              <div 
                key={index} 
                className='group relative w-40 flex-none aspect-[3/4] overflow-hidden rounded-lg transition-transform duration-300  rotate-90hover:-translate-y-2'
                // w-48 is a Tailwind CSS utility class that sets the width of an element to 12rem (192px)
w-48='true'
              >
                <img 
                  src={book} 
                  alt={`Book ${index + 1}`} 
                  className='w-full h-full object-contain rounded-lg shadow-lg'
                />
                <div className='absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300'></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center mt-12">
  <button className="animated-button hover:opacity-80 text-white px-8 py-3 rounded-lg transition duration-300 font-medium">
    Explore Now
  </button>
</div>

    </div>
  )
}

export default Banner