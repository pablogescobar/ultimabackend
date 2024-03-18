const CartManager = require('../CartManager'); // Importa el módulo CartManager para gestionar los carritos
const { Router } = require('express'); // Importa la clase Router de Express para definir las rutas
const router = Router(); // Crea un enrutador

const manager = new CartManager(`${__dirname}/../../assets/cart.json`); // Crea una instancia del CartManager para manejar los carritos

// Ruta para obtener todos los carritos
router.get('/', async (_, res) => {
    try {
        const carts = await manager.getCarts(); // Obtiene todos los carritos
        res.status(200).json(carts); // Responde con los carritos obtenidos
    } catch {
        res.status(500).json({ error: 'No se pudo conectar con los carritos' }); // Responde con un error 500 si hay un error al obtener los carritos
    }
});

// Ruta para agregar un nuevo carrito
router.post('/', async (_, res) => {
    try {
        const cart = await manager.addCart(); // Agrega un nuevo carrito
        res.status(200).json({ message: 'Carrito creado con éxito', cart }); // Responde con un mensaje de éxito y el carrito agregado
    } catch {
        res.status(500).json({ error: 'No se pudo crear el carrito' }); // Responde con un error 500 si hay un error al agregar el carrito
    }
});

// Ruta para obtener un carrito por su ID
router.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid); // Obtiene el ID del carrito de los parámetros de la solicitud
        const cart = await manager.getCartById(cartId); // Obtiene el carrito por su ID
        res.status(200).json(cart); // Responde con el carrito obtenido
    } catch {
        res.status(500).json({ error: 'Hubo un problema al conectar con el servidor' }); // Responde con un error 500 si hay un error al obtener el carrito
    }
});

// Ruta para agregar un producto a un carrito
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid); // Obtiene el ID del carrito de los parámetros de la solicitud
        const productId = parseInt(req.params.pid); // Obtiene el ID del producto de los parámetros de la solicitud
        const updatedCart = await manager.addProductToCart(productId, cartId); // Agrega el producto al carrito
        res.status(200).json(updatedCart); // Responde con el carrito actualizado
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un problema' }); // Responde con un error 500 si hay un error al agregar el producto al carrito
    }
});

module.exports = router; // Exporta el enrutador
