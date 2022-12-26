import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "../features/theme/themeSlice";

const useApplyTheme = () => {
  const dispatch = useDispatch();
  dispatch(getTheme());
  const theme = useSelector((state) => state.theme);
  return theme.theme;
};

export default useApplyTheme;
