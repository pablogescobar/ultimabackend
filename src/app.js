const express = require('express');
const handlebars = require('express-handlebars');

const ProductManager = require('./dao/fileManagers/ProductManager');
const CartManager = require('./dao/fileManagers/CartManager');

const productsRouter = require('./routes/products.router');
const cartRouter = require('./routes/cart.router');
const addProductRouter = require('./routes/addProduct.router');

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
app.use('/api/products', productsRouter); // Rutas relacionadas con los productos
app.use('/api/admin', addProductRouter); // Rutas relacionadas con los productos
app.use('/api/cart', cartRouter); // Rutas relacionadas con el carrito

// Se inicia el servidor en el puerto 8080

const main = async () => {

    const productManager = new ProductManager(`${__dirname}/../assets/products.json`);
    await productManager.getProducts();
    app.set('productManager', productManager);

    const cartManager = new CartManager(`${__dirname}/../assets/cart.json`);
    await cartManager.getCarts();
    app.set('cartManager', cartManager);
}
app.listen(8080, () => { console.log('Servidor cargado!') });

main();
