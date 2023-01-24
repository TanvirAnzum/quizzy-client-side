import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useFetchTestQuery,
  useUpdateTestMutation,
} from "../../features/quizTests/testsApi";
import TestOptions from "./TestOptions";

const TestQuestion = () => {
  const { quizId } = useParams();

  const { data } = useFetchTestQuery({ id: quizId });
  const [content, setContent] = useState(null);
  const { contents, marks, negativeMarking, numberPerQuestion } = data || {};
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [index, setIndex] = useState(-1);
  const [mutate] = useUpdateTestMutation();
  const auth = useSelector((state) => state.auth);

  const nextQuestionHandler = () => {
    const newMarks =
      correctAnswer === content.correctAnswer
        ? marks + parseInt(numberPerQuestion)
        : marks - parseInt(negativeMarking);
    mutate({
      id: quizId,
      data: {
        marks: newMarks,
      },
      question: index,
      email: auth?.user?.email,
    });
    setCorrectAnswer(null);

    toast.success("Answer submitted successfully!");
  };

  const skipQuestionHandler = () => {
    const newMarks = marks - parseInt(negativeMarking);

    mutate({
      id: quizId,
      data: {
        marks: newMarks,
      },
      question: index,
      email: auth?.user?.email,
    });
    setCorrectAnswer(null);

    toast.warn("Answer skipped successfully!");
  };

  useEffect(() => {
    if (contents?.length > 0) {
      for (let i = 0; i < contents?.length; i++) {
        if (!contents[i]?.answered) {
          setContent(contents[i]);
          setIndex(i);
          break;
        }
      }
    }
  }, [contents]);

  return (
    <>
      <div className="w-full flex min-h-[50vh] border rounded">
        <div className="w-1/2 p-5 ">
          <p className="font-semibold text-2xl">{content?.question}</p>
        </div>
        <div className="w-1/2 p-5 ">
          {content?.options?.map((option, index) => (
            <TestOptions
              option={option}
              key={index}
              setCorrectAnswer={setCorrectAnswer}
              correctAnswer={correctAnswer}
            />
          ))}
        </div>
      </div>
      <div className="w-full h-[10vh] border p-5 flex items-center justify-end gap-5 rounded">
        <button
          className="btn btn-secondary w-[6em] text-center"
          onClick={skipQuestionHandler}
        >
          Skip
        </button>
        <button
          className="btn btn-primary w-[6em] text-center"
          onClick={nextQuestionHandler}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default TestQuestion;
