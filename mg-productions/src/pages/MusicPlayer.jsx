import { useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';
import { RiPlayListFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useState } from 'react';
import { getAllSongs } from '../api';
import { IoMusicalNote } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';


function MusicPlayer() {

  const nextTrack = () => {
    if(songIndex > allSongs?.song.length - 1){
      dispath({
        type: 'SET_SONG_INDEX',
        songIndex: 0,
      })
  }
  else{
    dispath({
      type: 'SET_SONG_INDEX',
      songIndex: songIndex + 1,
    })
  }
}

  const prevTrack = () => {
    if(songIndex === 0){
      dispath({
        type: 'SET_SONG_INDEX',
        songIndex: allSongs?.song.length - 1,
      })
  }
  else{
    dispath({
      type: 'SET_SONG_INDEX',
      songIndex: songIndex - 1,
    })
  }
  }

  const closePlayer = () => {
    dispath({
      type: 'SET_ISSONG_PLAYING',
      isSongPlaying: false
    })
  }
  const [{songIndex , isSongPlaying , allSongs }, dispath] = useStateValue();
  const [isPlayList , setIsPlayList] = useState(false);

  return (
    <div className='w-full flex items-center gap-3'>
      <div className={`w-full items-center gap-3 p-4 flex relative`}>
        <img src={allSongs?.song[songIndex]?.imageURL} alt=''
        className='w-40 h-20 object-cover rounded-md'/>
        <div className='flex items-start flex-col'>
          <p className='text-xl text-gray-900 font-semibold'>
            {`${
            allSongs?.song[songIndex]?.title.length > 20 
            ? allSongs?.song[songIndex]?.title.slice(0,20) + '...'
            : allSongs?.song[songIndex]?.title}`}{" "}
            <span className='text-base'>({allSongs?.song[songIndex]?.album})</span>
          </p>
          <p className='text-gray-800'>
            {allSongs?.song[songIndex]?.artist}{" "}
            <span className='text-sm text-gray-800 font-semibold'></span>
              
          </p>
          <motion.i
          whileTap={{scale : 0.8 }}
          onClick={() => setIsPlayList(!isPlayList)}>
            <RiPlayListFill className='text-2xl text-gray-800 cursor-pointer'/>
          </motion.i>
        </div>
        <div className='flex-1'>
          <AudioPlayer
           src={allSongs?.song[songIndex]?.songURL}
           onPlay={() => console.log('playing')}
           autoPlay={true}
           showSkipControls={true}
           showJumpControls={false}
           onClickNext={nextTrack}
           onClickPrevious={prevTrack}
           />
        </div> 
        {
          isPlayList && (<PlayListCard/>)
        }
        <IoClose onClick={closePlayer}/>
      </div>
    </div>
  );
}

export const PlayListCard = () =>{
  const [{songIndex , isSongPlaying , allSongs }, dispath] = useStateValue();

  useEffect(() => {
    if(!allSongs){
      getAllSongs().then((data) => {
        dispath({
          type: 'SET_ALL_SONGS',
          allSongs: data
        })
      })
    }
  },[])

  const setCurrentPlaySong = (index) => {
    if(!isSongPlaying){
      dispath({
        type: 'SET_ISSONG_PLAYING',
        isSongPlaying: true
      })
    }
    if(songIndex !== index){
      dispath({
        type: 'SET_SONG_INDEX',
        songIndex: index
      })
    }
  }
  return (
    <div className='absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-slate-200'>
      {
        allSongs?.song.length > 0 ? (
          allSongs?.song.map((song,index) => (
            <motion.div 
            initial={{ opacity : 0 , translateX : -50}}
            animate={{ opacity : 1 , translateX : 0}}
            transition={{ duration : 0.3 , delay : index * 0.1}}
            className='group w-full p-4 cursor-pointer hover:bg-slate-100 flex gap-3 items-center bg-transparent'
            onClick={() => setCurrentPlaySong(index)}
            key={index}
            >
              <IoMusicalNote className='text-gray-700 hover:text-gray-800 text-2xl cursor-pointer'/>
              <div className='flex items-start flex-col'>
                <p className='text-lg text-gray-950 font-semibold'>
                  {`${
                    song.title.length > 20 
                    ? song.title.slice(0,20) + '...'
                    : song.title}`}{" "}
                  <span className='text-base'>({song.album})</span>
                </p>
                <p className='text-gray-800'>
                  {song.artist}{" "}
                  <span className='text-sm text-gray-800 font-semibold'></span>
                </p>
              </div>
            </motion.div>
          ))
      )
      : <></>
    } 
    </div>
  )
}
export default MusicPlayer;
