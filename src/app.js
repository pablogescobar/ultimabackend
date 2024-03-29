const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

const ProductManager = require('./dao/fileManagers/ProductManager');
const CartManager = require('./dao/fileManagers/CartManager');

const DbProductManager = require('./dao/dbManagers/ProductManager');

const productsRouter = require('./routes/products.router');
const cartRouter = require('./routes/cart.router');
const createProductRouter = require('./routes/createProduct.router');

const app = express();

// configurar handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

// Permitir envío de información mediante formularios y JSON
app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos de formularios
app.use(express.json()); // Middleware para parsear datos JSON
app.use(express.static(`${__dirname}/../public`))

// Se asignan las rutas para los endpoints relacionados con los productos y el carrito
app.use('/api/fileProducts', productsRouter); // Rutas relacionadas con los productos
app.use('/api/fileCart', cartRouter); // Rutas relacionadas con el carrito

// Se inicia el servidor en el puerto 8080

const main = async () => {

    await mongoose.connect('mongodb://127.0.0.1:27017', {
        dbName: 'ecommerce'
    })

    // <-- FILEMANAGER -->
    const FileProductManager = new ProductManager(`${__dirname}/../assets/products.json`);
    await FileProductManager.getProducts()
    app.set('FileProductManager', FileProductManager);

    const cartManager = new CartManager(`${__dirname}/../assets/cart.json`);
    await cartManager.getCarts();
    app.set('cartManager', cartManager);

    // <-- DBMANAGER -->
    // const DbProductManager = new DbProductManager();
    // await DbProductManager.prepare();
    // app.set('DbProductManager', DbProductManager);

}
app.listen(8080, () => { console.log('Servidor cargado!') });

main();
