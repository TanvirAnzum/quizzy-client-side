import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteQuizMutation } from "../../features/quizzes/quizzesApi";

const PendingTableRow = ({ index, quiz, refetch }) => {
  const { title, _id } = quiz || {};

  const [mutate] = useDeleteQuizMutation();

  return (
    <tr className="hover text-center">
      <th>{index + 1}</th>
      <td>{title}</td>
      <td>
        <Link to={`/user/quizDetails/${_id}`} className="btn btn-primary">
          Modify
        </Link>
      </td>
      <td>
        <button
          className="btn btn-error"
          onClick={() => {
            mutate(_id);
            refetch();
            toast.success("Quiz deleted successfully!");
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default PendingTableRow;
