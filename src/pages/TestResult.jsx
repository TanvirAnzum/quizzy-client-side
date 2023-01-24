import React from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchTestQuery } from "../features/quizTests/testsApi";

const TestResult = () => {
  const { testId } = useParams();
  const { data } = useFetchTestQuery({ id: testId });
  const { marks, isFinished, email } = data || {};

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-base-300">
      {isFinished ? (
        <div className="w-fit h-fit p-7 rounded flex flex-col gap-4 items-start shadow bg-base-100">
          <h1 className="font-semibold text-xl text-success">
            Quiz Submitted Successfully!
          </h1>
          <p className="text-lg font-semibold text-blue-600">Marks: {marks}</p>
          <p className="text-lg font-semibold text-blue-600">Email: {email}</p>
          <Link className="btn btn-primary" to="/">
            Home
          </Link>
        </div>
      ) : (
        <div className="h-fit w-fit p-5 shadow bg-base-100 flex flex-col gap-5 items-start rounded">
          <h1 className="font-semibold text-2xl text-error">
            Your Test is Running or Not Exist!
          </h1>
          <Link className="btn btn-primary mx-auto" to="/">
            Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default TestResult;
