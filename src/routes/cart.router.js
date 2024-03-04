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

module.exports = router;