import React from 'react';
import { FaCirclePlay } from "react-icons/fa6";

function Card() {
  return (
    <div class="p-4 lg:w-1/3">
        <div class="h-full bg-gray-100 bg-opacity-75 px-5 pt-5 pb-24 rounded-lg overflow-hidden text-center relative flex flex-col group">
          <img src='https://placehold.co/600x400' className='m-1 max-w-full justify-center items-center rounded-lg'/>
          <div className='m-0 p-0 absolute bottom-2/4 right-10 border h-9 opacity-0 group-hover:opacity-100 transition-opacity'><FaCirclePlay className='m-0 p-0 h-10 text-5xl'/></div>
          <p class="leading-relaxed m-2 text-3xl">Music Title</p>
          <p class="inline-flex items-center ml-6 text-xl">Artist      
          </p>
          <div class="text-center mt-1 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
            <span class="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-0 border-r-2 border-gray-200">
              <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>1.2K
            </span>
            <span class="text-gray-400 inline-flex items-center leading-none text-sm">
              <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>6
            </span>
          </div>
        </div>
      </div>
  )
}

export default Card
