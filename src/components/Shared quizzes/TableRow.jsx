import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteQuizMutation } from "../../features/quizzes/quizzesApi";

const TableRow = ({ index, quiz, refetch }) => {
  const { pathname } = useLocation() || {};
  const [link, setLink] = useState("");

  const {
    _id,
    title,
    author,
    status,
    quizDuration,
    numberPerQuestion,
    contents,
    publicAccess,
  } = quiz || {};

  const [mutate] = useDeleteQuizMutation();

  const deleteHandler = () => {
    mutate(_id);
    toast.success("Quiz deleted successfully!");
    refetch();
  };

  const demoUrl = "https://quizzy-ee12c.web.app/";

  useEffect(() => {
    fetch(
      `https://api.shrtco.de/v2/shorten?url=${demoUrl}/test/${publicAccess}/start/${_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLink(data.result.full_short_link);
      });
  }, [_id]);

  return (
    <tr className="hover text-center">
      <th>{index + 1}</th>
      <td>{title}</td>
      <td>{author}</td>
      <td>{status}</td>
      <td>{(contents.length * numberPerQuestion).toFixed(2)}</td>
      <td>{quizDuration}</td>
      <td>{publicAccess}</td>
      <td>
        {pathname === "/user/myQuizzes" && (
          <button className="btn btn-error" onClick={deleteHandler}>
            Delete
          </button>
        )}
        {pathname === "/user" && (
          <Link
            to={
              publicAccess === "private"
                ? `/test/private/start/${_id}`
                : `/test/public/start/${_id}`
            }
            className="btn btn-primary"
          >
            Start
          </Link>
        )}
      </td>
      <CopyToClipboard text={link}>
        <td
          className="text-blue-500 cursor-pointer"
          onClick={() => toast.success("Link copied to clipboard!")}
        >
          Link
        </td>
      </CopyToClipboard>
    </tr>
  );
};

export default TableRow;
