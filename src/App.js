import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { Watch } from "react-loader-spinner";
import { RouterProvider } from "react-router-dom";
import useApplyTheme from "./hooks/useApplyTheme";
import useAuth from "./hooks/useAuth";
import router from "./routers/router";
import Layout from "./ui/Layout";

function App() {
  const auth = useAuth();
  const theme = useApplyTheme();

  useEffect(() => {
    Aos.init({ duration: 1000, offset: 0, easing: "ease-in-out", once: true });
  }, []);

  return auth ? (
    <RouterProvider router={router}>
      <Layout />
    </RouterProvider>
  ) : (
    <div
      className="h-screen w-full flex flex-row items-center justify-center"
      data-theme={theme}
    >
      <Watch
        height="80"
        width="80"
        radius="48"
        color="#4fa94d"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
      <h1>Checking Authentication...</h1>
    </div>
  );
}

export default App;
