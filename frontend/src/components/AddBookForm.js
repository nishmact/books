import React, { useState, useEffect } from "react";
import axios from "axios";

const AddBookForm = ({
  book,
  setBooks,
  closeModal,
  isEditing,
  handleBookAdded,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [isbn, setIsbn] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isEditing) {
      setTitle("");
      setAuthor("");
      setPublicationYear("");
      setIsbn("");
      setDescription("");
      setErrors({});
    }
    if (isEditing && book) {
      setTitle(book.title);
      setAuthor(book.author);
      setPublicationYear(book.publicationYear);
      setIsbn(book.isbn);
      setDescription(book.description);
    }
  }, [book, isEditing]);

  const validateForm = () => {
    let newErrors = {};
  
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (!/^[A-Za-z\s]+$/.test(title)) { 
      newErrors.title = "Title must contain only letters";
    }
    
    if (!author.trim()) {
      newErrors.author = "Author is required";
    } else if (!/^[A-Za-z\s.]+$/.test(author)) { 
      newErrors.author = "Author must contain only letters, spaces, and periods";
    }
    
    
    if (!String(publicationYear).trim()) {
      newErrors.publicationYear = "Publication Year is required";
    } else if (!/^\d+$/.test(publicationYear) || parseInt(publicationYear, 10) <= 0) {
      newErrors.publicationYear = "Publication Year must be a positive number";
    }
  
    if (!isbn.trim()) {
      newErrors.isbn = "ISBN is required";
    }
  
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newBook = { title, author, publicationYear, isbn, description };

    try {
      if (isEditing) {
        const response = await axios.put(
          `https://books-wnlk.onrender.com/api/books/${book._id}`,
          newBook
        );
        setBooks((prevBooks) =>
          prevBooks.map((b) =>
            b._id === response.data._id ? response.data : b
          )
        );
      } else {
        const response = await axios.post(
          "https://books-wnlk.onrender.com/api/books",
          newBook
        );
        if (response.data) {
          handleBookAdded(response.data.book);
        } else {
          console.error("No book data returned from API");
        }
      }
      closeModal();
    } catch (error) {
      console.error("Error adding/updating book:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">
            {isEditing ? "Edit Book" : "Add a New Book"}
          </h2>

          <div className="space-y-2">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
             <p className="text-red-500 font-bold text-base">{errors.title}</p>

            )}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.author && (
              <p className="text-red-500 font-bold text-base">{errors.author}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Publication Year</label>
            <input
              type="number"
              value={publicationYear}
              onChange={(e) => setPublicationYear(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.publicationYear && (
              <p className="text-red-500 font-bold text-base">{errors.publicationYear}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">ISBN</label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.isbn && (
              <p className="text-red-500 font-bold text-base">{errors.isbn}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="text-red-500 font-bold text-base">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-between gap-3">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isEditing ? "Update Book" : "Add Book"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="w-full py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
