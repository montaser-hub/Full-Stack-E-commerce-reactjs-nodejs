// ReduxToolkit/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../App/AxiosInstance/AxiosInstance";

//  Fetch the cart when user loads app
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/carts", { withCredentials: true });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalPrice: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    // Update entire cart (used when syncing with backend)
    setCart: (state, action) => {
      state.cartItems = action.payload.items || [];
      state.totalPrice =
        action.payload.totalPrice ??
        state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    },

    // Local add (backend handles merge on POST)
    addToCart: (state, action) => {
      const existing = state.cartItems.find(
        (it) => it.productId === action.payload.id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({
          id: action.payload.id,
          productId: action.payload.id,
          name: action.payload.title,
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
        (i) => i.productId !== action.payload
      );
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

  // Handle async fetch states
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const data = action.payload;
        state.cartItems = data.items.map((i) => ({
          id: i._id,
          productId: i.productId._id,
          name: i.productId.name,
          price: i.productId.price,
          src: i.productId.images[0],
          quantity: i.quantity,
        }));
        state.totalPrice = data.subTotal;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setCart, addToCart, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
