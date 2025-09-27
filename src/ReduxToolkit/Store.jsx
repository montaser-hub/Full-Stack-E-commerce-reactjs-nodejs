// action, reducer , store
import { configureStore, createSlice } from "@reduxjs/toolkit";
import en from "../Locals/en";
import ar from "../Locals/ar";

const themeSlice = createSlice({
  name: "handleTheme", // type of action
  initialState: "light", // initial state
  reducers: {
    toggleTheme: (state) => (state === "light" ? "dark" : "light"),
  },
});


const langSlice = createSlice({
  name: "handleLang",
  initialState: {
    lang: "en",
    content: en,
  },
  reducers: {
    toggleLang: (state) => {
      if (state.lang === "en") {
        state.lang = "ar";
        state.content = ar;
      } else {
        state.lang = "en";
        state.content = en;
      }
    },
  },
});

export const { toggleLang } = langSlice.actions; // button click -> action dispatch
export const { toggleTheme } = themeSlice.actions; // button click -> action dispatch

const Store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    myLang: langSlice.reducer,
  },
});

export default Store;
