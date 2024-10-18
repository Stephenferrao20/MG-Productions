import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Landing from './pages/Landing';



function App() {

  return (
    
    <Router>
      
        {/* Main content area */}
        <div >
          <Routes>
            {/* Define routes for each page */}
            <Route path="/" element={<Landing/>} />
            {/* <Route path="/search" element={<Search />} /> */}
            {/* <Route path="/favorites" element={<Favorites />} /> */}
            {/* <Route path="/changeMode" element={<ChangeMode />} /> */}
          </Routes>
          
        </div>
        
    
    </Router>
  );
}

export default App;
