const { Router } = require('express'); // Importa la clase Router de Express para definir las rutas
const router = Router(); // Crea un enrutador

// Ruta para obtener todos los carritos
router.get('/', async (req, res) => {
    try {
        const cartManager = req.app.get('cartManager');
        const carts = await cartManager.getCarts(); // Obtiene todos los carritos

        const cartsData = carts.map(c => ({
            id: c.id,
            quantity: c.products.length
        }))

        res.status(200).render('carts', {
            carts: cartsData,
            titlePage: 'Carritos',
            style: ['styles.css'],
        }); // Responde con los carritos obtenidos
    } catch {
        res.status(500).json({ error: 'No se pudo conectar con los carritos' }); // Responde con un error 500 si hay un error al obtener los carritos
    }
});

// Ruta para obtener un carrito por su ID
router.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid; // Obtiene el ID del carrito de los parámetros de la solicitud
        const cartManager = req.app.get('cartManager');
        const cart = await cartManager.getCartById(cartId); // Obtiene el carrito por su ID

        const cartData = {
            id: cart.id,
            products: cart.products.map(product => ({
                productId: product.id,
                quantity: product.quantity
            }))
        };

        res.status(200).render('cart', {
            cart: cartData,
            titlePage: 'Carrito',
            style: ['styles.css'],
        }); // Responde con el carrito obtenido

    } catch (err) {
        res.status(500).json({ Error: err.message }); // Responde con un error 500 si hay un error al obtener el carrito
    }
});

// Ruta para agregar un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const cartManager = req.app.get('cartManager');
        const cart = await cartManager.addCart(); // Agrega un nuevo carrito
        res.status(200).json({ message: 'Carrito creado con éxito', cart }); // Responde con un mensaje de éxito y el carrito agregado
    } catch {
        res.status(500).json({ error: 'No se pudo crear el carrito' }); // Responde con un error 500 si hay un error al agregar el carrito
    }
});

// Ruta para agregar un producto a un carrito
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid; // Obtiene el ID del carrito de los parámetros de la solicitud
        const productId = req.params.pid; // Obtiene el ID del producto de los parámetros de la solicitud
        const cartManager = req.app.get('cartManager');
        const updatedCart = await cartManager.addProductToCart(productId, cartId); // Agrega el producto al carrito
        res.status(200).json(updatedCart); // Responde con el carrito actualizado
    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: error.message }); // Responde con un error 500 si hay un error al agregar el producto al carrito
    }
});

module.exports = router; // Exporta el enrutador
