import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className="flex-1 flex flex-col">
          <Navbar setSidebarOpen={setSidebarOpen} />
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Landing/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
