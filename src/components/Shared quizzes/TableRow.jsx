import React from "react";
import { Link } from "react-router-dom";

const TableRow = ({ index, quiz }) => {
  const {
    _id,
    title,
    author,
    status,
    quizDuration,
    numberPerQuestion,
    contents,
    deadline,
  } = quiz || {};
  return (
    <tr className="hover text-center">
      <th>{index + 1}</th>
      <td>{title}</td>
      <td>{author}</td>
      <td>{status}</td>
      <td>{(contents.length * numberPerQuestion).toFixed(2)}</td>
      <td>{quizDuration}</td>
      <td>{deadline}</td>
      <td>
        <Link to={`/user/quizDetails/${_id}`} className="btn btn-primary">
          Start
        </Link>
      </td>
    </tr>
  );
};

export default TableRow;
