import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import DropdownMenu from './DropdownMenu';
import LoginButton from './LoginButton';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { isAuthenticated , user } = useAuth0();
  const dropdownRef = useRef(null); // Create a ref for the dropdown menu

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close the dropdown
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-white shadow-md">
      <div className="container mx-auto flex p-5 items-center justify-between">
        <a className="flex items-center text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Tailblocks</span>
        </a>

        {isAuthenticated ? (
          <div ref={dropdownRef} className="relative"> 
            <button onClick={toggleDropdown} className="mt-2 rounded-full bg-gray-100 relative">
              <img
                className="h-10 w-10 rounded-full"
                src={user.picture}
                alt={user.name}
              />
            </button>
            
            {isDropdownOpen && <DropdownMenu />}
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
};

export default Navbar;
