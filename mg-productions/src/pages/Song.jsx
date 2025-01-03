import React, { useState, useEffect } from 'react';
import axios, { getAdapter } from 'axios';
import MusicUpload from './MusicUpload';
import { useStateValue } from '../context/StateProvider';
import { getAllSongs } from '../api';
import MusicCard from '../components/MusicCard';

function Song() {
  const [selectedTab, setSelectedTab] = useState('View Songs');
  const [songData, setSongData] = useState({ title: '', audioURL: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [songFilter, setSongFilter] = useState("");
  const [{ allSongs }, dispatch] = useStateValue();

  const tabRoutes = {
    'View Songs': 'view',
    'Upload Song': 'upload',
  };

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


 


  const renderTabContent = () => {
    switch (selectedTab) {
      case 'View Songs':
        return (
          <div>
            <center>
        <div className="relative">
          <label htmlFor="Search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            id="Search"
            placeholder="Search for..."
            className="w-2/4 p-5 rounded-md border-gray-200 py-2.5 pe-10 shadow-md sm:text-sm"
            onChange={(e) => setSongFilter(e.target.value)}
            value={songFilter}
          />
        </div>
      </center>
      
            <h2 className="text-xl font-bold mb-4">All Songs</h2>
            {isLoading ? (
              <p>Loading...</p>
            ) : allSongs?.song.length > 0 ? (
              <MusicCard songs={allSongs?.song}/>
            ) : (
              <p>No songs found</p>
            )}
          </div>
        );
      case 'Upload Song':
        return (
         <MusicUpload />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="sm:hidden mb-4">
        <label htmlFor="Tab" className="sr-only">Select Tab</label>
        <select
          id="Tab"
          className="w-full rounded-md border-gray-300"
          value={selectedTab}
          onChange={(e) => setSelectedTab(e.target.value)}
        >
          {Object.keys(tabRoutes).map((tab) => (
            <option key={tab} value={tab}>
              {tab}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden sm:block mb-4">
        <nav className="flex gap-6 justify-center" aria-label="Tabs">
          {Object.keys(tabRoutes).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`shrink-0 rounded-lg p-2 text-sm font-medium ${
                selectedTab === tab
                  ? 'bg-sky-100 text-sky-600'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div>{renderTabContent()}</div>
    </div>
  );
}

export default Song;
