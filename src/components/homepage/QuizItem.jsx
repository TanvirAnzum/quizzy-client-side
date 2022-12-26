import React from "react";
import { Link } from "react-router-dom";

const QuizItem = ({ quizItem, participants }) => {
  const { title, _id, status } = quizItem || {};
  return (
    <div className="border border-t-0 border-slate-700 min-h-[2em] text-xl w-full flex items-center justify-between p-2">
      {!participants && (
        <>
          <Link className="w-[60%]" to={`/quizDetails/${_id}`}>
            <p>{title}</p>
          </Link>
          <p className="w-[4em]">{status}</p>
          <p className="w-[4em]">Analyze</p>
          <p className="w-[4em]">Preview</p>
          <p className="w-[4em]">Delete</p>
        </>
      )}
      {participants && (
        <>
          <p>{title}</p>
          <Link to={`/test/${_id}`}>
            <button className="btn w-[8em]">Start Quiz</button>
          </Link>
          <p className="w-[4em]">Analyze</p>
          <p className="w-[4em]">Preview</p>
          <p className="w-[4em]">Delete</p>
        </>
      )}
    </div>
  );
};

export default QuizItem;
