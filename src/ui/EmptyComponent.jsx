import React from "react";

const EmptyComponent = ({ message }) => {
  return (
    <div className="w-full h-fit flex items-center justify-center">
      <p className="text-center font-semibold text-xl text-warning">
        {message}
      </p>
    </div>
  );
};

export default EmptyComponent;
