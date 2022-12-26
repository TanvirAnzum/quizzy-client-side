import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const DashBoardLayout = () => {
  const currentTheme = useSelector((state) => state.theme);
  const { theme } = currentTheme;

  return (
    <div className="w-full min-h-scren bg-base-100 " data-theme={theme}>
      <Navbar />
      <div className="drawer min-h-[100vh] overflow-visible drawer-mobile mt-[10vh]">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-4 gap-2">
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-300 text-base-content">
            <li>
              <Link to="/user">Shared Quizzes</Link>
            </li>
            <li>
              <Link to="/user/myQuizzes">My Quizzes</Link>
            </li>
            <li>
              <Link to="/user/createQuiz">Quiz Creator</Link>
            </li>
            <li>
              <Link to="/user/statistics">My Statistics</Link>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoardLayout;
