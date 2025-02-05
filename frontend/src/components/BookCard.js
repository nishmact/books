import React from "react";

const BookCard = ({ book, index, onClick }) => {
  const imageIndex = (index % 5) + 1; 
  const imageSrc = `/images/book${imageIndex}.jpg`; 

 
  return (
    <div
      className="bg-white shadow rounded overflow-hidden cursor-pointer"
      onClick={() => onClick({ ...book, imageSrc })} 
    >
      <img
        src={imageSrc}
        alt={book.title}
        className="w-full h-[450px] object-cover" 
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-gray-600">{book.author}</p>
      </div>
    </div>
  );
};

export default BookCard;
