import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  itemCount: 0,
  total: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
      
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
