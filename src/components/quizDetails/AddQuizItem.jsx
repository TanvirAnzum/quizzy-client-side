import React from "react";

const AddQuizItem = ({ setModal }) => {
  return (
    <div
      data-aos="zoom-in-up"
      className="w-[20em] h-[20em] bg-slate-600 fixed "
    >
      hello
      <button onClick={() => setModal(false)}>close</button>
    </div>
  );
};

export default AddQuizItem;
