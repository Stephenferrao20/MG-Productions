import PropTypes from 'prop-types';
import Card from './Card';


export default function MusicCard({ songs , refreshSongs , songFilter }) {
  
  
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {Array.isArray(songs) && songs.length > 0 ? (
            songs.filter((song)=>{
              return songFilter.toLowerCase() === '' ? song : song.title.toLowerCase().includes(songFilter.toLowerCase())
            }).map((song,index) => (
              <Card key={song.id} data={song} refreshSongs={refreshSongs} index={index} type="song"/>
            ))
          ) : (
            <p>No songs to display.</p> 
          )}
        </div>
      </div>
    </section>
  );
}

MusicCard.propTypes = {
  songs: PropTypes.array.isRequired,
  refreshSongs: PropTypes.func.isRequired,
  songFilter: PropTypes.string.isRequired,
}; 