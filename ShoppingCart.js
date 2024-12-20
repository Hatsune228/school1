class ShoppingCart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    border: 1px solid #ccc;
                    padding: 1rem;
                    width: 300px;
                }
                .cart {
                    display: flex;
                    flex-direction: column;
                }
            </style>
            <div class="cart">
                <h2>Shopping Cart</h2>
                <div class="cart-items"></div>
                <p>Total: <span class="total-price">0</span>₮</p>
            </div>
        `;
        this.cart = new Map(JSON.parse(localStorage.getItem('cart')) || []);
    }

    connectedCallback() {
        this.addEventListener('add-to-cart', this.addToCart.bind(this));
    }

    disconnectedCallback() {
        this.removeEventListener('add-to-cart', this.addToCart.bind(this));
    }

    set products(products) {
        this._products = products;
    }

    get products() {
        return this._products;
    }

    addToCart(event) {
        const { productId } = event.detail;
        const currentCount = this.cart.get(productId) || 0;
        this.cart.set(productId, currentCount + 1);
        localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
        this.render();
    }

    render() {
        const cartItems = this.shadowRoot.querySelector('.cart-items');
        cartItems.innerHTML = '';

        let totalPrice = 0;
        this.cart.forEach((quantity, id) => {
            const product = this._products.get(id);
            totalPrice += product.price * quantity;
            const item = document.createElement('div');
            item.innerHTML = `
                <span>${product.name} x${quantity} = ${product.price * quantity}₮</span>
            `;
            cartItems.appendChild(item);
        });

        this.shadowRoot.querySelector('.total-price').textContent = totalPrice;
    }
}

customElements.define('shopping-cart', ShoppingCart);