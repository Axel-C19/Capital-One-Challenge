import React from "react";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

const NavButton = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
  >
    {text}
  </button>
);

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/Home">
              <img
                className="h-8 w-auto"
                src="/Planetary Capital.png"
                alt="Planetary Capital Logo"
                style={{ width: 80, height: 80, marginBottom: "16px" }}
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/Dashboard">
                <NavButton text="My Goals" />
              </Link>
              <Link href="/SolarSystem">
                <NavButton text="My planetary system" />
              </Link>
              <NavButton text="Friends" />
              <NavButton text="My Stats" />
              <Link href="/AboutUs">
                <NavButton text="Learn More" />
              </Link>
              {/* Logout Button */}
              <Link href="/">
                <NavButton text="Logout" onClick={handleLogout} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
