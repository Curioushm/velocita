import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import EmptyWishlist from "../components/EmptyWishlist";
import WishlistItem from "../components/WishlistItem";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.items);

  if (wishlist.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <Box p={4}>
      {wishlist.map((item) => (
        <WishlistItem key={item.id} item={item} />
      ))}
    </Box>
  );
};

export default Wishlist;
