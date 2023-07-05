import express from 'express';
import ProductManager from '../productmanager/productmanager.js';

const router = express.Router();
const manager = new ProductManager('./productos.json');

router.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await manager.getProducts(limit);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get('/:pid', (req, res) => {
  const { pid } = req.params;
  const product = manager.getProductById(pid);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

router.post('/', (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  const id = manager.getMaxId() + 1;
  manager.addProduct(title, description, price, thumbnail, code, stock, id);
  res.status(201).json({ message: 'Producto agregado exitosamente' });
});

router.put('/:pid', (req, res) => {
  const { pid } = req.params;
  const { title, description, price, thumbnail, code, stock } = req.body;
  manager.updateProduct(pid, { title, description, price, thumbnail, code, stock });
  res.status(200).json({ message: 'Producto actualizado exitosamente' });
});

router.delete('/:pid', (req, res) => {
  const { pid } = req.params;
  manager.deleteProduct(pid);
  res.status(200).json({ message: 'Producto eliminado exitosamente' });
});

export default router;