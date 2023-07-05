import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import routesProducts from './routes/routesProducts.js';
import viewsRouter from './routes/viewsRouter.js';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 8080;

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('productCreated', () => {
    socket.emit('productAdded');
  });

  socket.on('productDeleted', () => {
    socket.emit('productRemoved');
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', routesProducts);
app.use('/', viewsRouter);

server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});