import React from "react";

const Footer = () => {
  return (
    <div className="w-full min-h-[10vh] px-10 flex items-center justify-between bg-base-200">
      <div className="text-xl text-blue-500 font-bold">&copy; Tanvir Anzum</div>
      <div className="flex items-center justify-center gap-4 text-xl text-blue-500">
        <a
          href="https://www.facebook.com/tanvir.sagoto27"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-facebook cursor-pointer hover:animate-bounce"></i>
        </a>
        <a
          href="https://github.com/TanvirAnzum"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-github cursor-pointer hover:animate-bounce"></i>
        </a>
        <a
          href="https://twitter.com/TanvirSagoto"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-twitter cursor-pointer hover:animate-bounce"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
