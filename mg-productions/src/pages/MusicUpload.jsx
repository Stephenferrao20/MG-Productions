import React, { useEffect, useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import { getAllArtists, getAllAlbums , saveMusicData , getAllSongs } from '../api';
import { actionType } from '../context/actionType';
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getDownloadURL  } from 'firebase/storage';

function MusicUpload() {
  const [{ allAlbums, allArtists }, dispatch] = useStateValue();
  const [musicFile, setMusicFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchAlbums();
    fetchArtists();
  }, []);

  const fetchAlbums = async () => {
    const data = await getAllAlbums();
    dispatch({
      type: actionType.SET_ALL_ALBUMS,
      allAlbums: data || [],
    });
  };

  const fetchArtists = async () => {
    const data = await getAllArtists();
    dispatch({
      type: actionType.SET_ALL_ARTISTS,
      allArtists: data || [],
    });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const storage = getStorage();
    const fileRef = ref(storage, `${type === 'music' ? 'Audio' : 'Images'}/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadProgress(progress);
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error(`Error uploading ${type} file:`, error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (type === 'music') {
            setMusicFile(downloadURL);
          } else if (type === 'cover') {
            setCoverImage(downloadURL);
          }
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!musicFile || !coverImage) {
      alert('Please upload both a music file and a cover image.');
      return;
    }

    const musicData = {
      title: e.target.elements.title.value,
      imageURL : coverImage,
      songURL : musicFile,
      album: e.target.elements.album.value,
      artist: e.target.elements.artist.value,
    };

    saveMusicData(musicData).then((data) => {
      if (data?.success) {
        alert('Music uploaded successfully');
        getAllSongs().then((songs) => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: songs,
          });
        });
      } else {
        alert('Error uploading music');
      }
    });
   // Add logic to submit this data to your backend or database
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Upload Music</h2>
        </div>
        {uploadProgress > 0 && (
          <div className="text-center mb-4">
            <p>Upload Progress: {uploadProgress}%</p>
          </div>
        )}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="grid space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Music Title</label>
            <input
              className="text-base p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              name="title"
              type="text"
              placeholder="Title"
              required
            />
          </div>
          <div className="grid space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Album</label>
            <select
              className="text-base p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              name="album"
              required
            >
              <option value="">Choose the Album</option>
              {allAlbums?.album?.map((alb) => (
                <option key={alb.id} value={alb.id}>
                  {alb.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Artist</label>
            <select
              className="text-base p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              name="artist"
              required
            >
              <option value="">Choose the Artist</option>
              {allArtists?.artist?.map((artist) => (
                <option key={artist.id} value={artist.id}>
                  {artist.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Upload Music</label>
            <input type="file" accept=".mp3" onChange={(e) => handleFileChange(e, 'music')} required />
          </div>
          <p className="text-sm text-gray-400 text-center">File type: mp3</p>
          <div className="grid space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Cover Image</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'cover')} required />
          </div>
          <p className="text-sm text-gray-400 text-center">File type: image files</p>
          <button
            type="submit"
            className="w-full flex justify-center bg-blue-500 text-white py-3 rounded-full font-semibold tracking-wide focus:outline-none focus:shadow-outline hover:bg-blue-600 transition ease-in-out duration-300"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default MusicUpload;
