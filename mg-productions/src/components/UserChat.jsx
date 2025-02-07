import React from 'react';
import { MdSend, MdVideoCall, MdCall } from 'react-icons/md';
import { FaRegSmile } from 'react-icons/fa';

function UserChat() {
  const messages = [
    { id: 1, text: 'Hi there!', type: 'received', timestamp: '10:00 AM' },
    { id: 2, text: 'Hello! How can I help you today?', type: 'sent', timestamp: '10:01 AM' },
    { id: 3, text: 'I have an issue with my account.', type: 'received', timestamp: '10:02 AM' },
    { id: 4, text: 'Sure, I can help with that. Can you provide more details?', type: 'sent', timestamp: '10:05 AM' },
    { id: 5, text: 'Yes, my account balance is not showing correctly.', type: 'received', timestamp: '10:07 AM' }
  ];

  return (
    <div className='flex flex-col w-[600px] mx-auto border mt-20 rounded-lg'>
      <header className='flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200'>
        <div className='flex items-center'>
          <img src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww' alt='Avatar' className='w-10 object-cover rounded-full' />
          <span className='ml-2 font-semibold'>John Doe</span>
        </div>
        <div className='flex items-center'>
          <MdCall size={20} className='text-lg mr-2 cursor-pointer' />
          <MdVideoCall size={24} className='text-lg mr-2 cursor-pointer' />
          <FaRegSmile size={20} className='text-lg cursor-pointer' />
        </div>
      </header>
      <div className='flex-1 overflow-y-auto p-4 space-y-2'>
        {messages.map(({ id, text, type, timestamp }) => (
          <div key={id} className={`flex ${type === 'sent' ? 'justify-end' : ''} `}> 
            <div className={`p-2 rounded-lg ${type === 'received' ? 'bg-blue-200' : 'bg-green-200'} mb-4`}> 
              <p>{text}</p> 
              <small className='block text-right text-xs text-gray-500'>{timestamp}</small> 
            </div> 
          </div> 
        ))}
      </div>
      <div className='p-4 flex items-center bg-gray-100'>
        <input type='text' placeholder='Type your message here...' className='flex-1 p-2 border-2 border-gray-300 rounded-lg focus:outline-none' />
        <button className='ml-2 p-2 bg-blue-500 text-white rounded-lg flex items-center justify-center'> 
          <MdSend /> 
        </button>
      </div>
    </div>
  );
}

export default UserChat;