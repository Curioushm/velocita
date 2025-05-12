import { wishlistService } from '../services/WishlistService.js';

export class WishlistComponent {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
        
        wishlistService.subscribe(() => {
            this.render();
        });
    }

    render() {
        const items = wishlistService.getWishlist();
        this.container.innerHTML = `
            <div class="wishlist">
                <h2>My Wishlist (${items.length})</h2>
                ${items.map(item => `
                    <div class="wishlist-item">
                        <span>${item.name}</span>
                        <button onclick="removeFromWishlist(${item.id})">Remove</button>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

window.removeFromWishlist = (productId) => {
    wishlistService.removeItem(productId);
};
