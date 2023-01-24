import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateQuizMutation } from "../../features/quizzes/quizzesApi";
import ParticipantModal from "./ParticipantModal";

const ConfigQuiz = ({ quiz }) => {
  const {
    contents,
    negativeMarking,
    quizDuration,
    publicAccess,
    numberPerQuestion,
    _id,
    status,
  } = quiz || {};

  const [modal, setModal] = useState(false);

  const [update, { isLoading }] = useUpdateQuizMutation();

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
    toast.success("Data updated successfully!");
  };

  return (
    <>
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
              <span className="label-text-alt">default value: Private</span>
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
              {...register("negativeMarking", { min: 0, max: 99 })}
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
            Public Access: <span>{publicAccess}</span>
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
          {publicAccess === "private" && (
            <button className="btn btn-success" onClick={() => setModal(true)}>
              {" "}
              View all participants
            </button>
          )}
        </div>
      </div>
      {modal && (
        <ParticipantModal setModal={setModal} quiz={quiz} update={update} />
      )}
    </>
  );
};

export default ConfigQuiz;
