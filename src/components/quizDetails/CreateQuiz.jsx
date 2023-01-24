import React, { useState } from "react";
import QuizItemModal from "../QuizItemModal";
import QuizItems from "../QuizItems";

const CreateQuiz = ({ quiz }) => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <h1 className="text-primary text-center text-3xl font-bold">
        Preview questions
      </h1>
      <div className="btn-group my-5">
        <button className="btn btn-secondary" onClick={() => setModal(true)}>
          Add Item
        </button>
      </div>
      {quiz?.contents?.length === 0 && (
        <div className="w-full h-[20em] shadow shadow-neutral rounded flex flex-col items-center justify-center">
          <p className="text-xl font-semibold text-error">No Data Available.</p>
          <p className="text-xl font-semibold text-warning">
            Press Add Item button to create quiz contents
          </p>
        </div>
      )}
      {quiz?.contents?.map((content, index) => (
        <QuizItems quiz={content} key={index} />
      ))}
      {modal && <QuizItemModal setModal={setModal} />}
    </>
  );
};

export default CreateQuiz;
