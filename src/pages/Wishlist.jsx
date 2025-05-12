import { Box } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import EmptyWishlist from "../components/EmptyWishlist";
import WishlistItem from "../components/WishlistItem";
// Fix import path
import { removeFromWishlist, clearWishlist } from '../store/wishlistSlice';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const dispatch = useDispatch();
  // Add null check and default empty array
  const wishlistItems = useSelector((state) => state?.wishlist?.items || []);

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
    toast.success('Item removed from wishlist');
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    toast.success('Wishlist cleared');
  };

  if (wishlistItems.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <Box p={4}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Wishlist ({wishlistItems.length})</h1>
        {wishlistItems.length > 0 && (
          <button
            onClick={handleClearWishlist}
            className="text-red-500 hover:text-red-600"
          >
            Clear Wishlist
          </button>
        )}
      </div>
      {wishlistItems.map((item) => (
        <WishlistItem 
          key={item.id} 
          item={item} 
          onRemove={() => handleRemoveFromWishlist(item.id)}
        />
      ))}
    </Box>
  );
};

export default Wishlist;
