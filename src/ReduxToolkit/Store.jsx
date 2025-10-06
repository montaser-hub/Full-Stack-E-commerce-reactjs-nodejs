// action, reducer , store
import { configureStore, createSlice } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
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

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    isLoading: false,
  },
  reducers: {
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
  },
} );

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalPrice: 0,
  },
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload.items || [];
      state.totalPrice =
        action.payload.totalPrice ??
        state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    },
    addToCart: ( state, action ) => {
      const existing = state.cartItems.find(
        (it) => it.productId === action.payload.id
      );
      if (existing) {
        existing.quantity = (existing.quantity || 0) + 1;
      } else {
        state.cartItems.push({
          id: action.payload.id,
          productId: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          image: action.payload.image,
          quantity: 1,
        });
      }
      state.totalPrice = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id  !== action.payload.id );
      state.totalPrice = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },
    updateQuantity: (state, action) => {
      const item = state.cartItems.find(
        (i) => i.productId === action.payload.productId
      );
      if (item) item.quantity = action.payload.quantity;
      state.totalPrice = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
} );

const searchSlice = createSlice( {
  name: "search",
  initialState: {
    keyword: "",
  },
  reducers: {
    setSearch: (state, action) => {
      state.keyword = action.payload;
    },
  }
})

export const { toggleLang } = langSlice.actions; // button click -> action dispatch
export const { toggleTheme } = themeSlice.actions; // button click -> action dispatch
export const { showLoader, hideLoader } = loaderSlice.actions;
export const { setCart, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const { setSearch } = searchSlice.actions

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
    loader: loaderSlice.reducer,
    cart: cartReducer,
    search: searchSlice.reducer
  },
});

export default Store;
