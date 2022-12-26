import React from "react";

const Consumers = () => {
  return (
    <div
      data-aos="fade-up"
      className="w-full min-h-[80vh] flex flex-col gap-10 p-10 items-center justify-center"
    >
      <h1 className="font-bold text-3xl uppercase text-slate-600">
        Who uses quizzy
      </h1>
      <hr className="w-full border-slate-300" />
      <div className="w-full flex items-center justify-between flex-wrap">
        <div className="text-slate-600 text-center w-[26em] min-h-[22em]">
          <i class="fa-solid fa-person text-5xl mb-2"></i>
          <h1 className="text-2xl font-bold mb-6">Individuals</h1>
          <p className="text-md font-medium">
            Create fun social quizzes that you can post on your website, blog or
            other social media site. If you prefer privacy the advanced email
            options allow you to quickly send private quizzes to your friends.
            The review feature allows your friends to review their answers after
            they have completed the quiz.
          </p>
        </div>
        <div className="text-slate-600 text-center w-[26em] min-h-[22em]">
          <i class="fa-solid fa-graduation-cap text-5xl mb-2"></i>
          <h1 className="text-2xl font-bold mb-6">Teachers</h1>
          <p className="text-md font-medium">
            Quickly create courses or online tests for your students. You can
            make your test public or just publish it for your class or school
            with our private test options. The premium account will allow you to
            upload media and have unlimited questions. The auto-grading function
            will save you time and allow you to concentrate on what's important.
          </p>
        </div>
        <div className="text-slate-600 text-center w-[26em] min-h-[22em]">
          <i class="fa-solid fa-business-time text-5xl mb-2"></i>
          <h1 className="text-2xl font-bold mb-6">Business</h1>
          <p className="text-md font-medium">
            Create online training and assessments to ensure your staff are
            always up to date with the right skills. The powerful reporting
            allows you to track your staff participation and progress. FlexiQuiz
            implements SSL encryption and offers public and private options so
            you can be sure your assessments are always secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Consumers;
