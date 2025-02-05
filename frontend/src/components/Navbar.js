import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-900 text-white py-4 px-8 flex justify-between items-center">
      <div className="text-2xl font-semibold">BookApp</div>
      
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-200">Home</Link>
        <Link to="/add-book" className="hover:text-gray-200">AddBook</Link>
        
      </div>
    </nav>
  );
};

export default Navbar;
