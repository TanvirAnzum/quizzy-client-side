import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isValidUser } from "../../features/firebase/firebaseConfig";
import { useUpdateQuizMutation } from "../../features/quizzes/quizzesApi";
import isValidEmail from "../../util/isValidEmail";

const ConfigQuiz = (quiz) => {
  const {
    title,
    author,
    participants,
    contents,
    negativeMarking,
    quizDuration,
    publicAccess,
    numberPerQuestion,
    _id,
    status,
  } = quiz.quiz || {};

  console.log(quiz?.contents);
  console.log(quiz);

  const [participantInput, setParticipantInput] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);

  const [update] = useUpdateQuizMutation();

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

  useEffect(() => {
    const emailCheck = isValidEmail(participantInput);
    if (emailCheck) {
      isValidUser(participantInput).then((response) => {
        if (response) {
          setError("");
          setDisabled(false);
        } else {
          setError("User Not Found");
          setDisabled(true);
        }
      });
    } else {
      setDisabled(true);
    }
  }, [participantInput]);

  // quiz rules form

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // get details from quiz details form

  const setDetails = (data) => {
    update({
      id: _id,
      ...data,
    });
    reset();
    // console.log(link);
  };

  // add participants

  const addParticipant = () => {
    const participantObj = {
      id: _id,
      participants: participantInput,
    };
    update(participantObj);
  };

  const participantsElm = (
    <ul className="h-[20em] w-full overflow-auto list-inside list-decimal shadow shadow-neutral rounded p-5 my-5">
      <p className="text-xl font-semibold text-success text-center uppercase">
        Participants
      </p>
      <div className="w-full h-[4em] flex items-center justify-between">
        <input
          className="text-xl border rounded w-[60%] focus:ring ring-primary outline-none px-1"
          type="text"
          onChange={handleChange}
        />

        <button
          className="btn btn-sm btn-primary"
          disabled={disabled}
          onClick={addParticipant}
        >
          Add participant
        </button>
      </div>
      {error && <p className="text-error">{error}</p>}
      {participants?.length === 0 && (
        <div className="w-full h-[10em] rounded flex flex-col items-center justify-center">
          <p className="text-xl font-semibold text-error">No participants!</p>
        </div>
      )}

      {participants?.map((participant) => (
        <li className="text-lg font-semibold">{participant}</li>
      ))}
    </ul>
  );
  return (
    <div className="w-full flex p-5 items-start justify-between gap-4">
      <form
        className="flex flex-col gap-4 p-5 justify-center items-center w-full sm:w-[30em] my-5 shadow shadow-neutral rounded"
        onSubmit={handleSubmit(setDetails)}
      >
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Public Access</span>
          </label>
          <select
            className="select select-bordered"
            defaultValue="public"
            {...register("publicAccess")}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <label className="label">
            <span className="label-text-alt">default value: public</span>
          </label>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Points Per Question</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            id="Number_per_question"
            placeholder="1 points per question"
            {...register("numberPerQuestion", { min: 1, max: 99 })}
            required
          />
          <label className="label">
            <span className="label-text-alt">
              default value: 1 points per question
            </span>
          </label>
        </div>
        {errors.numberPerQuestion && (
          <p className="text-sm font-bold text-error">
            Points should be in range of 1 to 99.
          </p>
        )}

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Negative Markings</span>
          </label>
          <input
            type="number"
            className="input input-bordered "
            id="negativeMarking"
            placeholder="0 points per wrong question"
            {...register("negativeMarking", { min: 1, max: 99 })}
          />
          <label className="label">
            <span className="label-text-alt">
              default value: 0 points per wrong question
            </span>
          </label>
        </div>

        {errors.negativeMarking && (
          <p className="text-sm font-bold text-error">
            Negative marking should be in range of 1 to 99.
          </p>
        )}

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Quiz Duration</span>
          </label>
          <input
            type="number"
            className="input input-bordered"
            id="duration"
            placeholder="10 min"
            {...register("quizDuration", { min: 1 })}
            required
          />
          <label className="label">
            <span className="label-text-alt">default value: 10 min</span>
          </label>
        </div>
        {errors.quizDuration && (
          <p className="text-sm font-bold text-error">
            Quiz should be atleast 1 min!
          </p>
        )}
        {/* <CopyToClipboard text={link}> */}
        <button type="submit" className="btn btn-secondary">
          Save
        </button>
        {/* </CopyToClipboard> */}
      </form>
      <div className="flex flex-col gap-4 p-5 justify-center items-center w-full sm:w-[30em] my-5 shadow shadow-neutral rounded">
        <h1 className="text-xl font-semibold">Current Configuration</h1>
        <p className="w-full flex items-center justify-between">
          Total Questions: <span>{contents?.length}</span>
        </p>
        <p className="w-full flex items-center justify-between">
          Status: <span>{status}</span>
        </p>
        <p className="w-full flex items-center justify-between">
          Public Access: <span>{publicAccess.toString()}</span>
        </p>
        <p className="w-full flex items-center justify-between">
          Duration: <span>{quizDuration}</span>
        </p>
        <p className="w-full flex items-center justify-between">
          Number Per Questions: <span>{numberPerQuestion}</span>
        </p>
        <p className="w-full flex items-center justify-between">
          Negative Markings: <span>{negativeMarking}</span>
        </p>
        {publicAccess && (
          <button className="btn btn-success"> View all participants</button>
        )}
      </div>
    </div>
  );
};

export default ConfigQuiz;
