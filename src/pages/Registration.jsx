import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  registerUser,
  signInWithFacebook,
  signInWithGithub,
  signInWithGoogle,
} from "../features/firebase/firebaseConfig";
import Spinner from "../ui/Spinner";

const Registration = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const res = await registerUser(email, password);
      console.log(res);
    } catch (error) {
      console.log(error);
      setError(error);
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
      setError(error);
    }
  };

  return (
    <>
      {isLoading && <Spinner auth={true} />}
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-2 bg-gray-100">
        <div className="w-[90%] sm:w-[22em] min-h-[30em] flex flex-col bg-gray-50 rounded-lg p-8 gap-5 shadow-lg shadow-slate-400">
          <h1 className="text-xl uppercase font-bold text-center text-slate-700">
            Sign Up
          </h1>
          <form
            className="w-full flex flex-col items-start justify-center gap-3"
            onSubmit={(e) => submitHandler(e)}
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

            {error && (
              <p className="text-sm text-red-600 font-semibold">
                Error Message
              </p>
            )}

            <button
              type="submit"
              className="w-full text-md uppercase rounded-md border p-1 bg-pink-500 text-gray-100 font-semibold"
            >
              Sign Up
            </button>
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
            Already a user?{" "}
            <Link to="/login">
              <span className="cursor-pointer font-bold underline">LOGIN</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Registration;
