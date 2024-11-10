import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

const LoginButton = ({setAuth}) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsSignUpOpen(false); // Ensure SignUp is closed
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  const openSignUp = () => {
    setIsSignUpOpen(true);
    setIsLoginOpen(false); // Ensure Login is closed
  };

  const closeSignUp = () => {
    setIsSignUpOpen(false);
  };

  return (
    <div>
      <button onClick={openLogin} className="bg-blue-600 text-sm text-gray-50 p-2 rounded-md">
        Log In
      </button>

      {isLoginOpen && <Login onClose={closeLogin} onSignUpOpen={openSignUp} setAuth={setAuth}/>}
      {isSignUpOpen && <SignUp onClose={closeSignUp} onLoginOpen={openLogin} />}
    </div>
  );
};

export default LoginButton;
