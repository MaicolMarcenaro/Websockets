import http from 'http';
import { Server } from 'socket.io';
import { ProductManager } from './ProductManager.js';

import app from './app.js';

const server = http.createServer(app);
const io = new Server(server);
const PORT = 8080;
const classProducts = new ProductManager("./products.json")

let products = classProducts.getProductsPlain()

io.on('connection', (clienteSocket) => {
  console.log(`Nuevo cliente conectado 🎉 (${clienteSocket.id}).`);
  clienteSocket.emit('start', products);

  clienteSocket.on('addProduct', (newProduct)=>{
    classProducts.addProduct(newProduct)
    let products = classProducts.getProductsPlain()
    io.emit('start', products)
  })

  clienteSocket.on('deleteProducts', (id)=>{
    classProducts.deleteProduct(id)
    let products = classProducts.getProductsPlain()
    io.emit('start', products)
  })

  clienteSocket.on('disconnect', () => {
    console.log(`Cliente desconectado (${clienteSocket.id}) 😨.`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/`);
});
