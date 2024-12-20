class ProductItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    border: 1px solid #ccc;
                    margin: 1rem;
                    padding: 1rem;
                    width: 200px;
                }
                .product {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .product img {
                    width: 100px;
                    height: 100px;
                }
                button {
                    margin-top: 1rem;
                }
            </style>
            <div class="product">
                <img src="" alt="">
                <h2></h2>
                <p></p>
                <button>Add to Cart</button>
            </div>
        `;
    }

    set product(product) {
        this._product = product;
        this.render();
    }

    get product() {
        return this._product;
    }

    render() {
        this.shadowRoot.querySelector('img').src = this._product.thumbnail;
        this.shadowRoot.querySelector('h2').textContent = this._product.name;
        this.shadowRoot.querySelector('p').textContent = `${this._product.price}₮`;
        this.shadowRoot.querySelector('button').onclick = () => {
            this.dispatchEvent(new CustomEvent('add-to-cart', {
                detail: { productId: this._product.id },
                bubbles: true,
                composed: true
            }));
        };
    }
}

customElements.define('product-item', ProductItem);


class ProductItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                    border: 1px solid #ccc;
                    margin: 1rem;
                    padding: 1rem;
                    width: 200px;
                }
                .product {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .product img {
                    width: 100px;
                    height: 100px;
                }
                button {
                    margin-top: 1rem;
                }
            </style>
            <div class="product">
                <slot name="image"><img src="" alt=""></slot>
                <slot name="name"><h2></h2></slot>
                <slot name="price"><p></p></slot>
                <button>Add to Cart</button>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

//    ProductItem.js templete bolon slot bolgoj ashiglah 
    set product(product) {
        this._product = product;
        this.render();
    }

    get product() {
        return this._product;
    }

    render() {
        this.shadowRoot.querySelector('img').src = this._product.thumbnail;
        this.shadowRoot.querySelector('h2').textContent = this._product.name;
        this.shadowRoot.querySelector('p').textContent = `${this._product.price}₮`;
        this.shadowRoot.querySelector('button').onclick = () => {
            this.dispatchEvent(new CustomEvent('add-to-cart', {
                detail: { productId: this._product.id },
                bubbles: true,
                composed: true
            }));
        };
    }
}

customElements.define('product-item', ProductItem);