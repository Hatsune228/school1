export default class Data {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
        this.products = new Map();
    }

    async refreshData() {
        const response = await fetch(this.dataUrl);
        if (response.ok) {
            const result = await response.json();
            result.products.forEach((prod) => {
                this.products.set(prod.id, prod);
            });
        }
        return this.products;
    }
}