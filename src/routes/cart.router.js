const CartManager = require('../CartManager');
const { Router } = require('express');
const router = Router();

const manager = new CartManager(`${__dirname}/../../assets/cart.json`);

router.get('/', async (_, res) => {
    try {
        const carts = await manager.getCarts();
        res.status(200).json(carts);
    } catch {
        res.status(500).json({ error: 'No se pudo conectar con los carritos' });
    }
});

router.post('/', async (_, res) => {
    try {
        const cart = await manager.addCart();
        res.status(200).json({ message: 'Carrito creado con exito', cart });
    } catch {
        res.status(500).json({ error: 'No se pudo crear el carrito' });

    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cart = await manager.getCartById(cartId)
        cart ? res.status(200).json(cart) : res.status(400).json('El ID de carrito no existe');
    } catch {
        res.status(500).json({ error: 'Hubo un problema al conectar con el servidor' });
    }
});

module.exports = router;