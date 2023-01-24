import React from "react";

const TestOptions = ({ option, setCorrectAnswer, correctAnswer }) => {
  return (
    <div className="form-control">
      <label
        className="label cursor-pointer justify-start gap-3"
        onClick={() => setCorrectAnswer(option)}
      >
        <input
          type="radio"
          name="radio-10"
          className="radio checked:bg-green-500"
          checked={correctAnswer === option}
        />
        <span className="label-text">{option}</span>
      </label>
    </div>
  );
};

export default TestOptions;
