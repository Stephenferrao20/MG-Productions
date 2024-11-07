import React from 'react'
import ChatMember from '../components/ChatMember';
import ChatSend from '../components/ChatSend';
import ChatRecieve from '../components/ChatRecieve';
import ChatSendBtn from '../components/ChatSendBtn';

function Chat() {
  return (
    <div className="container mx-auto border shadow-lg rounded-lg p-1">
      <div className="flex flex-row justify-between bg-white">
        
        <div className="flex flex-col w-2/5 border-r-2 rounded-md overflow-y-auto max-h-[700px] scrollbar">
          
          
          <div className="border-b-2 py-4 px-2 sticky top-0 bg-white">
            <input
              type="text"
              placeholder="search chatting"
              className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
            />
          </div>
          
          <ChatMember />
          <ChatMember />
          <ChatMember />
          <ChatMember />
          <ChatMember />
          <ChatMember />
          <ChatMember />
          <ChatMember />
          <ChatMember />
        </div>
        
        <div className="w-full px-5 flex flex-col justify-between">
          <div className="flex flex-col mt-5 overflow-y-auto max-h-[600px] scrollbar">
            {/* Message Content Section */}
            <ChatSend/>
            <ChatRecieve/>
            <ChatRecieve/>
            <ChatRecieve/>
            <ChatRecieve/>
            <ChatRecieve/>
            {/* More messages here */}
          </div>
          <div className="py-5 pt-2 flex flex-row gap-1">
            <input
              className="w-full bg-gray-300 py-5 px-3 rounded-xl"
              type="text"
              placeholder="type your message here..."
            />
            <ChatSendBtn/>
          </div>
          
        </div>

        
      </div>
    </div>
  )
}

export default Chat;
