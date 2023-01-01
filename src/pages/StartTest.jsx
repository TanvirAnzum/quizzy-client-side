import React from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchQuizQuery } from "../features/quizzes/quizzesApi";

const StartTest = () => {
  const { quizId } = useParams();
  const { data } = useFetchQuizQuery(quizId);
  const { title, duration, contents } = data || {};
  return (
    <div className="min-h-screen h-full flex items-center justify-center">
      <div className="flex flex-col gap-2">
        <h1>quiz details</h1>
        <p>{title}</p>
        <p>{duration}</p>
        <p>{contents.length}</p>
        <Link to={`/test/${quizId}`} className="btn btn-primary">
          Start Quiz
        </Link>
      </div>
    </div>
  );
};

export default StartTest;
