import React from 'react';
import Card from './Card';
import { useStateValue } from '../context/StateProvider';

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
            <p>No songs to display.</p> // Or a loading indicator, or an empty state component
          )}
        </div>
      </div>
    </section>
  );
}