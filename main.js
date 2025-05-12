import { HeaderComponent } from './components/Header.js';
import { WishlistComponent } from './components/Wishlist.js';
import { ProductComponent } from './components/Product.js';

document.addEventListener('DOMContentLoaded', () => {
    new HeaderComponent('header-container');
    new WishlistComponent('wishlist-container');
    new ProductComponent('product-container');
});
