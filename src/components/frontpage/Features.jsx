import React from "react";

const Features = () => {
  return (
    <div className="w-full p-2 flex flex-col md:flex-row items-center justify-center md:justify-around min-h-[80vh]">
      <div
        data-aos="fade-left"
        className="w-full md:w-1/4 min-h-[24em] flex flex-col items-center justify-center gap-3"
      >
        <div className="ring ring-green-300 w-[10em] h-[10em] bg-green-200 rounded-full flex items-center justify-center">
          <img
            src="https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/100/000000/external-Quiz-school-smashingstocks-flat-smashing-stocks.png"
            alt=""
          />
        </div>

        <h1 className="text-2xl font-bold ">Create</h1>
        <p className="text-md text-center font-medium font-serif">
          Quickly create great looking tests using multiple question types and
          formatting options.
        </p>
      </div>
      <div
        data-aos="fade-left"
        data-aos-delay="200"
        className="w-full md:w-1/4 h-[24em] flex flex-col items-center justify-center gap-3"
      >
        <div className="ring ring-green-300 w-[10em] h-[10em] bg-green-200 rounded-full flex items-center justify-center">
          <img
            src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/100/000000/external-upload-web-flaticons-lineal-color-flat-icons-7.png"
            alt=""
          />
        </div>

        <h1 className="text-2xl font-bold ">Publish</h1>
        <p className="text-md text-center font-medium  font-serif">
          Tests can either be published privately to a select group or open them
          up to everyone with a single link and registration page.
        </p>
      </div>
      <div
        data-aos="fade-left"
        data-aos-delay="400"
        className="w-full md:w-1/4 h-[24em] flex flex-col items-center justify-center gap-3"
      >
        <div className="ring ring-green-300 w-[10em] h-[10em] bg-green-200 rounded-full flex items-center justify-center">
          <img
            src="https://img.icons8.com/external-flat-berkahicon/100/000000/external-analyze-survey-flat-berkahicon.png"
            alt=""
          />
        </div>

        <h1 className="text-2xl font-bold ">Analyze</h1>
        <p className="text-md text-center font-medium  font-serif">
          Quizzy instantly marks and grades your tests. Powerful reports then
          allow you to perform in-depth analysis across all responses.
        </p>
      </div>
    </div>
  );
};

export default Features;
