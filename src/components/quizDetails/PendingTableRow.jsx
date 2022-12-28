import React from "react";
import { Link } from "react-router-dom";

const PendingTableRow = ({ index, quiz }) => {
  const { title, _id } = quiz || {};
  return (
    <tr className="hover text-center">
      <th>{index + 1}</th>
      <td>{title}</td>
      <td>
        <Link to={`/user/quizDetails/${_id}`} className="btn btn-primary">
          Modify
        </Link>
      </td>
    </tr>
  );
};

export default PendingTableRow;
