// App.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
import { validateUser } from './api';
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/actionType';

const App = () => {
    const firebaseAuth = getAuth(app);
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false || window.localStorage.getItem('auth') === 'true');
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            if (userCred) {
                userCred.getIdToken().then((token) => {
                    validateUser(token).then((data) => {
                        console.log(token);
                        
                        dispatch({
                            type: actionType.SET_USER,
                            user: data,
                        });
                    });
                });
            } else {
                setAuth(false);
                window.localStorage.setItem('auth', 'false');
                dispatch({
                  type: actionType.SET_USER,
                  user : null,
                });
                navigate('/login');
            }
        });
    }, [firebaseAuth, navigate, dispatch]);

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-y-auto">
                <Navbar setAuth={setAuth} />
                <div className="flex-1 p-4">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/favorite" element={<Favorite />} />
                        <Route path="/music" element={<MusicPlayer />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default App;
