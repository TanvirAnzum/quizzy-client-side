import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BarChart from "../components/charts/BarChart";
import { useFetchTestQuery } from "../features/quizTests/testsApi";

const Statistics = () => {
  const auth = useSelector((state) => state.auth);
  const [stat, setStat] = useState({});

  const { data, refetch } = useFetchTestQuery({ email: auth?.user?.email });

  useEffect(() => {
    refetch();
    if (data) {
      const tempArr = [];
      data?.map((item) => {
        const { marks, contents, numberPerQuestion, title } = item || {};

        const marksPercentage = (
          (marks * 100) /
          (contents?.length * numberPerQuestion)
        ).toFixed(2);

        const statObj = {
          title,
          marks: marksPercentage,
        };
        tempArr.push(statObj);
        return item;
      });

      setStat({
        labels: tempArr?.map((item) => item.title),
        datasets: [
          {
            label: "Marks in %",
            data: tempArr?.map((item) => item.marks),
            maxBarThickness: 20,
            backgroundColor: "#55efc4",
            borderWidth: 2,
            borderColor: "#00b894",
          },
        ],
      });
    }
  }, [data]);

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center">
      {stat?.labels && <BarChart chartData={stat} />}
    </div>
  );
};

export default Statistics;
