import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Quiz from "../components/quiztest/Quiz";
import { useFetchQuizQuery } from "../features/quizzes/quizzesApi";

const QuizTest = () => {
  const { quizId } = useParams();
  const { data } = useFetchQuizQuery(quizId);
  console.log(data);
  const { title, contents, negativeMarking, numberPerQuestion, quizDuration } =
    data || {};

  const [answeredQuestions, setAnsweredQuestions] = useState({
    right: 0,
    wrong: 0,
  });

  return (
    <div className="w-full px-5 md:px-0 flex flex-col min-h-[80vh] mt-[12vh] ring">
      <div className="w-full md:w-[90%] mx-auto min-h-[10vh] flex items-center justify-between flex-wrap font-semibold text-lg">
        <p>
          Topic: <span className="text-indigo-600 font-bold">{title}</span>
        </p>
        <p>
          Questions:{" "}
          <span className="text-indigo-600 font-bold">{contents?.length}</span>
        </p>
        <p>
          Answered:{" "}
          <span className="text-indigo-600 font-bold">
            {answeredQuestions.right + answeredQuestions.wrong}
          </span>
        </p>
        <p>
          Right Answered:{" "}
          <span className="text-green-600 font-bold">
            {answeredQuestions.right}
          </span>
        </p>
        <p>
          Wrong Answered:{" "}
          <span className="text-red-600 font-bold">
            {answeredQuestions.wrong}
          </span>
        </p>
        <p>
          Marks:
          <span className="text-green-600 font-bold">
            {" "}
            {answeredQuestions.right * numberPerQuestion -
              answeredQuestions.wrong * negativeMarking}
          </span>
        </p>
      </div>
      <div className="w-full flex flex-col gap-2 items-start justify-center">
        {contents?.map((content, index) => (
          <Quiz
            key={index}
            question={content}
            setAnsweredQuestions={setAnsweredQuestions}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizTest;
