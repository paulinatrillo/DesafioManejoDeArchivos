import express from 'express';
import routesProducts from './routes/routesProducts.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', routesProducts);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});