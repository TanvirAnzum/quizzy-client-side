import React from "react";

const ErrorComponent = ({ message }) => {
  return (
    <div className="w-full h-fit flex items-center justify-center">
      <p className="text-center font-semibold text-xl text-error">{message}</p>
    </div>
  );
};

export default ErrorComponent;
