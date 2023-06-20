import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            console.log('Error al cargar los productos:', error.message);
            this.products = [];
        }
    }

    saveProducts() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, data);
            console.log('Productos guardados exitosamente.');
        } catch (error) {
            console.log('Error al guardar los productos:', error.message);
        }
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
        this.saveProducts();
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (product) {
            return product;
        } else {
            console.log("Producto no encontrado.");
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

    updateProduct(id, newData) {
        const product = this.products.find((product) => product.id === id);
        if (product) {
            Object.assign(product, newData);
            this.saveProducts();
            console.log('Producto actualizado exitosamente.');
        } else {
            console.log('Producto no encontrado.');
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            console.log('Producto eliminado exitosamente.');
        } else {
            console.log('Producto no encontrado.');
        }
    }
}

const manager = new ProductManager('./productos.json');

manager.addProduct('Cómoda americana', 'Medidas:1,40m de ancho,79cm de alto y 45cm de profundidad.', 12500, '../src/assets/img/comoda.jpg', 'D43236', 4, 1);
manager.addProduct('Mesas de luz americanas', 'Medidas:50cm de ancho,60cm de alto y 42de profundidad.', 9000, '../src/assets/img/mesitasazul.jpeg', 'J54888', 13, 2);
manager.addProduct('Cómoda degrade', 'Medidas:76cm de ancho,94cm de alto y 40cm de profundidad.', 12000, '../src/assets/img/comodadegrade-min.jpeg', 'Z35653', 10, 3);
manager.addProduct('Espejo francés blanco', 'Medidas:1,00m de ancho,70cm de alto.', 4000, '../src/assets/img/espejo.jpg', 'B43978', 9, 4);
manager.addProduct('Juego de comedor americano', 'Medidas:1,30m de ancho, 90cm de alto.', 30000, '../src/assets/img/juegoamericano.jpg', 'O99000', 5, 5);

export default ProductManager;