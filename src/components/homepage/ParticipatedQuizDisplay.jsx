import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchParticipatedQuizzesQuery } from "../../features/quizzes/quizzesApi";
import QuizItem from "./QuizItem";

const ParticipatedQuizDisplay = () => {
  // for paginate
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);

  //   user information
  const state = useSelector((state) => state.auth);
  const { email } = state.user;

  const { data: participatedQuizzes, refetch: participatedRefetch } =
    useFetchParticipatedQuizzesQuery({ email, page, limit });

  const { quizzes, totalCount } = participatedQuizzes || {};

  useEffect(() => {
    if (limit <= 0 || !totalCount) return;
    const maxPage = Math.ceil(totalCount / limit);
    setPageCount(maxPage);

    participatedRefetch({ email, page, limit });
  }, [email, limit, page, participatedRefetch, totalCount]);

  return (
    <div className="w-full">
      <div className="p-5 w-full">
        <div className="border border-slate-700 rounded-t-xl  min-h-[2em] text-xl w-full flex items-center justify-between p-2 font-bold bg-slate-200">
          <p>Created Quizzes</p>
        </div>
        {quizzes?.map((quiz) => (
          <QuizItem quizItem={quiz} participants={true} />
        ))}
        <div className="border border-t-0 border-slate-700 rounded-b-xl  min-h-[2em] text-xl w-full flex items-start justify-between p-2 font-bold bg-slate-200">
          <p>Total Quizzes: {quizzes?.length}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <label className="font-normal text-sm">Items per page: </label>
              <input
                type="number"
                id="limitPerPage"
                className="w-[3em] rounded h-[2em] bg-inherit px-1"
                max={20}
                min={0}
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              />
            </div>
            <div className="btn-group">
              {[...Array(pageCount)]?.map((item, index) => {
                return (
                  <button
                    className={page === index ? "btn btn-active" : "btn"}
                    onClick={() => setPage(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipatedQuizDisplay;
