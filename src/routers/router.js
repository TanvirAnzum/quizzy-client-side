import { createBrowserRouter } from "react-router-dom";
import TestQuestion from "../components/quiztest/TestQuestion";
import FrontPage from "../pages/FrontPage";
import Login from "../pages/Login";
import MyQuizzes from "../pages/MyQuizzes";
import QuizCreator from "../pages/QuizCreator";
import QuizDetails from "../pages/QuizDetails";
import Registration from "../pages/Registration";
import SharedQuizzes from "../pages/SharedQuizzes";
import StartTest from "../pages/StartTest";
import Statistics from "../pages/Statistics";
import TestResult from "../pages/TestResult";
import DashBoardLayout from "../ui/DashBoardLayout";
import Layout from "../ui/Layout";
import TestLayout from "../ui/TestLayout";
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
    ],
  },
  {
    path: "/test",
    element: <TestLayout />,
    children: [
      {
        path: "/test/private/:quizId",
        element: (
          <PrivateRoute>
            <TestQuestion />
          </PrivateRoute>
        ),
      },

      {
        path: "/test/public/:quizId",
        element: <TestQuestion />,
      },
    ],
  },
  {
    path: "/test/public/start/:quizId",
    element: <StartTest />,
  },
  {
    path: "/test/private/start/:quizId",
    element: (
      <PrivateRoute>
        <StartTest />
      </PrivateRoute>
    ),
  },
  {
    path: "test/finished/:testId",
    element: <TestResult />,
  },
]);

export default router;
