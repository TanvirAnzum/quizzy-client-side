import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useCreateQuizMutation } from "../../features/quizzes/quizzesApi";

const Modal = ({ setModal }) => {
  const state = useSelector((state) => state.auth);
  const { email } = state.user;

  const titleRef = useRef("");
  const [mutate, { isError }] = useCreateQuizMutation();

  const hideModal = (e) => {
    e.preventDefault();
    setModal(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    titleRef.current.value = "";
    const quizObj = {
      title,
      author: email,
      participants: [],
      contents: [],
      status: "Pending",
    };
    mutate(quizObj);
    setModal(false);
  };

  return (
    <form
      className="w-[30em] h-[10em]  p-5 flex flex-col gap-5 items-center rounded-xl shadow-lg shadow-neutral backdrop-blur-xl bg-base-300 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50"
      onSubmit={submitHandler}
    >
      <input
        type="text"
        placeholder="Quiz Title"
        className="w-full h-[3em] rounded px-2"
        ref={titleRef}
        required
      />
      <div className="flex gap-2 ml-auto">
        <button
          type="submit"
          className="px-5 py-1 bg-green-700 text-xl font-semibold rounded text-gray-50 "
        >
          Submit
        </button>
        <button
          onClick={(e) => hideModal(e)}
          className="px-5 py-1 bg-red-700 text-xl font-semibold rounded text-gray-50"
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default Modal;
