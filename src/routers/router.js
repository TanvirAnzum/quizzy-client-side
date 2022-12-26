import { createBrowserRouter } from "react-router-dom";
import FrontPage from "../pages/FrontPage";
import Login from "../pages/Login";
import MyQuizzes from "../pages/MyQuizzes";
import QuizCreator from "../pages/QuizCreator";
import QuizDetails from "../pages/QuizDetails";
import QuizTest from "../pages/QuizTest";
import Registration from "../pages/Registration";
import SharedQuizzes from "../pages/SharedQuizzes";
import Statistics from "../pages/Statistics";
import DashBoardLayout from "../ui/DashBoardLayout";
import Layout from "../ui/Layout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Registration />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <PublicRoute>
            <FrontPage />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "/user",
    element: <DashBoardLayout />,
    children: [
      {
        path: "/user",
        element: (
          <PrivateRoute>
            <SharedQuizzes />
          </PrivateRoute>
        ),
      },
      {
        path: "/user/myQuizzes",
        element: (
          <PrivateRoute>
            <MyQuizzes />
          </PrivateRoute>
        ),
      },

      {
        path: "/user/createQuiz",
        element: (
          <PrivateRoute>
            <QuizCreator />
          </PrivateRoute>
        ),
      },
      {
        path: "/user/statistics",
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "/user/quizDetails/:quizId",
        element: (
          <PrivateRoute>
            <QuizDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "user/test/:quizId",
        element: (
          <PrivateRoute>
            <QuizTest />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
