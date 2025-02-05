import React, { useState } from "react";
import BookCard from "./BookCard";

const BookList = ({ books }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (book) => {
    setSelectedBook(book); // Set the clicked book as selected
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Available Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.length ? (
          books.map((book, index) => (
            <BookCard key={book._id} book={book} index={index} onClick={handleBookClick} />
          ))
        ) : (
          <p className="text-center text-gray-500">No books available.</p>
        )}
      </div>

      {/* Conditional rendering of book details if a book is selected */}
      {selectedBook && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg  w-[900px]">
            <h3 className="text-2xl font-semibold">{selectedBook.title}</h3>
            <p className="text-lg">{selectedBook.author}</p>
            <p className="mt-4">{selectedBook.description}</p>
            <img
              src={selectedBook.imageSrc}
              alt={selectedBook.title}
              className="w-full h-[300px] object-cover mt-4" // Display image in modal
            />
            <button
              className="mt-4 bg-red-500 text-white p-2 rounded"
              onClick={() => setSelectedBook(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
