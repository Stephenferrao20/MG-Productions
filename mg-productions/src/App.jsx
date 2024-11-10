import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Removed Router import
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Search from './pages/Search';
import Profile from './pages/User/Profile';
import Dashboard from './pages/Admin/Dashboard';
import Favorite from './pages/Favorite';
import MusicPlayer from './pages/MusicPlayer';
import { getAuth } from 'firebase/auth';
import { app } from './config/firebase.config';

const App = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true");

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if(userCred){
        userCred.getIdToken().then((token) => {
          console.log(token);
          
        })
      }
      else{
        setAuth(false);
        window.localStorage.setItem("auth","false");
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto"> {/* Enable vertical scrolling */}
        <Navbar setAuth={setAuth}/>
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Favorite" element={<Favorite />} />
            <Route path="/Music" element={<MusicPlayer />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
