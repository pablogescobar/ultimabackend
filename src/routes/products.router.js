const ProductManager = require('../ProductManager');
const { Router } = require('express');
const router = Router();

const manager = new ProductManager(`${__dirname}/../../assets/products.json`);

router.get('/', async (req, res) => {
    try {
        const products = await manager.getProducts();
        const limitFilter = req.query.limit;

        if (limitFilter) {
            if (limitFilter <= 0 || isNaN(parseInt(limitFilter))) {
                res.status(400).json({ error: 'Debe ingresar un número válido superior a 0.' });
                return;
            } else {
                const limit = parseInt(limitFilter);
                const limitedProducts = products.slice(0, limit);
                res.json(limitedProducts);
            }
        } else {
            res.json(products);
        }
    } catch {
        res.status(500).json({ Error: 'Error al cargar los productos' });
    };
});

router.get('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await manager.getProductById(productId);
        product ? res.json(product) : res.json('El producto no existe');
    } catch {
        res.json({ Error: 'Error al buscar el id' });
    }
});

module.exports = router;