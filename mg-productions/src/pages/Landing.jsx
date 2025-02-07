import MusicCard from '../components/MusicCard';
import { getAllSongs } from '../api';
import { useStateValue } from '../context/StateProvider';
import { useEffect } from 'react';

export default function Landing() {
    const [{ allSongs }, dispatch] = useStateValue();
   const fetchSongs = async () => {
          const data = await getAllSongs();
          dispatch({
              type: 'SET_ALL_SONGS',
              allSongs: data,
          });
      }
  
      useEffect(() => {
      if (!allSongs) {
          fetchSongs();
      }
      }, []);
  return (
    <div >
        {console.log(allSongs)}
        <MusicCard songs={allSongs?.song} refreshSongs={fetchSongs} songFilter={''}/>
    </div>
  )
}
