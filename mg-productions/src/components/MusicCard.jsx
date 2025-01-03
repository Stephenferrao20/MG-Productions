import React from 'react';
import Card from './Card';

export default function MusicCard({ songs }) {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {Array.isArray(songs) && songs.length > 0 ? (
            songs.map((song) => (
              <Card key={song.id} data={song} />
            ))
          ) : (
            <p>No songs to display.</p> // Or a loading indicator, or an empty state component
          )}
        </div>
      </div>
    </section>
  );
}