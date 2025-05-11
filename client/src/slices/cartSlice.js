import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + quantity, product.countInStock || 10);
      } else {
        state.items.push({ ...product, quantity });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    },
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },
  }
});

export const { addToCart, updateQuantity, removeFromCart, clearCart, updateCartQuantity } = cartSlice.actions;
export default cartSlice.reducer;
