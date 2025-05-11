import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromWishlist } from '../redux/features/wishlistSlice';

const Wishlist = () => {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (item: any) => {
    dispatch(removeFromWishlist(item));
  };

  return (
    <div>
      <h2>Wishlist</h2>
      {wishlistItems.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => handleRemoveFromWishlist(item)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
