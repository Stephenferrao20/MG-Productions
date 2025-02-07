import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { MdDarkMode } from "react-icons/md";
import { FaSearch, FaHeart, FaHome } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { FaMessage } from "react-icons/fa6";

const Sidebar = () => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className='sticky top-0 w-20 bg-white h-screen flex'>
      <aside className="h-full w-full flex flex-col items-center border-r border-gray-200">
        <div className="flex h-16 w-full items-center justify-center mt-3 p-2">
          <img src="data:image/png;base64,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" alt="Logo" />
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
          {user !== null ? 
          (
            user?.user?.role === 'admin' ? (
            <Link className="group relative p-2 hover:bg-gray-50 rounded-xl text-gray-900 mt-2" to={'/Dashboard'}>
              <RxDashboard className='h-5 w-5'/>
            </Link>
          ):(
            <Link className="group relative p-2 hover:bg-gray-50 rounded-xl text-gray-900 mt-2" to={'/request'}>
              <FaMessage className='h-5 w-5'/>
            </Link>
          )
          ) 
          :
          <></>
          }
          
          <Link className="p-2 hover:bg-gray-50 rounded-xl align-middle justify-center h-6 text-gray-900" to={'/Music'}>
            <MdDarkMode className='text-xl h-6 w-6' />
          </Link>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
