import React from 'react';

function ChatMember() {
  return (
    <div
          class="flex flex-row py-4 px-2 justify-center items-center border-b-2 rounded-lg"
        >
          <div class="w-1/4">
            <img
              src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
              class="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div>
          <div class="w-full">
            <div class="text-lg font-semibold">Luis1994</div>
            <span class="text-gray-500">Pick me at 9:00 Am</span>
          </div>
        </div>
  )
}

export default ChatMember
