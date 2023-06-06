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
            id: this.#getMaxId() + 1,
        };
        this.products.push(product);
    }

    #getMaxId() {
        let maxId = 0;
        this.products.map((product) => {
        if (product.id > maxId) maxId = product.id;
                
        });

    return maxId;
}
    getProduct(){
        return this.products;
    }
}