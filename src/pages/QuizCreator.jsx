import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateQuizMutation } from "../features/quizzes/quizzesApi";

const QuizCreator = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const state = useSelector((state) => state.auth);
  const { email } = state.user;

  const [mutate, { data: quiz }] = useCreateQuizMutation();

  const submitHandler = (data) => {
    const { title } = data;
    const quizObj = {
      title,
      author: email,
      participants: [],
      contents: [],
      status: "Pending",
    };
    mutate(quizObj);
    reset();
  };

  useEffect(() => {
    if (quiz?._id) {
      navigate(`/user/quizDetails/${quiz._id}`);
    }
  }, [navigate, quiz]);

  return (
    <form
      className="w-fit flex flex-wrap gap-2 h-[10vh] mx-auto"
      onSubmit={handleSubmit(submitHandler)}
    >
      <input
        type="text"
        className="input input-bordered"
        placeholder="Quiz Title"
        {...register("title")}
        required
      />
      <button className="btn" type="submit">
        Create Quiz
      </button>
    </form>
  );
};

export default QuizCreator;
