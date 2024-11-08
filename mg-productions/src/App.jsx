import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Search from './pages/Search';
import Profile from './pages/User/Profile';
import Dashboard from './pages/Admin/Dashboard';
import Favorite from './pages/Favorite';
import MusicPlayer from './pages/MusicPlayer';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-y-auto"> {/* Enable vertical scrolling */}
          <Navbar />
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
    </Router>
  );
};

export default App;
