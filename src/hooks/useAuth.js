import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";
import { useGetTokenMutation } from "../features/quizzes/quizzesApi";

const useAuth = () => {
  const dispatch = useDispatch();
  const [authStatus, setAuthStatus] = useState(false);
  const auth = getAuth();
  const [getToken, { data }] = useGetTokenMutation();
  if (data) {
    localStorage.setItem("quizzyToken", data.token);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { accessToken, providerData } = user;
        const { email } = providerData[0] || {};
        getToken({ email });
        dispatch(userLoggedIn({ accessToken, user: providerData[0] }));
      }
    });
    setAuthStatus(true);
  }, [auth, dispatch, getToken, setAuthStatus]);

  return authStatus;
};

export default useAuth;
