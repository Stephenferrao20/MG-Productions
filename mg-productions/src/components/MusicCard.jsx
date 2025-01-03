import React from 'react';
import Card from './Card';

export default function MusicCard({songs}) {
  return (
    <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap -m-4">
    {songs.map(song =>
      <Card data={song}/>
    )}
    </div>
  </div>
</section>
  )
}
