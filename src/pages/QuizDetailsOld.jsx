import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import QuizItemModal from "../components/QuizItemModal";
import { isValidUser } from "../features/firebase/firebaseConfig";
import {
  useFetchQuizQuery,
  useUpdateQuizMutation,
} from "../features/quizzes/quizzesApi";
import Spinner from "../ui/Spinner";
import isValidEmail from "../util/isValidEmail";

const QuizDetails = () => {
  const [quizItemModal, setQuizItemModal] = useState(false);
  const { quizId } = useParams() || {};
  const {
    data: quiz,
    isError,
    isLoading,
    error: getError,
  } = useFetchQuizQuery(quizId);
  const {
    title,
    author,
    participants,
    contents,
    negativeMarking,
    quizDuration,
    publicAccess,
    numberPerQuestion,
  } = quiz || {};

  console.log(quiz);

  // new participants handling

  const [participantInput, setParticipantInput] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);

  // shareable link
  const [link, setLink] = useState("");

  // mutation hook
  const [update] = useUpdateQuizMutation();

  // debounce handler

  const doChange = async (e) => {
    setError("");
    setParticipantInput(e.target.value);
  };

  const debounce = (fn, duration) => {
    let timeOut;

    return function (...args) {
      if (timeOut) clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        fn(...args);
      }, duration);
    };
  };

  const handleChange = debounce(doChange, 500);

  useEffect(() => {
    const emailCheck = isValidEmail(participantInput);
    if (emailCheck) {
      isValidUser(participantInput).then((response) => {
        if (response) {
          setError("");
          setDisabled(false);
        } else {
          setError("User Not Found");
          setDisabled(true);
        }
      });
    } else {
      setDisabled(true);
    }
  }, [participantInput]);

  // quiz rules form

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // get details from quiz details form

  const setDetails = (data) => {
    update({
      id: quizId,
      ...data,
    });
    reset();
    // console.log(link);
  };

  // add participants

  const addParticipant = () => {
    const participantObj = {
      id: quizId,
      participants: participantInput,
    };
    update(participantObj);
  };

  // link shortener

  // useEffect(() => {
  //   fetch(
  //     `https://api.shrtco.de/v2/shorten?url=${process.env.REACT_APP_API_URL}test/${quizId}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setLink(data.result.full_short_link));
  // }, [quizId]);

  // contents,errors, loading handling

  let content;

  if (isLoading) content = <Spinner />;
  if (!isLoading && isError) content = <div>{getError}</div>;
  if (!isLoading && !isError) content = <></>;
  return (
    <>
      <div className="w-full  min-h-fit mt-[14vh] flex items-start justify-between mb-[2em]">
        {content}
      </div>
      {quizItemModal && <QuizItemModal setQuizItemModal={setQuizItemModal} />}
    </>
  );
};

export default QuizDetails;
