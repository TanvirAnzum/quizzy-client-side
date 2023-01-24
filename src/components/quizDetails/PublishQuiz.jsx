import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { useUpdateQuizMutation } from "../../features/quizzes/quizzesApi";

const PublishQuiz = ({ quiz }) => {
  const { _id, status, publicAccess } = quiz || {};

  const [update] = useUpdateQuizMutation();

  const [link, setLink] = useState("");

  const publishHandler = () => {
    update({
      id: _id,
      status: "published",
    });
    toast.success("Quiz published successfully!");
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

  const toastHandler = () => {
    toast.success("Link copied to clipboard!");
  };

  return (
    <div>
      {status === "published" && (
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold text-success">Quiz Published</h1>
          <CopyToClipboard text={link}>
            <button
              className="mt-3 btn btn-md btn-success w-fit"
              onClick={toastHandler}
            >
              Get Sharable Link
            </button>
          </CopyToClipboard>
          <button className="btn btn-md btn-error w-fit">Delete Quiz</button>
        </div>
      )}
      {status !== "published" && (
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold text-success">
            Quiz is yet to be published!
          </h1>
          <p className="text-md font-semibold text-warning">
            Nb: You can't unpublish quiz after publishing. You can't modify
            them. Only deletion is allowed.
          </p>
          <button className="mt-3 btn btn-md w-fit" onClick={publishHandler}>
            Publish
          </button>
        </div>
      )}
    </div>
  );
};

export default PublishQuiz;
