// eslint-disable-next-line no-unused-vars
import "chart.js/auto";
import React, { useRef } from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
  const ref = useRef();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Quiz Performance Chart",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
      },
      x: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="w-[40em] h-[40em] flex items-center justify-center">
      <Bar ref={ref} data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
