const { Router } = require('express'); // Importa la clase Router de Express para definir las rutas
const router = Router(); // Crea un enrutador
const { Controller } = require('../controller/cart.controller');
const { isUser } = require('../middlewares/auth.middleware');
const { verifyToken } = require('../middlewares/jwt.middleware');

// Ruta para obtener todos los carritos
router.get('/', (_, res) => new Controller().getCarts(res));

// Ruta para obtener un carrito por su ID
router.get('/:cid', (req, res) => new Controller().getCartById(req, res));

// Ruta para agregar un nuevo carrito
router.post('/', (_, res) => new Controller().createCart(res));

// Ruta para agregar un producto a un carrito
router.post('/:cid/product/:pid', verifyToken, isUser, (req, res) => new Controller().addProductToCart(req, res));

// Ruta para agregar o actualizar productos del carrito
router.put('/:cid', (req, res) => new Controller().updateCart(req, res));

// Ruta para eliminar un producto del carrito
router.delete('/:cid/product/:pid', async (req, res) => new Controller().deleteProductFromCart(req, res));

// Ruta para atualizar la cantidad de un producto en el carrito
router.put('/:cid/product/:pid', (req, res) => new Controller().updateProductQuantity(req, res));

// Ruta para vacial el carrito
router.delete('/:cid', async (req, res) => new Controller().clearCart(req, res));

router.post('/:cid/purchase', verifyToken, async (req, res) => new Controller().generateTicket(req, res));

module.exports = router; // Exporta el enrutador
