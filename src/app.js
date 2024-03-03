const express = require('express');
const productsRouter = require('./routes/products.router');
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/products', productsRouter);

app.listen(8080, () => { console.log('Servidor cargado!') });
