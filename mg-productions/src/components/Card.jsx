import React from 'react';
import { FaCirclePlay } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { deleteSong , getAllSongs } from '../api';
import { useStateValue } from '../context/StateProvider';

function Card({ data }) {
  const location = useLocation(); // Get the current path
  const [{ allSongs }, dispatch] = useStateValue();

  const handleDelete = async (id) => {
    try {
      const res = await deleteSong(id); // Call the API function
      if (res && res.status === 200) {
        console.log('Song deleted successfully');
        refreshSongs(); 
      } else {
        console.error('Error deleting song: ', res?.data || 'Unknown error');
        alert('Error deleting song.');
      }
    } catch (error) {
      console.error('Error deleting song:', error);
      alert('An unexpected error occurred while deleting the song.');
    }
  };
  

  const refreshSongs = async () => {
    const data = await getAllSongs();
    dispatch({
      type: actionType.SET_ALL_SONGS,
      allSongs: data || [],
    });
  }

  return (
    <div className="p-4 lg:w-1/3">
      <div className="h-full bg-gray-100 bg-opacity-75 px-5 pt-5 pb-24 rounded-lg overflow-hidden text-center relative flex flex-col group">
        {console.log(data)}
        <img
          src={data.imageURL}
          alt="Song Cover"
          className="m-1 max-w-full justify-center items-center rounded-lg"
        />
        <div className="m-0 p-0 absolute bottom-2/4 right-10 border h-9 opacity-0 group-hover:opacity-100 transition-opacity">
          <FaCirclePlay className="m-0 p-0 h-10 text-5xl" />
        </div>
        <p className="leading-relaxed m-2 text-3xl">{data.title}</p>
        <p className="inline-flex items-center ml-6 text-xl">{data.artist}</p>
        <div className="text-center mt-1 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
          <span className="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-0 border-r-2 border-gray-200">
            <svg
              className="w-4 h-4 mr-1"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            1.2K
          </span>
          <span className="text-gray-400 inline-flex items-center leading-none text-sm">
            <svg
              className="w-4 h-4 mr-1"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
            </svg>
            6
          </span>
          {location.pathname === '/dashboard/songs' && (
          <MdDeleteForever className="m-0 p-1 h-10 text-5xl text-red-500 hover:text-red-700 cursor-pointer" onClick={() => handleDelete(data._id)}/>
        )}
        </div>
      </div>
    </div>
  );
}

export default Card;
