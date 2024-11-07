import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

function DropdownMenu() {
    const { logout } = useAuth0();
  return (
    <div class="absolute right-0 top-4 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800">
            
            <Link to={'/Profile'} className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                view profile
            </Link>
            
            <Link to={'/Settings'} class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                Settings
            </Link>

            
            <a onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} class="block px-4 py-3 text-sm text-red-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                Sign Out
            </a>
        </div>
  )
}

export default DropdownMenu
