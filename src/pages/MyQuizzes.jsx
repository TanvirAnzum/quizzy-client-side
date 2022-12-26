import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TableRow from "../components/Shared quizzes/TableRow";
import { useFetchQuizzesQuery } from "../features/quizzes/quizzesApi";

const MyQuizzes = () => {
  // for paginate
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);

  //   user information
  const state = useSelector((state) => state.auth);
  const { email } = state.user;

  const { data, refetch } = useFetchQuizzesQuery({
    email,
    page,
    limit,
  });

  const { quizzes, totalCount } = data || {};

  useEffect(() => {
    if (limit <= 0 || !totalCount) return;
    const maxPage = Math.ceil(totalCount / limit);
    setPageCount(maxPage);

    refetch({ email, page, limit });
  }, [email, limit, refetch, page, totalCount]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Marks</th>
              <th>Duration</th>
              <th>Deadline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {quizzes?.map((quiz, index) => (
              <TableRow index={index} map={quiz.id} quiz={quiz} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="border rounded-xl mt-4 min-h-[2em] text-xl w-full flex items-start justify-between p-2 font-bold bg-slate-200">
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
    </>
  );
};

export default MyQuizzes;
