import React from "react";

const Overview = () => {
  return (
    <div
      data-aos="fade-right"
      className="w-full min-h-[80vh] flex flex-col items-center justify-center p-10 rounded gap-10"
    >
      <h1 className="font-bold text-3xl uppercase text-slate-600">
        Why Choose Quizzy
      </h1>
      <hr className="w-full border-1 border-slate-300" />
      <div className="w-full p-4 flex flex-wrap items-center justify-between">
        <div className="w-1/4 flex flex-col items-center justify-center h-[8em] text-slate-600 gap-2">
          <i class="fa-solid fa-hand-holding-dollar text-5xl"></i>
          <p className="fs-semibold text-xl">Free of Cost</p>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center h-[8em] text-slate-600 gap-2">
          <i class="fa-solid fa-chart-simple text-5xl"></i>
          <p className="fs-semibold text-xl">Powerfull Reports</p>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center h-[8em] text-slate-600 gap-2">
          <i class="fa-regular fa-calendar-days text-5xl"></i>
          <p className="fs-semibold text-xl">Schedule Your Tests</p>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center h-[8em] text-slate-600 gap-2">
          <i class="fa-solid fa-eye-slash text-5xl"></i>
          <p className="fs-semibold text-xl">Public/Private Tests</p>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center h-[8em] text-slate-600 gap-2">
          <i class="fa-solid fa-share-from-square text-5xl"></i>
          <p className="fs-semibold text-xl">Invitations</p>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center h-[8em] text-slate-600 gap-2">
          <i class="fa-solid fa-mobile-screen-button text-5xl"></i>
          <p className="fs-semibold text-xl">Mobile Ready</p>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center h-[8em] text-slate-600 gap-2">
          <i class="fa-solid fa-ranking-star text-5xl"></i>
          <p className="fs-semibold text-xl">Auto Grading</p>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center h-[8em] text-slate-600 gap-2">
          <i class="fa-solid fa-file-pdf text-5xl"></i>
          <p className="fs-semibold text-xl">Pdf Reports</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
