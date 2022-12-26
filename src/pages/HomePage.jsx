import React, { useState } from "react";
import ListDisplay from "../components/homepage/ListDisplay";
import Modal from "../components/homepage/Modal";
import ParticipatedQuizDisplay from "../components/homepage/ParticipatedQuizDisplay";

const HomePage = () => {
  const [modal, setModal] = useState(false);

  return (
    <div className="w-full min-h-[88vh] flex flex-col items-center justify-start gap-2">
      <button
        className="btn btn-primary mt-[12vh]"
        onClick={() => setModal(true)}
      >
        Create Quiz
      </button>
      <ListDisplay />
      <ParticipatedQuizDisplay />
      {modal && <Modal setModal={setModal} />}
    </div>
  );
};

export default HomePage;
