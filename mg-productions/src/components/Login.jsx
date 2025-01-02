import React, { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { app } from '../config/firebase.config';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { useStateValue } from '../context/StateProvider';
import { validateUser } from '../api';
import { actionType } from '../context/actionType';

function Login({ onClose, onSignUpOpen , setAuth}) {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider(); 

    const navigate = useNavigate();

    const [{user},dispatch] = useStateValue();

    const loginWithGoogle = async () =>{
      await signInWithPopup(firebaseAuth,provider).then((userCred) =>{
        if(userCred){
          setAuth(true);
          window.localStorage.setItem("auth","true")
        }

        firebaseAuth.onAuthStateChanged((userCred) => {
          if(userCred){
            userCred.getIdToken().then((token) =>{
               validateUser(token)
               .then((data) => {
                dispatch({
                  type : actionType.SET_USER,
                  user : data,
                })
               })
            }
            )
            navigate("/",{replace:true})
            
          }
          else{
            setAuth(false);
            dispatch({
              type : actionType.SET_USER,
              user : null,
            })
            navigate("/login")
          }
        });
        
      })
      
    }
    useEffect(() =>{
      if(window.localStorage.getItem("auth" === "true")){
        navigate("/",{replace:true})
      }
    },[])

  return (
    <div
      id="login-popup"
      tabIndex="-1"
      className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex"
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="#c6c7c7"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close popup</span>
          </button>

          <div className="p-5">
            <div className="text-center">
              <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                Login to your account
              </p>
              <p className="mt-2 text-sm leading-4 text-slate-600">
                You must be logged in to perform this action.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-2">
              <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60" onClick={loginWithGoogle}>
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-[18px] w-[18px]"
                />
                Continue with Google
              </button>
            </div>

            <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200"></div>
              OR
              <div className="h-px w-full bg-slate-200"></div>
            </div>

            <form className="w-full">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Email Address"
              />
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Password"
              />
              <p className="mb-3 mt-2 text-sm text-gray-500">
                <a href="/forgot-password" className="text-blue-800 hover:text-blue-600">Reset your password?</a>
              </p>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
              >
                Continue
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              Don't have an account?
              <button onClick={onSignUpOpen} className="font-medium text-[#4285f4]">Sign up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
