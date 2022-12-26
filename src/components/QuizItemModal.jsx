import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useUpdateQuizMutation } from "../features/quizzes/quizzesApi";
import Options from "./Options";

const QuizItemModal = ({ setModal }) => {
  const [addOption, setAddOption] = useState(0);
  const [optionValue, setOptionValue] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(-1);

  const questionRef = useRef("");

  const { quizId } = useParams() || {};

  const [mutate, { isError }] = useUpdateQuizMutation();

  const submitHandler = (e) => {
    e.preventDefault();

    if (correctAnswer !== -1) {
      const quizContentObj = {
        question: questionRef.current.value,
        options: optionValue,
        correctAnswer: optionValue[correctAnswer],
      };
      mutate({
        id: quizId,
        contents: quizContentObj,
      });
    } else {
      alert("please enter correct answer");
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 z-50"></div>
      <form
        className="w-fit fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] m-auto flex flex-col p-5 gap-8 bg-base-300 z-50 rounded-xl"
        onSubmit={submitHandler}
      >
        <h1 className="text-xl mx-auto font-bold uppercase">
          Create New Question
        </h1>
        <input
          type="text"
          className="input input-bordered"
          placeholder="Question"
          required
          ref={questionRef}
        />
        <Options
          setOptionValue={setOptionValue}
          optionValue={optionValue}
          index={0}
          setAddOption={setAddOption}
          setCorrectAnswer={setCorrectAnswer}
          correctAnswer={correctAnswer}
        />
        <Options
          setOptionValue={setOptionValue}
          optionValue={optionValue}
          index={1}
          setAddOption={setAddOption}
          setCorrectAnswer={setCorrectAnswer}
          correctAnswer={correctAnswer}
        />
        {[...Array(addOption)].map((item, index) => (
          <Options
            setOptionValue={setOptionValue}
            optionValue={optionValue}
            index={index + 2}
            setAddOption={setAddOption}
            setCorrectAnswer={setCorrectAnswer}
            correctAnswer={correctAnswer}
          />
        ))}

        <div className="btn-group mx-auto">
          <button
            className="btn"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setAddOption((option) => option + 1);
            }}
          >
            Add Option
          </button>

          <button className="btn" type="submit">
            Submit Ques
          </button>
          <button className="btn" type="button" onClick={() => setModal(false)}>
            Close Modal
          </button>
        </div>
      </form>
    </>
  );
};

export default QuizItemModal;
