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
        const res = await axios.get(`${baseURL}api/artists/getAll`);  // Update endpoint
        return res.data;
    } catch (error) {
        console.error('Error fetching artists:', error);
        return null;
    }
}