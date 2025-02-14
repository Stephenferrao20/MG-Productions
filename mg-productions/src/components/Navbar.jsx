import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from './DropdownMenu';
import LoginButton from './LoginButton';
import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase.config';
import { useStateValue } from '../context/StateProvider';

const Navbar = ({ setAuth }) => {
  const [{ user }, dispatch] = useStateValue();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const firebaseAuth = getAuth(app);

  // Toggle the dropdown menu
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  // Close the dropdown if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Authentication listener
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setAuth(true);
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        setAuth(false);
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });

    return unsubscribe;
  }, [firebaseAuth, dispatch, setAuth]);
  const cursive = {
    fontFamily: 'Lucida Handwriting',
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-md">
      <div className="container mx-auto flex p-5 items-center justify-between">
        <a className="flex items-center text-gray-900">
          <span className="ml-3 text-3xl" style={cursive}>M G Productions</span>
        </a>
        {user ? (
          <div ref={dropdownRef} className="relative">
            <button onClick={toggleDropdown} className="mt-2 rounded-full bg-gray-100">
              <img
                className="h-10 w-10 rounded-full"
                src={user?.user?.imageURL}
                alt={user?.user?.name}
              />
            </button>

            {isDropdownOpen && <DropdownMenu />}
          </div>
        ) : (
          <LoginButton setAuth={setAuth} />
        )}
      </div>
    </header>
  );
};
Navbar.propTypes = {
  setAuth: PropTypes.func.isRequired,
};


export default Navbar;
