import express from 'express';
import ProductManager from '../productmanager/productmanager.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const manager = new ProductManager('./productos.json');


app.get('/api/products', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await manager.getProducts(limit);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.get('/api/products/:pid', (req, res) => {
  const { pid } = req.params;
  const product = manager.getProductById(pid);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

app.post('/api/products', (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  const id = manager.getMaxId() + 1;
  manager.addProduct(title, description, price, thumbnail, code, stock, id);
  res.status(201).json({ message: 'Producto agregado exitosamente' });
});

app.put('/api/products/:pid', (req, res) => {
  const { pid } = req.params;
  const { title, description, price, thumbnail, code, stock } = req.body;
  manager.updateProduct(pid, { title, description, price, thumbnail, code, stock });
  res.status(200).json({ message: 'Producto actualizado exitosamente' });
});

app.delete('/api/products/:pid', (req, res) => {
  const { pid } = req.params;
  manager.deleteProduct(pid);
  res.status(200).json({ message: 'Producto eliminado exitosamente' });
});


app.post('/api/carts', (req, res) => {
  const cartId = manager.createCart();
  res.status(201).json({ cartId });
});

app.get('/api/carts/:cid', (req, res) => {
  const { cid } = req.params;
  const cart = manager.getCartById(cid);
  if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

app.post('/api/carts/:cid/product/:pid', (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  manager.addProductToCart(cid, pid, quantity);
  res.status(200).json({ message: 'Producto agregado al carrito exitosamente' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});