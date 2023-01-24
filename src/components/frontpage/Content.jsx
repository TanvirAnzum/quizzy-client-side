import React from "react";
import banner from "../../assets/images/banner.svg";

const Content = () => {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-between gap-2 p-5 lg:p-10">
      <div className="w-full mt-[14vh] lg:w-[40%]  min-h-[18em] flex flex-col items-start justify-around ">
        <h1 className="font-bold text-2xl sm:text-4xl uppercase ">
          Powerful online test and quiz maker
        </h1>
        <p className="text-md sm:text-xl font-semibold font-serif">
          Create, send and analyze your tests, quizzes and assessments for free
          with Quizzy!!
        </p>
        <button className="w-[10em] p-2 ring ring-green-400 hover:ring-green-700 bg-green-300 font-bold  rounded-lg">
          Get Started
        </button>
      </div>
      <div className="w-full lg:w-[40%] my-5">
        <img src={banner} alt="" />
      </div>
    </div>
  );
};

export default Content;
