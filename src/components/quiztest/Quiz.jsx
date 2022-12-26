import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Quiz = ({ question: quiz, setAnsweredQuestions }) => {
  const { correctAnswer, options, question } = quiz;
  console.log(quiz);

  const [input, setInput] = useState("");
  const [answered, setAnswered] = useState(false);

  const inputHandler = (e) => {
    setInput(e.target.value);
    setAnswered(true);
  };

  const showAnswer = () => {
    toast.warn(
      `
    Correct Ans: "${correctAnswer}".
    NB: this is marked as wrong answer.
    `,
      {
        autoClose: 5000,
      }
    );
    setInput(!correctAnswer);
    setAnswered(true);
  };

  useEffect(() => {
    setAnsweredQuestions((prev) => {
      if (answered) {
        if (input === correctAnswer) {
          toast.success("Your answer was correct");
          return {
            ...prev,
            right: prev.right + 1,
          };
        } else {
          toast.error("Your answer was incorrect");
          return {
            ...prev,
            wrong: prev.wrong + 1,
          };
        }
      }
      return prev;
    });
  }, [answered, correctAnswer, input, setAnsweredQuestions]);

  return (
    <div className="w-full md:w-[90%] p-5 mx-auto flex flex-col my-3 gap-3 bg-slate-200 rounded shadow-sm shadow-slate-500">
      <div className="flex gap-2 items-center cursor-pointer">
        <p
          className="font-bold sm:text-xl"
          dangerouslySetInnerHTML={{ __html: question }}
        />
        <img
          className="w-[16px] h-[16px]"
          src="https://img.icons8.com/external-prettycons-lineal-color-prettycons/16/000000/external-help-essentials-prettycons-lineal-color-prettycons.png"
          alt=""
          onClick={showAnswer}
          title="Reveal Answer!"
        />
      </div>

      <ToastContainer autoClose={2000} />

      {options?.map((option, index) => (
        <div className="flex gap-2 items-center" key={index}>
          <input
            type="radio"
            value={option}
            onChange={(e) => inputHandler(e)}
            disabled={answered}
            checked={input === option ? true : false}
            className="cursor-pointer"
          />
          <label className="cursor-pointer flex items-center">
            <span
              className={
                (option === correctAnswer &&
                  answered &&
                  "ring ring-green-300") ||
                (option === input ? "ring ring-red-300" : "")
              }
            >
              {option}
            </span>
          </label>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Quiz;
