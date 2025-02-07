import axios from 'axios';

const baseURL = "http://localhost:4000/";

export const validateUser = async(token) => {
    try {
        const res = await axios.get(`${baseURL}api/users/login`,{
            headers:{
                Authorization: "Bearer " + token,
            }
        })
        return res.data;
    } catch (error) {
        console.log(`erro catch ${error}`);
    }
}

export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${baseURL}api/users/getAllUsers`);  // Update endpoint
        return res.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

  
export const deleteUser = async (id) => {
    try {
      await axios.delete(`${baseURL}api/users/deleteUser/${id}`); // Correct endpoint
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  };
  
export const getAllSongs = async () => {
    try {
        const res = await axios.get(`${baseURL}api/songs/getAll`);  // Update endpoint
        return res.data;
    } catch (error) {
        console.error('Error fetching songs:', error);
        return null;
    }
}

export const getAllArtists = async () => {
    try {
        const res = await axios.get(`${baseURL}api/artists/getAll`);
        return res.data;
    } catch (error) {
        console.error('Error fetching artists:', error);
        return null;
    }
}

export const deleteArtist = async (id) => {
    try {
      await axios.delete(`${baseURL}api/artists/delete/${id}`); // Correct endpoint
      return true;
    } catch (error) {
      console.error('Error deleting artist:', error);
      return false;
    }
  }

  export const getAllAlbums = async () => {
    try {
        const res = await axios.get(`${baseURL}api/albums/getAll`);  // Update endpoint
        return res.data;
    } catch (error) {
        console.error('Error fetching albums:', error);
        return null;
    }
}

export const saveMusicData = async (data) => {
    try {
        const res = await axios.post(`${baseURL}api/songs/save`, {...data});  
        return res.data;
    } catch (error) {
        console.error('Error saving music data:', error);
        return null;
    }
} 


export const deleteSong = async (id) => {
    try {
      const res = await axios.delete(`${baseURL}api/songs/delete/${id}`);
      return res;  
    } catch (error) {
      console.error('Error deleting song:', error);
      return false;
    }
  };
  
  export const fetchChats = async () => {
    try {
      const { data } = await axios.get(`${baseURL}api/chats`);
      return data;
    } catch (error) {
      console.error("Error fetching chats:", error.message);
      return null;
    }
  };
  
  
  export const accessChat = async (user_id) => {
    try {
      const { data } = await axios.post(`${baseURL}api/chats`, { user_id });
      return data;
    } catch (error) {
      console.error("Error accessing chat:", error.message);
      return null;
    }
  };

  export const sendMessage = async (content, chatId, token) => {
    try {
        const response = await axios.post('http://localhost:4000/api/messages/', // Your API endpoint
            { content, chatId }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                }
            }
        );
        console.log("Message sent successfully:", response.data);
        return response.data; 
    } catch (error) {
        console.error("Error sending message:", error.message);
        throw error; 
    }
};

export const saveRequestData = async(data) =>{
  try {
    const res = await axios.post(`${baseURL}api/request/`,{...data});
    return res.data;
  } catch (error) {
    console.error('Error saving music data:', error);
       return null;
  }
};

export const fetchRequest = async (id) => {
  try {
    const res = await axios.get(`${baseURL}api/request/${id}`);
    console.log('fetched request ' + res);
    return res;  
  } catch (error) {
    console.error('Error fetching request :', error);
    return false;
  }
};