import { useSelector } from "react-redux";

const useCheckAuth = () => {
  const auth = useSelector((state) => state.auth);

  if (auth?.accessToken) return true;
  else return false;
};

export default useCheckAuth;
