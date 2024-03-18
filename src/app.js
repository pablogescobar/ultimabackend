const express = require('express');
const productsRouter = require('./routes/products.router');
const cartRouter = require('./routes/cart.router');
const app = express();

// Permitir envío de información mediante formularios y JSON
app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos de formularios
app.use(express.json()); // Middleware para parsear datos JSON

// Se asignan las rutas para los endpoints relacionados con los productos y el carrito
app.use('/api/products', productsRouter); // Rutas relacionadas con los productos
app.use('/api/cart', cartRouter); // Rutas relacionadas con el carrito

// Se inicia el servidor en el puerto 8080
app.listen(8080, () => { console.log('Servidor cargado!') });
