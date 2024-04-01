const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

// <-- FILEMANAGER -->
// Agregar o quitar comentarios para cambiar entre mongoDB y sistema de archivos
// const ProductManager = require('./dao/fileManagers/ProductManager');
// const CartManager = require('./dao/fileManagers/CartManager');

// <-- MONGOMANAGER --> 
// Agregar o quitar comentarios para cambiar entre mongoDB y sistema de archivos
const ProductManager = require('./dao/dbManagers/ProductManager');
const CartManager = require('./dao/dbManagers/CartManager')
const ChatManager = require('./dao/chatManagers/chatManager');

const productsRouter = require('./routes/products.router');
const cartRouter = require('./routes/cart.router');
const createProductRouter = require('./routes/createProduct.router');
const chatRouter = require('./routes/chat.router');

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
app.use('/api/cart', cartRouter); // Rutas relacionadas con el carrito
app.use('/api/createProduct', createProductRouter);
app.use('/api/chat', chatRouter);

// Se inicia el servidor en el puerto 8080


const main = async () => {

    await mongoose.connect('mongodb+srv://FedeDiiorio:EatnQEgmFMs8oxtY@clusterfede.lnfsj8w.mongodb.net/?retryWrites=true&w=majority&appName=ClusterFede', {
        dbName: 'ecommerce'
    })

    const chatManager = new ChatManager();
    await chatManager.prepare();
    app.set('chatManager', chatManager);

    // <-- FILEMANAGER -->
    // Agregar o quitar comentarios para cambiar entre mongoDB y sistema de archivos
    // const productManager = new ProductManager(`${__dirname}/../assets/products.json`);
    // await productManager.getProducts()
    // app.set('productManager', productManager);

    // const cartManager = new CartManager(`${__dirname}/../assets/cart.json`);
    // await cartManager.getCarts();
    // app.set('cartManager', cartManager);

    // <-- MONGOMANAGER --> 
    // Agregar o quitar comentarios para cambiar entre mongoDB y sistema de archivos
    const productManager = new ProductManager();
    await productManager.prepare();
    app.set('productManager', productManager);

    const cartManager = new CartManager();
    await cartManager.prepare();
    app.set('cartManager', cartManager);

    const httpServer = app.listen(8080, () => { console.log('Servidor cargado!') });

    const io = new Server(httpServer)

    io.on('connection', (clientSocket) => {

        // cuando llegue un mensaje, enviárselo a todos los usuarios
        clientSocket.on('message', (data) => {
            io.emit('message', data)
        })

    })
}

main();
