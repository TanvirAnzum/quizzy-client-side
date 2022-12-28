import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PendingTableRow from "../components/quizDetails/PendingTableRow";
import {
  useCreateQuizMutation,
  useFetchQuizzesQuery,
} from "../features/quizzes/quizzesApi";

const QuizCreator = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const state = useSelector((state) => state.auth);
  const { email } = state.user;

  const [mutate, { data: quiz }] = useCreateQuizMutation();

  const { data } = useFetchQuizzesQuery({
    email,
  });

  const submitHandler = (data) => {
    const { title } = data;
    const quizObj = {
      title,
      author: email,
      participants: [],
      contents: [],
      status: "Pending",
      publicAccess: false,
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
    <>
      <form
        className="w-fit flex flex-wrap gap-2 h-[10vh] mx-auto mt-5"
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
      <div className="divide-x w-full di"></div>
      <div className="flex flex-col gap-5 text-center mx-auto mt-4 w-full p-4">
        <h1 className="text-2xl font-semibold text-warning">Pending Quizzes</h1>
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.quizzes?.map((quiz, index) => (
              <PendingTableRow index={index} map={quiz._id} quiz={quiz} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default QuizCreator;
