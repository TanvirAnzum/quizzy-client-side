import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "emerald",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "emerald" ? "night" : "emerald";
      localStorage.setItem("theme", state.theme);
    },
    getTheme: (state) => {
      const currentTheme = localStorage.getItem("theme");
      if (currentTheme) {
        state.theme = currentTheme;
      }
    },
  },
});

export const { getTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
