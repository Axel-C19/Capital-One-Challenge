// Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white z-50 relative shadow-md h-20">
      {/* Logo with height 100% of the header and adjusted sizing */}
      <img
        src="/Planetary Capital.png"
        alt="Planetary Capital Logo"
        className="h-full object-contain"
      />
      <nav>
        <Link to="/resources" className="text-blue-900 px-4 py-2">
          Resources
        </Link>
        <Link to="/contact" className="text-blue-900 px-4 py-2">
          Contact
        </Link>
        <Link to="/signin" className="text-white bg-blue-500 px-4 py-2 rounded">
          Sign in
        </Link>
        <Link
          to="/signup"
          className="text-white bg-green-500 px-4 py-2 rounded ml-2"
        >
          Register
        </Link>
      </nav>
    </header>
  );
};

export default Header;
