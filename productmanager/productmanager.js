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

  addProduct(product) {
    const productId = this.generateProductId();
    const newProduct = {
      id: productId,
      ...product,
    };
    this.products.push(newProduct);
    this.saveProducts();
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    return product;
  }

  updateProduct(id, updatedProduct) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      Object.assign(product, updatedProduct);
      this.saveProducts();
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
    }
  }

  createCart(cart) {
    const cartsData = this.readDataFromFile('carrito.json');
    cartsData.carts.push(cart);
    this.writeDataToFile('carrito.json', cartsData);
  }

  getCartById(id) {
    const cartsData = this.readDataFromFile('carrito.json');
    const cart = cartsData.carts.find((cart) => cart.id === id);
    return cart;
  }

  addProductToCart(cartId, productId, quantity) {
    const cartsData = this.readDataFromFile('carrito.json');
    const cart = cartsData.carts.find((cart) => cart.id === cartId);
    if (cart) {
      const existingProduct = cart.products.find((product) => product.product === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
      this.writeDataToFile('carrito.json', cartsData);
    }
  }

  readDataFromFile(filename) {
    const data = fs.readFileSync(filename, 'utf-8');
    return JSON.parse(data);
  }

  writeDataToFile(filename, data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filename, jsonData);
  }

  generateProductId() {
    let maxId = 0;
    for (const product of this.products) {
      if (product.id > maxId) {
        maxId = product.id;
      }
    }
    return maxId + 1;
  }

  generateCartId() {
    const cartsData = this.readDataFromFile('carrito.json');
    let maxId = 0;
    for (const cart of cartsData.carts) {
      if (cart.id > maxId) {
        maxId = cart.id;
      }
    }
    return maxId + 1;
  }
}

export default ProductManager;