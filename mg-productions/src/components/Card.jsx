

import { MdDeleteForever } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { deleteSong } from '../api';
import { useStateValue } from '../context/StateProvider';
import PropTypes from 'prop-types';

function Card({ data , refreshSongs , index , type }) {
  const location = useLocation(); // Get the current path
  const [{songIndex , isSongPlaying}, dispath] = useStateValue(); 
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
  
  const addToContext = () => {
    if(!isSongPlaying){
      dispath({
        type: 'SET_ISSONG_PLAYING',
        isSongPlaying: true 
      })
    }

    if(songIndex !== index){
      dispath({
        type: 'SET_SONG_INDEX',
        songIndex: index
      })
    }
  }

  return (
    <div className="p-4 lg:w-1/3" onClick={type === 'song' && addToContext}>
      <div className="h-full bg-gray-100 bg-opacity-75 px-5 pt-5 pb-24 rounded-lg overflow-hidden text-center relative flex flex-col group">
        <img
          src={data.imageURL}
          alt="Song Cover"
          className="m-1 max-w-full justify-center items-center rounded-lg"
        />
        
        <p className="leading-relaxed m-2 text-2xl">{data.title}</p>
        <p className="inline-flex items-center ml-6 text-xl text-blue-500">{data.artist}</p>
        <div className="text-center mt-1 leading-none flex justify-center absolute bottom-0 left-0 w-full ">
          
         
          {location.pathname === '/dashboard/songs' && (
          <MdDeleteForever className="m-0 p-1 h-10 text-5xl text-red-500 hover:text-red-700 cursor-pointer" onClick={() => handleDelete(data._id)}/>
        )}
        </div>
      </div>
    </div>
  );
}
Card.propTypes = {
  data: PropTypes.object.isRequired,
  refreshSongs: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default Card;

