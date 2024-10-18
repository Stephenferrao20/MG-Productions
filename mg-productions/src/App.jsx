import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Landing from './pages/Landing';
import Search from './pages/Search';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false); 

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex flex-col flex-1">
          <Navbar setSidebarOpen={setSidebarOpen} />
          
          

          <div className="flex-1 p-0 bg-gray-900">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/search" element={<Search />} />
              
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
