import './ProductItem.js';

class ProductList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .product-list {
                    display: flex;
                    flex-wrap: wrap;
                }
            </style>
            <div class="product-list"></div>
        `;
    }

    set products(products) {
        this._products = products;
        this.render();
    }

    get products() {
        return this._products;
    }

    render() {
        const productList = this.shadowRoot.querySelector('.product-list');
        productList.innerHTML = '';

        this._products.forEach(product => {
            const productItem = document.createElement('product-item');
            productItem.product = product;
            productList.appendChild(productItem);
        });
    }
}

customElements.define('product-list', ProductList);