import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Layout = () => {
  const currentTheme = useSelector((state) => state.theme);
  const { theme } = currentTheme;
  const { pathname } = useLocation() || {};
  console.log(pathname);

  return (
    <>
      <ToastContainer />
      <div className="w-full min-h-scren bg-base-100 " data-theme={theme}>
        <Navbar />
        {pathname === "/" && (
          <div
            className={
              pathname === "/user/myQuizzes" || pathname === "/user"
                ? "w-[80%] min-h-[90vh] mx-auto flex flex-col items-center justify-between"
                : "w-[80%] min-h-[90vh] mx-auto flex flex-col items-center justify-center"
            }
          >
            <Outlet />
          </div>
        )}

        {pathname !== "/" && (
          <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
              <div className="w-full navbar bg-base-300">
                <div className="flex-none lg:hidden">
                  <label
                    htmlFor="my-drawer-3"
                    className="btn btn-square btn-ghost"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-6 h-6 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </label>
                </div>
                <div className="flex-1 px-2 mx-2">Navbar Title</div>
                <div className="flex-none hidden lg:block">
                  <ul className="menu menu-horizontal">
                    <li>
                      <a>Navbar Item 1</a>
                    </li>
                    <li>
                      <a>Navbar Item 2</a>
                    </li>
                  </ul>
                </div>
              </div>
              <Outlet />
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
              <ul className="menu p-4 w-80 bg-base-100">
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
              </ul>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Layout;
