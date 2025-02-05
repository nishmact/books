import React, { useState, useEffect } from "react";
import axios from "axios";
import AddBookForm from "../components/AddBookForm";
import Navbar from "../components/Navbar";

const BookDetails = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error(error));
  }, []); 

  const handleEdit = (book) => {
    setBookToEdit(book);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteClick = (book) => {
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (bookToDelete) {
      axios
        .delete(`http://localhost:5000/api/books/${bookToDelete._id}`)
        .then(() => {
          setBooks((prevBooks) =>
            prevBooks.filter((book) => book._id !== bookToDelete._id)
          );
          setShowDeleteModal(false);
        })
        .catch((error) => console.error("Error deleting book", error));
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setShowModal(true);
  };

  const handleBookAdded = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]); 
    setShowModal(false);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <button
          onClick={handleAddClick}
          className="bg-blue-500 text-white p-2 rounded-md mb-4"
        >
          Add Book
        </button>

        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Author</th>
              <th className="border border-gray-300 p-2">Publication Year</th>
              <th className="border border-gray-300 p-2">ISBN</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td className="border border-gray-300 p-2">{book.title}</td>
                <td className="border border-gray-300 p-2">{book.author}</td>
                <td className="border border-gray-300 p-2">{book.publicationYear}</td>
                <td className="border border-gray-300 p-2">{book.isbn}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleEdit(book)}
                    className="bg-yellow-500 text-white py-2 px-4 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(book)}
                    className="bg-red-500 text-white p-2 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

         {/* Confirmation Modal */}
         {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg max-w-lg w-full">
              <h3 className="text-xl mb-4">Are you sure you want to delete this book?</h3>
              <div className="flex justify-end">
                <button
                  onClick={handleDeleteConfirm}
                  className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={handleDeleteCancel}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg max-w-lg w-full">
              <AddBookForm
                book={bookToEdit}
                setBooks={setBooks}
                closeModal={() => setShowModal(false)}
                isEditing={isEditing}
                handleBookAdded={handleBookAdded} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
