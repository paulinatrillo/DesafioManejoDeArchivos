class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock, id) {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id,
        };
        this.products.push(product);
    }
}