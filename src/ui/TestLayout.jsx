import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  useFetchTestQuery,
  useUpdateTestMutation,
} from "../features/quizTests/testsApi";

const TestLayout = () => {
  const { quizId } = useParams(); ///here quizId = testId

  const { data } = useFetchTestQuery({ id: quizId });
  const { duration, title, contents, startedAt } = data || {};
  const [timer, setTimer] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [width, setWidth] = useState(null);
  const [answered, setAnswered] = useState(0);
  const navigate = useNavigate();
  const [mutate] = useUpdateTestMutation();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (timer === null && data) {
      const currentTime = Date.now();
      const durationInMS = duration * 60 * 1000;
      const remainingTime = startedAt + durationInMS - currentTime;

      setTimer(parseInt(remainingTime / 1000));
    }
    if (data && timer !== null) {
      if (!timer) {
        mutate({
          id: quizId,
          data: {
            isFinished: true,
          },
          question: -1,
          email: auth?.user?.email,
        });
        toast.warn("Time out! Your quiz is submitted");
      }
      setTimeout(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    }
    const width = Math.floor((timer * 100) / (duration * 60));
    setWidth(width);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, duration, timer]);

  useEffect(() => {
    if (timer !== null) {
      const min = Math.floor(timer / 60);
      const sec = timer % 60;
      setMinutes(min);
      setSeconds(sec);
    }
  }, [timer]);

  useEffect(() => {
    if (data?.isFinished) {
      toast("Test already finished!");
      navigate(`/test/finished/${quizId}`);
    }
  }, [data, navigate]);

  useEffect(() => {
    let count = 0;
    for (let i = 0; i < contents?.length; i++) {
      if (contents[i]?.answered) {
        count++;
      }
    }
    setAnswered(count);
    if (count === contents?.length) {
      mutate({
        id: quizId,
        data: {
          isFinished: true,
        },
        question: -1,
        email: auth?.user?.email,
      });
      toast.success("You have successfully completed the quiz");
    }
  }, [auth?.user?.email, contents, mutate, quizId]);

  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-[80%] min-h-[80vh]  flex flex-col justify-between">
          {/* timer part */}
          <div className="w-full min-h-[10vh] border p-5 flex flex-col sm:flex-row gap-2 items-center justify-between sm:gap-5 rounded">
            <h1 className="font-semibold text-2xl">{title}</h1>
            <div className="font-semibold text-xl w-fit flex flex-col gap-1">
              <p>Question Remaining: {contents?.length - answered}</p>
              <progress
                className="progress w-full progress-success"
                value={answered}
                max={contents?.length}
              ></progress>
            </div>

            <div className="font-semibold text-xl w-fit flex flex-col gap-1">
              <p>
                Time remaining -{" "}
                <span className={minutes > 0 ? "text-primary" : "text-error"}>
                  {minutes}m
                </span>{" "}
                : {}
                <span className={minutes > 0 ? "text-primary" : "text-error"}>
                  {seconds}s
                </span>
              </p>

              <progress
                className="progress w-full progress-success"
                value={width}
                max="100"
              ></progress>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default TestLayout;
