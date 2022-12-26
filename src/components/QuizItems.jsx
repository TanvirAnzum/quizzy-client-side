import React from "react";

const QuizItems = ({ quiz }) => {
  const { question, correctAnswer, options } = quiz || {};
  return (
    <div className="w-full p-5 min-h-fit shadow shadow-neutral flex flex-col items-start justify-start rounded-md gap-3 relative">
      <h1 className="text-xl w-[90%] font-semibold uppercase text-accent">
        {question}
      </h1>
      <ul className="list-decimal list-inside">
        {options?.map((option) => (
          <li className="text-md font-semibold">{option}</li>
        ))}
      </ul>
      <h1 className="text-lg font-bold text-success">
        Correct Answer: {correctAnswer}
      </h1>
      <div className="w-[3em] h-[2em] flex items-center justify-around absolute top-2 right-4">
        <i className="fa-solid fa-pen-to-square text-lg hover:text-secondary cursor-pointer"></i>
        <i className="fa-solid fa-trash hover:text-error cursor-pointer"></i>
      </div>
    </div>
  );
};

export default QuizItems;
