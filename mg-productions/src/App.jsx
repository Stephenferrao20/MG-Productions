import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Search from './pages/Search';
import Profile from './pages/User/Profile';
import Dashboard from './pages/Admin/Dashboard';
import Favorite from './pages/Favorite';
import MusicPlayer from './pages/MusicPlayer';
import { motion } from "framer-motion";
import { getAuth } from 'firebase/auth';
import { app } from './config/firebase.config';
import { validateUser } from './api';
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/actionType';
import UserRequestTabs from './pages/User/UserRequestTabs';
import axios from 'axios';

const App = () => {
    const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(
    () => window.localStorage.getItem("auth") === "true" || false
  );
  const [{ user, isSongPlaying, Token }, dispatch] = useStateValue();

  axios.defaults.baseURL = "http://localhost:4000";

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged(async (userCred) => {
          if (userCred) {
            const token = await userCred.getIdToken();
            console.log("Token:", token);
    
            dispatch({
              type: actionType.SET_TOKEN,
              Token: token,
            });
    
            try {
              const userData = await validateUser(token);
              console.log("User Data:", userData);
    
              dispatch({
                type: actionType.SET_USER,
                user: userData,
              });
    
              setAuth(true);
              window.localStorage.setItem("auth", "true");
            } catch (error) {
              console.error("Error validating user:", error);
            }
          } else {
            setAuth(false);
            window.localStorage.setItem("auth", "false");
            dispatch({ type: actionType.SET_USER, user: null });
            navigate("/");
          }
        });
    
        return () => unsubscribe();
      }, [firebaseAuth, navigate, dispatch]);
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-y-auto">
                <Navbar setAuth={setAuth} />
                {console.log(`token app ${Token}`)}
                <div className="flex-1 p-4">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/dashboard/*" element={<Dashboard user={user?.user}/>} />
                        <Route path="/favorite" element={<Favorite />} />
                        <Route path="/music" element={<MusicPlayer />} />
                        <Route path="/request/*" element={<UserRequestTabs user={user?.user}/>} />
                    </Routes>
                </div>
            </div>
            {isSongPlaying && (
                <motion.div
                    initial={{ opacity: 0 , y : 50}}
                    animate={{ opacity: 1 , y : 0}}
                    className={`fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
                >
                    <MusicPlayer />
                </motion.div>
                )}
        </div>
    );
};

export default App;
