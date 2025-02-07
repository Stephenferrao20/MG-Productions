import { useStateValue } from "../context/StateProvider";
import { getAllSongs } from "../api";
import { useEffect, useState } from "react";

const Search = () => {
  const [{ allSongs }, dispatch] = useStateValue();
  const [songFilter, setSongFilter] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);

  const fetchSongs = async () => {
    const data = await getAllSongs();
    dispatch({
      type: 'SET_ALL_SONGS',
      allSongs: data.song,
    });
  };

  useEffect(() => {
    if (!allSongs || allSongs.length === 0) {
      fetchSongs();
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(allSongs)) {
      setFilteredSongs(
        allSongs.filter((song) =>
          song.title.toLowerCase().includes(songFilter.toLowerCase())
        )
      );
    }
  }, [songFilter, allSongs]);

  return (
    <div className='text-gray-900 p-20'>
      <div className="relative">
        <label htmlFor="Search" className="sr-only">Search</label>
        <input
          type="text"
          id="Search"
          placeholder="Search for..."
          className="w-full p-5 rounded-md border-gray-200 py-2.5 pe-10 shadow-md sm:text-sm"
          onChange={(e) => setSongFilter(e.target.value)}
        />
      </div>
      {console.log(filteredSongs)}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {filteredSongs.length > 0 ?
            filteredSongs.map((song) => (
              <div key={song.id} className="p-4 lg:w-1/3">
                <div className="h-full bg-gray-100 bg-opacity-75 px-5 pt-5 pb-24 rounded-lg overflow-hidden text-center relative flex flex-col group">
                  <img
                    src={song.imageURL}
                    alt="Song Cover"
                    className="m-1 max-w-full justify-center items-center rounded-lg"
                  />
                  <p className="leading-relaxed m-2 text-2xl">{song.title}</p>
                  <p className="inline-flex items-center ml-6 text-xl text-blue-500">{song.artist}</p>
                </div>
              </div>
            ))
          :
          <p>Search For Song</p>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Search;
