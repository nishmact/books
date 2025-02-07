import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setSearchResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query === '') {
     
      axios.get('https://books-wnlk.onrender.com/api/books')
        .then(response => {
          setSearchResults(response.data);
        })
        .catch(error => console.error(error));
    } else {
     
      axios.get(`https://books-wnlk.onrender.com/api/books/search?query=${query}`)
        .then(response => {
          setSearchResults(response.data);
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="flex justify-center mt-5 mb-2">
      <div className="w-full max-w-4xl flex items-center space-x-4">
       
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
          className="w-full p-4 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 shadow-md placeholder-gray-500 text-gray-700"
        />
      
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
