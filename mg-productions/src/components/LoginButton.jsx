import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()} className="bg-blue-600 text-sm text-gray-50 p-2 rounded-md ">Log In</button>;
};

export default LoginButton;
