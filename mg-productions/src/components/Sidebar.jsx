import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { MdDarkMode } from "react-icons/md";
import { FaSearch, FaHeart, FaHome } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

const Sidebar = () => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className='sticky top-0 w-20 bg-white h-screen flex'>
      <aside className="h-full w-full flex flex-col items-center border-r border-gray-200">
        <div className="flex h-16 w-full items-center justify-center mt-3 p-2">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThsapwuIZ2JPUVRaWSoX_xoEIOHWxneY7EupS8gsFriA&s" alt="Logo" />
        </div>
        <nav className="flex flex-1 flex-col gap-y-4 pt-10">
          <Link className="group relative p-2 hover:bg-gray-50 rounded-xl text-gray-900 mt-6" to={'/'}>
            <FaHome className='h-5 w-5'/>
          </Link>
          
          <Link className="group relative p-2 hover:bg-gray-50 rounded-xl text-gray-900 mt-2" to={'/Search'}>
            <FaSearch className='h-5 w-5'/>
          </Link>
          
          <Link className="group relative p-2 hover:bg-gray-50 rounded-xl text-gray-900 mt-2" to={'/Favorite'}>
            <FaHeart className='h-5 w-5'/>
          </Link>

          {user?.user?.role === 'admin' && (
            <Link className="group relative p-2 hover:bg-gray-50 rounded-xl text-gray-900 mt-2" to={'/Dashboard'}>
              <RxDashboard className='h-5 w-5'/>
            </Link>
          )}
          
          <Link className="p-2 hover:bg-gray-50 rounded-xl align-middle justify-center h-6 text-gray-900" to={'/Music'}>
            <MdDarkMode className='text-xl h-6 w-6' />
          </Link>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
