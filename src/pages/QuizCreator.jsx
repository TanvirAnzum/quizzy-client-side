import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PendingTableRow from "../components/quizDetails/PendingTableRow";
import {
  useCreateQuizMutation,
  useFetchQuizzesQuery,
} from "../features/quizzes/quizzesApi";
import EmptyComponent from "../ui/EmptyComponent";
import ErrorComponent from "../ui/ErrorComponent";
import Spinner from "../ui/Spinner";

const QuizCreator = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const state = useSelector((state) => state.auth);
  const { email } = state.user;

  const [mutate, { data: quiz }] = useCreateQuizMutation();

  const { data, isError, isLoading, error, refetch } = useFetchQuizzesQuery({
    email,
    status: "pending",
  });

  const submitHandler = (data) => {
    const { title } = data;
    const quizObj = {
      title,
      author: email,
      participants: [],
      contents: [],
      status: "pending",
      publicAccess: "public",
      numberPerQuestion: "1",
      negativeMarking: "0",
      quizDuration: "10",
    };
    mutate(quizObj);
    toast.success("Quiz created successfully!");
    reset();
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (quiz?._id) {
      refetch();
      navigate(`/user/quizDetails/${quiz._id}`);
    }
  }, [navigate, quiz, refetch]);

  let content;

  if (isLoading && !isError) content = <Spinner />;
  else if (!isLoading && isError)
    content = <ErrorComponent message={error?.data?.message} />;
  else if (!isLoading && !isError && !data?.quizzes?.length)
    content = (
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
        <div className="divide-x w-full"></div>
        <EmptyComponent message={"You haven't any pending quizzes!"} />
      </>
    );
  else if (!isLoading && !isError && data?.quizzes?.length > 0)
    content = (
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
        <div className="divide-x w-full"></div>
        <div className="flex flex-col gap-5 text-center mx-auto mt-4 w-full p-4">
          <h1 className="text-2xl font-semibold text-warning">
            Pending Quizzes
          </h1>
          <table className="table w-full">
            <thead>
              <tr className="text-center">
                <th></th>
                <th>Title</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {data?.quizzes?.map((quiz, index) => (
                <PendingTableRow
                  index={index}
                  key={quiz._id}
                  quiz={quiz}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  return content;
};

export default QuizCreator;
