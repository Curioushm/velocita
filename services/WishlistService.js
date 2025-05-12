class WishlistService {
    constructor() {
        this.wishlist = [];
        this.listeners = [];
    }

    addItem(product) {
        if (!this.wishlist.find(item => item.id === product.id)) {
            this.wishlist.push(product);
            this.notifyListeners();
        }
    }

    removeItem(productId) {
        this.wishlist = this.wishlist.filter(item => item.id !== productId);
        this.notifyListeners();
    }

    getWishlistCount() {
        return this.wishlist.length;
    }

    getWishlist() {
        return this.wishlist;
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notifyListeners() {
        this.listeners.forEach(listener => listener(this.wishlist));
    }
}

export const wishlistService = new WishlistService();
