import './components/ProductList.js';
import './components/ShoppingCart.js';
import Data from './data.js';

class App {
    constructor() {
        this.data = new Data("https://dummyjson.com/products");
        this.init();
    }

    async init() {
        this.products = await this.data.refreshData();
        document.querySelector('product-list').products = this.products;
        document.querySelector('shopping-cart').products = this.products;
    }
}

window.app = new App();