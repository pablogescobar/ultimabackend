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
        product ? res.status(200).json(product) : res.status(400).json('El producto no existe');
    } catch {
        res.status(500).json({ Error: 'Error al cargar los productos' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, status, stock } = req.body;

        await manager.addProduct(title, description, price, thumbnail, code, status, stock);

        res.status(201).json({ message: 'Producto agregado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

module.exports = router;