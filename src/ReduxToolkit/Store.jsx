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
// Favorites
const initialState = {
  favoriteProducts: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const productExists = state.favoriteProducts.some(
        (product) => product.id === action.payload.id
      );
      if (!productExists) {
        state.favoriteProducts.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favoriteProducts = state.favoriteProducts.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;


const Store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    myLang: langSlice.reducer,
    myFavorites: favoritesSlice.reducer,
  },
});


export default Store;
