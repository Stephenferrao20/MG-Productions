import { actionType } from './actionType';

const reducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionType.SET_ALL_USERS:
            console.log('Dispatching SET_ALL_USERS:', action.allUsers);
            return {
                ...state,
                allUsers: action.allUsers || [], // Ensure it's set to an empty array if null
            };
        case actionType.SET_ALL_ARTISTS:
            return {
                ...state,
                allArtists: action.allArtists,
            };
        case actionType.SET_ALL_SONGS:
            return {
                ...state,
                allSongs: action.allSongs,
            };
        case actionType.SET_ALL_ALBUMS:
            return {
                ...state,
                allAlbums: action.allAlbums,
            };
        case actionType.SET_ISSONG_PLAYING:
            return {
                ...state,
                isSongPlaying: action.isSongPlaying,
            };
        case actionType.SET_SONG_INDEX:
            return {
                ...state,
                songIndex: action.songIndex,
            };
        case actionType.SET_SELECTED_CHAT:
            return {
                ...state,
                selectedChat: action.selectedChat,
            };
        case actionType.SET_ALL_CHATS:
            return {
                ...state,
                allChats: action.allChats,
            };
        case actionType.SET_MESSAGES:
            return {
                ...state,
                allMessages: action.allMessages || [],
            };
        case actionType.SET_REQUEST:
            return{
                ...state,
                allRequest : action.allRequest || [],
            };
        default:
            return state;
    }
};

export default reducer;
