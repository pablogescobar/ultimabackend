const { Router } = require('express'); // Importa la clase Router de Express para definir las rutas
const router = Router(); // Crea un enrutador

router.get('/', async (_, res) => {
    res.render('createProduct', {
        titlePage: 'Agregar Producto',
        style: ['styles.css'],
        script: ['createProduct.js']
    });
});

router.post('/', async (req, res) => {
    try {

        // Obtener los datos del producto del cuerpo de la solicitud
        const { title, description, price, thumbnail, code, status, stock } = req.body;

        // Crear un nuevo objeto de producto
        // const newProduct = { title, description, price, thumbnail, code, status, stock };

        // Agregar el nuevo producto al archivo
        const productManager = req.app.get('productManager');
        await productManager.addProduct(title, description, price, thumbnail, code, status, stock);

        // // Emitir un evento WebSocket si se proporcionaron todos los datos del producto con el fin de que no se cargue un producto vacio en el feed
        // if (newProduct.title && newProduct.description && newProduct.price && newProduct.code && newProduct.stock) {
        //     req.app.get('ws').emit('newProduct', newProduct);
        // }

        res.status(301).redirect('/api/products');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;