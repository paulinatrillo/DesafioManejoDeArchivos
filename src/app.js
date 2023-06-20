import express from 'express';
import ProductManager from '../productmanager/productmanager.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const manager = new ProductManager('./productos.json');

app.get('/products', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await manager.getProducts(limit);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.get('/products/:pid', (req, res) => {
  const { pid } = req.params;
  const product = manager.getProductById(pid);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});