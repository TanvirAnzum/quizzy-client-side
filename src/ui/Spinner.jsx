import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";

const Spinner = () => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] z-[98]"></div>
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 items-center justify-center z-[100]">
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </div>
    </>
  );
};

export default Spinner;
