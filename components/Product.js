import { wishlistService } from '../services/WishlistService.js';

export class ProductComponent {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
    }

    addToWishlist(product) {
        wishlistService.addItem(product);
    }

    render() {
        this.container.innerHTML = `
            <div class="product">
                <button onclick="handleAddToWishlist()">Add to Wishlist</button>
            </div>
        `;
    }
}

window.handleAddToWishlist = () => {
    const product = {
        id: Date.now(),
        name: 'Sample Product'
    };
    wishlistService.addItem(product);
};
