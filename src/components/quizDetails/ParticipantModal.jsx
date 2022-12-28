import React, { useEffect, useState } from "react";
import { isValidUser } from "../../features/firebase/firebaseConfig";
import Spinner from "../../ui/Spinner";
import isValidEmail from "../../util/isValidEmail";

const ParticipantModal = ({ setModal, quiz, update }) => {
  const { _id, participants } = quiz || {};
  const [isLoading, setIsLoading] = useState(false);

  const [participantInput, setParticipantInput] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);

  // debounce handler

  const doChange = async (e) => {
    setError("");
    setParticipantInput(e.target.value);
  };

  const debounce = (fn, duration) => {
    let timeOut;

    return function (...args) {
      if (timeOut) clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        fn(...args);
      }, duration);
    };
  };

  const handleChange = debounce(doChange, 500);

  // add participants

  const addParticipant = () => {
    const participantObj = {
      id: _id,
      participants: participantInput,
    };
    update(participantObj);
  };

  useEffect(() => {
    const emailCheck = isValidEmail(participantInput);
    if (emailCheck) {
      setIsLoading((loading) => true);
      isValidUser(participantInput).then((response) => {
        if (response) {
          setError("");
          setDisabled(false);
          setIsLoading((loading) => false);
        } else {
          setError("User Not Found");
          setDisabled(true);
          setIsLoading((loading) => false);
        }
      });
    } else {
      setDisabled(true);
    }
  }, [participantInput]);

  return (
    <>
      {isLoading && <Spinner />}
      <div className="w-fit fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] m-auto flex flex-col p-5  bg-base-300 z-50 rounded-xl">
        <div className="w-full flex item-center justify-between">
          <h1 className="text-xl font-semibold">Manage Participants</h1>
          <i
            className="text-xl font-bold text-red-500 fa-solid fa-x cursor-pointer"
            onClick={() => setModal(false)}
          ></i>
        </div>

        <ul className="h-[20em] w-full overflow-auto list-inside list-decimal shadow shadow-neutral rounded p-5 my-5 bg-base-200">
          <p className="text-xl font-semibold text-success text-center uppercase">
            Participants
          </p>
          <div className="w-full h-[4em] flex items-center justify-between gap-4">
            <input
              className="input input-bordered input-sm w-[20em]"
              type="text"
              onChange={handleChange}
            />

            <button
              className="btn btn-sm btn-primary"
              disabled={disabled}
              onClick={addParticipant}
            >
              Add
            </button>
          </div>
          {error && <p className="text-error">{error}</p>}
          {participants?.length === 0 && (
            <div className="w-full h-[10em] rounded flex flex-col items-center justify-center">
              <p className="text-xl font-semibold text-error">
                No participants!
              </p>
            </div>
          )}

          {participants?.map((participant) => (
            <li className="text-lg font-semibold">{participant}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ParticipantModal;
