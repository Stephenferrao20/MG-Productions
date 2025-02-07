import { useState, useEffect } from 'react';
import ChatSend from './ChatSend';
import ChatRecieve from './ChatRecieve';
// import ChatSendBtn from './ChatSendBtn';
import { sendMessage } from '../api'; 
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import { useStateValue } from '../context/StateProvider';
import PropTypes from 'prop-types';
// import { actionType } from '../context/reducer';
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:4000";
var socket , selectedChatCompare;

function ChatSection({ selectedChat , user}) {
    const [{ allMessages }, dispatch] = useStateValue();
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected , setSocketConnected] = useState(false);
    const [token , setToken ] = useState();

    useEffect(() => {
      socket = io(ENDPOINT);
      socket.emit("setup", user);
      socket.on('connection', () => setSocketConnected(true));
  }, []);

    // Fetch Firebase ID token when the component mounts
    useEffect(() => {
      const fetchToken = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (currentUser) {
          try {
            const idToken = await currentUser.getIdToken(true);
            setToken(idToken);
          } catch (error) {
            console.error("Error fetching token:", error.message);
          }
        }
      };
    
      fetchToken();
    }, [selectedChat]);
    
    
    
    useEffect(() => {
      if (token && selectedChat) {
          fetchMessages();
          selectedChatCompare = selectedChat;
      }
  }, [token, selectedChat]); 

  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
        // Give notification
      } else {
        dispatch({
          type: "SET_MESSAGES",
          allMessages: [...allMessages, newMessageRecieved],
        });
      }
    });
  
    return () => socket.off('message recieved');
  }, [selectedChatCompare, allMessages, dispatch]);
  
  

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
        console.log("Fetching messages for chat:", selectedChat._id);
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get(`/api/messages/${selectedChat._id}`, config);
        console.log("API Response:", data);

        dispatch({
            type: "SET_MESSAGES",
            allMessages: data,
        });

        socket.emit('join chat',selectedChat._id);
    } catch (error) {
        console.error("Error fetching messages:", error.message);
    }
};

      const sendMessageHandler = async (e) => {
        if (e.key === "Enter" && selectedChat) {
            try {
                const { data } = await sendMessage(newMessage, selectedChat._id, token);
                setNewMessage(""); 
                dispatch({
                    type: "SET_MESSAGES",
                    allMessages: [...allMessages, data], 
                });

                socket.emit('newMessage',data);
            } catch (error) {
                console.error("Error sending message:", error.message);
            }
        }
    };

  
    

    return (
        <div className="w-full px-5 flex flex-col justify-between">
          <div className="flex flex-col mt-5 overflow-y-auto max-h-[600px] scrollbar">
            {console.log(`User ID: ${user?.name} ,${allMessages}`)} {/* Move this outside JSX if unnecessary */}
            {allMessages?.map((message, index) => (
            <div key={index}>
            {message?.sender?._id === user?._id ? (
            <ChatSend message={message || "Message unavailable"} />
             ) : (
            <ChatRecieve message={message || "Message unavailable"} />
             )}
            </div>
            ))}

          </div>
          

          <div className="py-5 pt-2 flex flex-row gap-1">
            <input
              className="w-full bg-gray-300 py-5 px-3 rounded-xl"
              type="text"
              placeholder="Type your message here..."
              onKeyDown={sendMessageHandler}
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
          </div>
        </div>
      );
    }
    ChatSection.propTypes = {
        selectedChat: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
    };

    export default ChatSection;