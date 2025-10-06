import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../App/AxiosInstance/AxiosInstance";
import en from "../Locals/en";
import ar from "../Locals/ar";

const themeSlice = createSlice({
  name: "handleTheme",
  initialState: "light",
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
});

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
    addToCart: (state, action) => {
      const existing = state.cartItems.find(
        (it) => it.productId === action.payload.productId
      );
      if (existing) {
        existing.quantity = (existing.quantity || 0) + 1;
      } else {
        state.cartItems.push({
          id: action.payload.id || `local-${Date.now()}`,
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
      state.cartItems = state.cartItems.filter(
        (i) => i.id !== action.payload.id
      );
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
});

const searchSlice = createSlice({
  name: "search",
  initialState: {
    keyword: "",
  },
  reducers: {
    setSearch: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export const { toggleLang } = langSlice.actions;
export const { toggleTheme } = themeSlice.actions;
export const { showLoader, hideLoader } = loaderSlice.actions;
export const {
  setCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;
export const { setSearch } = searchSlice.actions;


///////////////////

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriteProducts: [],
    loading: false,
  },
  reducers: {
    setFavorites: (state, action) => {
      state.favoriteProducts = action.payload || [];
    },
    addFavorite: (state, action) => {
      const payload = action.payload;
      const id =
        payload?.id ||
        payload?.productId ||
        (payload?.productId?._id ? payload.productId._id : undefined);
      const exists = state.favoriteProducts.some((p) => {
        const pid = p?.id || p?.productId || (p?.productId?._id ? p.productId._id : undefined);
        return pid == id;
      });
      if (!exists) state.favoriteProducts.push(payload);
    },
    removeFavorite: (state, action) => {
      const id = action.payload;
      state.favoriteProducts = state.favoriteProducts.filter((p) => {
        const pid = p?.id || p?.productId || (p?.productId?._id ? p.productId._id : undefined);
        return pid != id;
      });
    },
    setFavoritesLoading: (state, action) => {
      state.loading = !!action.payload;
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite, setFavoritesLoading } =
  favoritesSlice.actions;

// keep backward-compatible names used in other components
export const addWishlistItem = addFavorite;
export const removeWishlistItem = removeFavorite;


const Store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    myLang: langSlice.reducer,
    myFavorites: favoritesSlice.reducer,
    loader: loaderSlice.reducer,
    cart: cartSlice.reducer,
    search: searchSlice.reducer,
  },
});


export default Store;
