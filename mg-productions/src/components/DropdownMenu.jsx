import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

function DropdownMenu() {
  const handleLogout = () => {
    const auth = getAuth(); // Initialize Firebase Authentication
    signOut(auth)
      .then(() => {
        // Successfully signed out
        window.location.href = window.location.origin; // Redirect to home or login page
      })
      .catch((error) => {
        console.error('Error during logout:', error.message);
      });
  };

  return (
    <div className="absolute right-0 top-4 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800">
      <Link
        to={'/Profile'}
        className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        view profile
      </Link>

      <Link
        to={'/Settings'}
        className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        Settings
      </Link>

      <a
        onClick={handleLogout}
        className="block px-4 py-3 text-sm text-red-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        Sign Out
      </a>
    </div>
  );
}

export default DropdownMenu;
