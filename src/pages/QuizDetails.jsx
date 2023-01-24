import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ConfigQuiz from "../components/quizDetails/ConfigQuiz";
import CreateQuiz from "../components/quizDetails/CreateQuiz";
import PublishQuiz from "../components/quizDetails/PublishQuiz";
import { useFetchQuizQuery } from "../features/quizzes/quizzesApi";

const QuizDetails = () => {
  const { quizId } = useParams() || {};
  const { data } = useFetchQuizQuery(quizId);
  const [options, setOptions] = useState("create");

  const renderOptions = {
    create: <CreateQuiz quiz={data} />,
    config: <ConfigQuiz quiz={data} />,
    publish: <PublishQuiz quiz={data} />,
  };

  return (
    <>
      <h1 className="text-2xl mx-auto font-semibold">Quiz Creator</h1>
      <ul className="menu menu-horizontal bg-base-300 rounded-box mx-auto">
        <li>
          <Link
            onClick={() => setOptions("create")}
            className={
              options === "create"
                ? "active w-[6em] flex items-center justify-center "
                : " flex items-center justify-center w-[6em]"
            }
          >
            Create
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setOptions("config")}
            className={
              options === "config"
                ? "active w-[6em] flex items-center justify-center "
                : " flex items-center justify-center w-[6em]"
            }
          >
            Config
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setOptions("publish")}
            className={
              options === "publish"
                ? "active w-[6em] flex items-center justify-center "
                : " flex items-center justify-center w-[6em]"
            }
          >
            Publish
          </Link>
        </li>
      </ul>
      <div>
        <h1 className="font-semibold text-xl">
          Quiz Title: <span className="text-success">{data?.title}</span>
        </h1>
        <p className="font-semibold text-xl">
          Quiz Author: <span className="text-accent">{data?.author}</span>
        </p>
      </div>
      {renderOptions[options]}
    </>
  );
};

export default QuizDetails;
