import { createSlice } from "@reduxjs/toolkit";

const MAX_COMPARE = 3;

const compareSlice = createSlice({
  name: "shopCompare",
  initialState: {
    compareItems: [], // array of full product objects
  },
  reducers: {
    addToCompare: (state, action) => {
      const product = action.payload;
      const alreadyIn = state.compareItems.find((p) => p._id === product._id);
      if (!alreadyIn && state.compareItems.length < MAX_COMPARE) {
        state.compareItems.push(product);
      }
    },
    removeFromCompare: (state, action) => {
      state.compareItems = state.compareItems.filter(
        (p) => p._id !== action.payload,
      );
    },
    clearCompare: (state) => {
      state.compareItems = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } =
  compareSlice.actions;
export default compareSlice.reducer;
