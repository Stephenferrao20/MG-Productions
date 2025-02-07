import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ChatMember from '../components/ChatMember';
import { useStateValue } from '../context/StateProvider';
import { fetchChats, accessChat , getAllUsers } from '../api'; 
import ChatSection from '../components/ChatSection';


function Chat({user}) {
  const [{ allUsers, selectedChat, allChats }, dispatch] = useStateValue();
  const [search, setSearch] = useState("");

   // Log selectedChat whenever it changes
   useEffect(() => {
    console.log("Selected chat updated:", selectedChat);
  }, [selectedChat]);  

  useEffect(() => {
    fetchUsers();
    loadChats();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      dispatch({
        type: 'SET_ALL_USERS',
        allUsers: data,
      });
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const loadChats = async () => {
    try {
      const data = await fetchChats();  // Using the fetchChats API function
      dispatch({
        type: 'SET_ALL_CHATS',
        allChats: data,
      });
      
      if (!selectedChat && data.length > 0) {
        dispatch({
          type: 'SET_SELECTED_CHAT',
          selectedChat: data[0],
        });
      }
    } catch (error) {
      console.error("Error loading chats:", error.message);
    }
  };

  const handleAccessChat = async (user_id) => {
    try {
      const data = await accessChat(user_id);
      console.log("Chat data:", data); // Log data to check what is returned
      if (data) {
        if (!allChats?.find((c) => c._id === data._id)) {
          dispatch({
            type: 'SET_ALL_CHATS',
            allChats: [data, ...(allChats || [])],
          });
        }
        dispatch({
          type: 'SET_SELECTED_CHAT',
          selectedChat: data,
        });
      }
    } catch (error) {
      console.error("Error accessing chat:", error.message);
    }
  };
  

  return (
    <div className="container mx-auto border shadow-lg rounded-lg p-1 h-[500px] overflow-auto">
      <div className="flex flex-row justify-between bg-white">
        {/* Sidebar */}
        <div className="flex flex-col w-2/5 border-r-2 rounded-md overflow-y-auto max-h-[700px] scrollbar">
          <div className="border-b-2 py-4 px-2 sticky top-0 bg-white">
            <input
              type="text"
              placeholder="search chatting"
              className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

{console.log(allChats)}

      {user?.role === 'member'
        ? allUsers?.users && allUsers.users.length > 0
        ? allUsers.users.map((allUser) =>
                  allUser.role === "admin" && (
                      <ChatMember
                          key={allUser._id}
                          user={allUser}
                          refreshUsers={fetchUsers}
                          handleFunction={() => handleAccessChat(allUser._id)}
                          loadChats={loadChats}
                          selectedChat={selectedChat}
                      />
                  )
              )
        : <p>No users found.</p>
    : allUsers?.users && allUsers.users.length > 0
        ? allUsers.users
              .filter((allUser) => {
                  if (search === "") return true;
                  return allUser.name?.toLowerCase().includes(search.toLowerCase());
              })
              .map((allUser) =>
                  allUser.role !== "admin" && (
                      <ChatMember
                          key={allUser._id}
                          user={allUser}
                          refreshUsers={fetchUsers}
                          handleFunction={() => handleAccessChat(allUser._id)}
                          loadChats={loadChats}
                      />
                  )
              )
        : <p>No users found.</p>}
        </div>

        <ChatSection selectedChat={selectedChat} user={user}/>
      </div>
    </div>
  );
}
Chat.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default Chat;