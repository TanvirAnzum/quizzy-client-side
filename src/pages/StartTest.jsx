import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useCreateTestMutation } from "../features/quizTests/testsApi";
import { useFetchQuizQuery } from "../features/quizzes/quizzesApi";
import Spinner from "../ui/Spinner";

const StartTest = () => {
  const { quizId } = useParams();
  const [publicEmail, setPublicEmail] = useState("");
  const { data, isLoading } = useFetchQuizQuery(quizId);
  const [mutate, { data: test, isSuccess, isError, error }] =
    useCreateTestMutation();
  const auth = useSelector((state) => state.auth);
  const {
    title,
    quizDuration,
    contents,
    numberPerQuestion,
    negativeMarking,
    publicAccess,
  } = data || {};

  const createTestHandler = () => {
    if (publicAccess === "private") {
      const testObj = {
        quizId,
        email: auth?.user?.email,
        title,
        contents,
        numberPerQuestion,
        negativeMarking,
        duration: quizDuration,
        startedAt: Date.now(),
        marks: 0,
        isFinished: false,
      };
      mutate({ data: testObj, email: auth?.user?.email, quizId });
    } else if (publicAccess === "public") {
      if (publicEmail) {
        const testObj = {
          quizId,
          email: publicEmail,
          title,
          contents,
          numberPerQuestion,
          negativeMarking,
          duration: quizDuration,
          startedAt: Date.now(),
          marks: 0,
          isFinished: false,
        };
        mutate({ data: testObj, email: publicEmail, quizId });
      } else {
        toast.error("Email Required");
      }
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      const { _id } = test;
      navigate(
        publicAccess === "public"
          ? `/test/public/${_id}`
          : `/test/private/${_id}`
      );
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [error?.data?.message, isError, isSuccess, navigate, publicAccess, test]);

  let content;

  if (isLoading) content = <Spinner />;
  else if (!isLoading)
    content = (
      <div className="min-h-screen h-full flex items-center justify-center">
        <div className="flex flex-col gap-4 w-[30em]  shadow p-5 rounded bg-base-200">
          <h1 className="text-center mx-auto font-semibold text-2xl">
            Quiz Test Details
          </h1>
          <p>Title: {title}</p>
          <p>Duration: {quizDuration} minutes</p>
          <p>Total questions: {contents?.length}</p>
          <p>Total Points: {contents?.length * numberPerQuestion}</p>
          <p>Point per correct answer: {numberPerQuestion} </p>
          <p>Point per incorrect answer: {negativeMarking} </p>
          {publicAccess === "public" && (
            <form>
              <input
                type="email"
                placeholder="email"
                className="input w-full input-bordered"
                value={publicEmail}
                onChange={(e) => setPublicEmail(e.target.value)}
                required
              />
            </form>
          )}
          <div className="btn-group mx-auto">
            <Link
              className="btn btn-primary w-[8em]"
              onClick={createTestHandler}
            >
              Start Quiz
            </Link>
            <Link className="btn btn-secondary w-[8em]" to="/">
              Home
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <>
      <ToastContainer />
      {content}
    </>
  );
};

export default StartTest;
