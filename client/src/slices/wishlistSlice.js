import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('wishlistItems')) || [],
  itemCount: 0,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (!existingItem) {
        state.items.push(product);
        state.itemCount = state.items.length;
        localStorage.setItem('wishlistItems', JSON.stringify(state.items));
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.itemCount = state.items.length;
      localStorage.setItem('wishlistItems', JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      state.itemCount = 0;
      localStorage.removeItem('wishlistItems');
    }
  }
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
