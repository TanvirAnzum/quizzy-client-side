import React from "react";
import banner from "../../assets/images/banner.jpg";

const Content = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-between gap-2 p-10">
      <div className="w-[40%]  min-h-[18em] flex flex-col items-start justify-around text-slate-600">
        <h1 className="font-bold text-4xl uppercase ">
          Powerful online test and quiz maker
        </h1>
        <p className="text-xl font-semibold">
          Create, send and analyze your tests, quizzes and assessments for free
          with Quizzy!!
        </p>
        <button className="w-[10em] p-2 ring ring-green-400 hover:ring-green-700 bg-green-300 font-bold text-slate-700 rounded-lg">
          Get Started
        </button>
      </div>
      <div className="w-[40%] my-5">
        <img
          className="min-w-full h-[30em] object-cover opacity-80 rounded-md"
          src={banner}
          alt=""
        />
      </div>
    </div>
  );
};

export default Content;
