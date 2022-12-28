import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { isValidUser } from "../features/firebase/firebaseConfig";
import {
  useFetchQuizQuery,
  useUpdateQuizMutation,
} from "../features/quizzes/quizzesApi";
import isValidEmail from "../util/isValidEmail";

const QuizSettings = () => {
  const { quizId } = useParams() || {};
  const {
    data: quiz,
    isError,
    isLoading,
    error: getError,
  } = useFetchQuizQuery(quizId);
  const {
    title,
    author,
    participants,
    contents,
    negativeMarking,
    quizDuration,
    publicAccess,
    numberPerQuestion,
  } = quiz || {};

  console.log(quiz);

  // new participants handling

  const [participantInput, setParticipantInput] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);

  // shareable link
  const [link, setLink] = useState("");

  // mutation hook
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
      id: quizId,
      ...data,
    });
    reset();
    // console.log(link);
  };

  // add participants

  const addParticipant = () => {
    const participantObj = {
      id: quizId,
      participants: participantInput,
    };
    update(participantObj);
  };

  // link shortener

  useEffect(() => {
    fetch(
      `https://api.shrtco.de/v2/shorten?url=${process.env.REACT_APP_API_URL}test/${quizId}`
    )
      .then((response) => response.json())
      .then((data) => setLink(data.result.full_short_link));
  }, [quizId]);

  return (
    <div className="w-[30%] shadow-md shadow-neutral rounded-lg p-5">
      <h1 className="text-3xl font-bold my-5 text-accent">Quiz Details</h1>
      <p className="text-xl font-semibold">Title: {title}</p>
      <p className="text-xl font-semibold">Author: {author}</p>

      <form
        className="flex flex-col gap-4 p-5 justify-center my-5 shadow shadow-neutral rounded"
        onSubmit={handleSubmit(setDetails)}
      >
        <h1 className="text-xl font-semibold uppercase text-success self-center">
          Quiz rules
        </h1>
        <div className="flex gap-2 text-xl font-semibold items-center my-3">
          <p className="w-[50%]">Public Access: </p>
          <label className="swap ring rounded-md w-[4em] h-[2em]">
            <input type="checkbox" {...register("publicAccess")} />
            <div name="on" className="swap-on">
              ON
            </div>
            <div name="off" className="swap-off">
              OFF
            </div>
          </label>
        </div>
        <div className="flex items-center gap-2 text-xl font-semibold">
          <label htmlFor="Number_per_question" className="w-[50%]">
            Points per question:{" "}
          </label>
          <input
            type="number"
            className="input input-bordered w-[8em]"
            id="Number_per_question"
            placeholder=""
            {...register("numberPerQuestion", { min: 1, max: 99 })}
            required
          />
        </div>
        {errors.numberPerQuestion && (
          <p className="text-sm font-bold text-error">
            Points should be in range of 1 to 99.
          </p>
        )}
        <div className="flex items-center gap-2 text-xl font-semibold">
          <label htmlFor="negativeMarking" className="w-[50%]">
            Negative marking:{" "}
          </label>
          <input
            type="number"
            className="input input-bordered w-[8em]"
            id="negativeMarking"
            placeholder=""
            {...register("negativeMarking", { min: 1, max: 99 })}
          />
        </div>
        {errors.negativeMarking && (
          <p className="text-sm font-bold text-error">
            Negative marking should be in range of 1 to 99.
          </p>
        )}
        <div className="flex items-center gap-2 text-xl font-semibold">
          <label htmlFor="duration" className="w-[50%]">
            Quiz duration:{" "}
          </label>
          <input
            type="number"
            className="input input-bordered w-[8em]"
            id="duration"
            placeholder=""
            {...register("quizDuration", { min: 1 })}
            required
          />
        </div>
        {errors.quizDuration && (
          <p className="text-sm font-bold text-error">
            Quiz should be atleast 1 min!
          </p>
        )}
        <CopyToClipboard text={link}>
          <button type="submit" className="btn btn-secondary">
            Publish
          </button>
        </CopyToClipboard>
      </form>

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
    </div>
  );
};

export default QuizSettings;
