import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  signIn,
  signInWithFacebook,
  signInWithGithub,
  signInWithGoogle,
} from "../features/firebase/firebaseConfig";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async (e) => {
    setIsLoading((prev) => (prev = true));
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      const res = await signIn(email, password);
      setIsLoading((prev) => (prev = false));
    } catch (error) {
      setIsLoading((prev) => (prev = false));
      console.log(error);
    }
  };

  const signInWithProviders = async (providerName) => {
    setIsLoading((prev) => (prev = true));
    try {
      let res;
      if (providerName === "google") {
        res = await signInWithGoogle();
      } else if (providerName === "facebook") {
        res = await signInWithFacebook();
      } else if (providerName === "github") {
        res = await signInWithGithub();
      }

      setIsLoading((prev) => (prev = false));
      console.log(res);
    } catch (error) {
      setIsLoading((prev) => (prev = false));
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-2 bg-gray-100">
      <div className="w-[90%] sm:w-[22em] min-h-[30em] flex flex-col bg-gray-50 rounded-lg p-8 gap-5 shadow-2xl shadow-slate-400">
        <h1 className="text-xl uppercase font-bold text-center text-slate-700">
          Sign In
        </h1>
        <form
          onSubmit={(e) => loginHandler(e)}
          className="w-full flex flex-col items-start justify-center gap-1"
        >
          <label htmlFor="email" className="font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full text-md rounded-md border-2 border-slate-300 px-2 py-1 outline-none focus:ring focus:ring-pink-300"
            required
            ref={emailRef}
          />

          <label className="font-medium text-slate-700" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full text-md rounded-md border-2 border-slate-300 px-2 py-1 outline-none focus:ring focus:ring-pink-300"
            required
            ref={passwordRef}
          />

          <div className="flex items-center flex-row-reverse gap-2 text-sm my-1 font-medium text-slate-700">
            <label htmlFor="remember_me">Remember me?</label>
            <input
              type="checkbox"
              id="remember_me"
              className="accent-pink-500 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full uppercase text-md rounded-md border p-1 bg-pink-500 text-gray-100 font-semibold"
          >
            Sign In
          </button>
          <p className="text-sm ml-auto cursor-pointer text-slate-700 font-semibold">
            Forget Password?
          </p>
        </form>

        <div className="w-full h-[4em] relative flex items-center justify-center">
          <hr className="w-full" />
          <p className="w-fit h-fit ring ring-gray-300 rounded-md p-1 absolute m-auto bg-slate-300 z-50 text-slate-700 font-bold">
            OR
          </p>
        </div>

        <div className="flex w-full h-auto items-center justify-center text-2xl gap-4 text-slate-700">
          <i
            className="fa-brands fa-facebook cursor-pointer"
            onClick={() => signInWithProviders("facebook")}
          ></i>
          <i
            className="fa-brands fa-google cursor-pointer"
            onClick={() => signInWithProviders("google")}
          ></i>
          <i
            className="fa-brands fa-github cursor-pointer"
            onClick={() => signInWithProviders("github")}
          ></i>
        </div>

        <p className="text-md text-center font-medium text-slate-700">
          Need an account?{" "}
          <Link to="/register">
            <span className="cursor-pointer font-bold underline">SIGN UP</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
