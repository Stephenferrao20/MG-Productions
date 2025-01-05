import { all } from "axios";

export const initialState  = {
    user: {
        name: null,
        email: null,
        profilePicture: null,
        role: 'user', // or 'admin'
    },
    allUsers: null,
    allArtists: null,
    allSongs: null,
    allAlbums: null,
    isSongPlaying: false,
    songIndex : 0,
};
