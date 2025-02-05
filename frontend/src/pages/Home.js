import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import BookList from "../components/BookList";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch books on initial load
    axios
      .get("http://localhost:5000/api/books")
      .then((response) => {
        setBooks(response.data);
        setSearchResults(response.data); // Show all books initially
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <header className="bg-blue-100 text-center py-10">
        <h1 className="text-4xl font-bold">Welcome to the Book Management App</h1>
        <p className="text-lg mt-2 text-gray-600">
          Find and manage your favorite books with ease
        </p>
        
        {/* Search Bar */}
       
      </header>
      <SearchBar setSearchResults={setSearchResults} allBooks={books} />

      <main className="flex-grow">
        {/* BookList component receives filtered searchResults */}
        <BookList books={searchResults} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
