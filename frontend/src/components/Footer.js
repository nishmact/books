import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-20">
      <div className="text-center">
        <p>© 2024 Book Management App. All rights reserved.</p>
        <div className="space-x-4 mt-2">
          <a href="/privacy" className="hover:text-gray-200">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-200">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
