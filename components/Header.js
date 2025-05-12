import { wishlistService } from '../services/WishlistService.js';

export class HeaderComponent {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.render();
        
        wishlistService.subscribe(() => {
            this.updateWishlistCount();
        });
    }

    updateWishlistCount() {
        const countElement = this.container.querySelector('.wishlist-count');
        if (countElement) {
            countElement.textContent = wishlistService.getWishlistCount();
        }
    }

    render() {
        this.container.innerHTML = `
            <div class="header">
                <span class="wishlist-icon">❤️ (<span class="wishlist-count">0</span>)</span>
            </div>
        `;
    }
}
