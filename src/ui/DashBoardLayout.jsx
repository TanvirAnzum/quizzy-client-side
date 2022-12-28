import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const DashBoardLayout = () => {
  const currentTheme = useSelector((state) => state.theme);
  const { theme } = currentTheme;

  const { pathname } = useLocation() || {};

  return (
    <>
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
            <ul className="menu p-4 w-80 bg-base-300 text-base-content gap-1">
              <li>
                <Link
                  to="/user"
                  className={pathname === "/user" ? "active" : ""}
                >
                  Shared Quizzes
                </Link>
              </li>
              <li>
                <Link
                  to="/user/myQuizzes"
                  className={pathname === "/user/myQuizzes" ? "active" : ""}
                >
                  My Quizzes
                </Link>
              </li>
              <li>
                <Link
                  to="/user/createQuiz"
                  className={
                    pathname === "/user/createQuiz" ||
                    pathname.startsWith("/user/quizDetails/")
                      ? "active"
                      : ""
                  }
                >
                  Quiz Creator
                </Link>
              </li>
              <li>
                <Link
                  to="/user/statistics"
                  className={pathname === "/user/statistics" ? "active" : ""}
                >
                  My Statistics
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
};

export default DashBoardLayout;
