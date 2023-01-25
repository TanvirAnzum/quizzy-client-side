import React, { useEffect, useState } from "react";

const Options = ({
  setOptionValue,
  optionValue,
  index,
  setAddOption,
  correctAnswer,
  setCorrectAnswer,
}) => {
  //   const inputRef = useRef("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (optionValue[index]) {
      setInputValue(optionValue[index]);
    }
  }, [index, optionValue]);

  const blurHandler = () => {
    // const inputValue = inputRef.current.value;
    const newOptionValue = [...optionValue];
    newOptionValue[index] = inputValue;
    setOptionValue(newOptionValue);
  };

  const deleteHandler = () => {
    const newOptionValue = [...optionValue];
    newOptionValue.splice(index, 1);
    setOptionValue(newOptionValue);
    setAddOption((option) => option - 1);
  };

  return (
    <div className="w-full flex flex-col sm:flex-row gap-1 items-center sm:gap-4 justify-between">
      <label htmlFor={"optionField" + index}>Option {index + 1}</label>
      <input
        id={"optionField" + index}
        className="text-xl input input-bordered input-sm"
        // ref={inputRef}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        onBlur={blurHandler}
        required
      />
      {
        <div
          className="tooltip tooltip-bottom tooltip-error"
          data-tip="Delete field"
        >
          <i
            className="fa-solid fa-xmark block hover:text-error cursor-pointer text-2xl"
            onClick={() => {
              if (index > 1) deleteHandler();
              else alert("first two fields are required");
            }}
          ></i>
        </div>
      }
      <div
        className="tooltip tooltip-bottom tooltip-success"
        data-tip="Marked as correct answer"
      >
        <div className="form-control">
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              className="checkbox checkbox-success"
              onClick={() => setCorrectAnswer(index)}
              checked={correctAnswer === index}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Options;
