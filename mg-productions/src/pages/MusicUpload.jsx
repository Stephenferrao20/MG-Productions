import React from 'react';
import { getStorage ,ref , getDownloadURL , uploadBytesResumable , deleteObject } from 'firebase/storage';
import { useStateValue } from '../context/StateProvider';
import { getAllArtists,
      getAllSongs,
 } from '../api';
 import {actionType} from '../context/actionType';
 import { storage } from '../config/firebase.config';


function MusicUpload() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Upload Music</h2>
        </div>
        <form className="mt-8 space-y-5" action="#" method="POST">
          <div className="grid space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Music Title</label>
            <input
              className="text-base p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Title"
            />
          </div>
          <div className="grid space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Description</label>
            <textarea
              className="text-base p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Description"
            />
          </div>
          <div className="grid space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Artist</label>
            <select
              className="text-base p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Artist"
            >
              <option>Choose the Artist</option>
            </select>
          </div>
          <div className="grid space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Upload Music</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center rounded-lg border-4 border-dashed w-full h-60 p-6 group text-center bg-gray-50">
                <img
                  className="h-16 mb-4"
                  src="https://assets.dryicons.com/uploads/icon/svg/11234/af2ae7e4-66c4-4827-8161-c533579bf270.svg"
                  alt="Upload illustration"
                />
                <p className="text-gray-500">
                  Drag and drop files here <br /> or{' '}
                  <span className="text-blue-600 hover:underline cursor-pointer">select a file</span>
                </p>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
          <p className="text-sm text-gray-400 text-center">File type: mp3</p>
          <div className="grid space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Cover Image</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center rounded-lg border-4 border-dashed w-full h-60 p-6 group text-center bg-gray-50">
                <img
                  className="h-16 mb-4"
                  src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                  alt="Upload illustration"
                />
                <p className="text-gray-500">
                  Drag and drop files here <br /> or{' '}
                  <span className="text-blue-600 hover:underline cursor-pointer">select a file</span>
                </p>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
          <p className="text-sm text-gray-400 text-center">File type: image files</p>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center bg-blue-500 text-white py-3 rounded-full font-semibold tracking-wide focus:outline-none focus:shadow-outline hover:bg-blue-600 transition ease-in-out duration-300"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MusicUpload;
