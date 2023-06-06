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

    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (product) {
            return product;
        } else {
            console.log("Producto no encontrado");
            return null;
        }
    }

    getMaxId() {
        let maxId = 0;
        this.products.map((product) => {
            if (product.id > maxId) {
                maxId = product.id;
            }
        });

        return maxId;
    }
}






