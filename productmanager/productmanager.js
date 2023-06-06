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

const manager = new ProductManager();

manager.addProduct("Producto 1", "Descripción 1", 16, "imagen1.jpg", "D43236", 4, 1);
manager.addProduct("Producto 2", "Descripción 2", 44, "imagen2.jpg", "J54888", 1, 2);
manager.addProduct("Producto 3", "Descripción 3", 18, "imagen3.jpg", "Z35653", 10, 3);
manager.addProduct("Producto 4", "Descripción 4", 22, "imagen4.jpg", "B43978", 9, 4);
manager.addProduct("Producto 5", "Descripción 5", 18, "imagen5.jpg", "O99000", 5, 5);

console.log(manager.products);




