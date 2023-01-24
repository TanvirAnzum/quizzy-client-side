import Aos from "aos";
import "aos/dist/aos.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import useApplyTheme from "./hooks/useApplyTheme";
import useAuth from "./hooks/useAuth";
import router from "./routers/router";
import Layout from "./ui/Layout";
import Spinner from "./ui/Spinner";

function App() {
  const auth = getAuth();
  useApplyTheme();
  useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Aos.init({ duration: 1000, offset: 0, easing: "ease-in-out", once: true });
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      setIsLoading(false);
    });
  }, [auth]);

  return !isLoading ? (
    <RouterProvider router={router}>
      <Layout />
    </RouterProvider>
  ) : (
    <Spinner auth={true} />
  );
}

export default App;
