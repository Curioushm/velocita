import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const EmptyWishlist = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" py={10} px={6}>
      <Text fontSize="xl" mt={3} mb={2}>
        Your wishlist is empty
      </Text>
      <Text color="gray.500" mb={6}>
        Browse our products and add items to your wishlist
      </Text>

      <Button
        colorScheme="blue"
        onClick={() => navigate("/products")}
        bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
        color="white"
        variant="solid"
      >
        Continue Shopping
      </Button>
    </Box>
  );
};

export default EmptyWishlist;
