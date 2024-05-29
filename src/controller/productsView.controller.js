const { ProductViewDTO } = require('../dto/productView.dto');
const { ProductRepository } = require('../repository/products.repository');
const { CartRepository } = require('../repository/carts.repository');

class Controller {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    async getProducts(req, res) {
        try {
            const isLoggedIn = req.cookies.accessToken !== undefined;
            const user = req.user;
            const firstName = user ? user.firstName : 'Usuario';
            const lastName = user ? user.lastName : 'Sin Identificar';
            const cartId = user ? user.cart : null;

            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            const sort = req.query.sort;
            const category = req.query.category;
            const availability = req.query.availability;

            const products = await this.productRepository.getProducts(page, limit, sort, category, availability);

            const productsPayload = products.map(product => new ProductViewDTO({ ...product, isLoggedIn }));

            res.render('products', {
                products: { ...products, payload: productsPayload },
                titlePage: 'Productos',
                style: ['styles.css'],
                script: ['products.js'],
                isLoggedIn,
                isNotLoggedIn: !isLoggedIn,
                firstName,
                lastName,
                cartId
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getProductById(req, res) {
        try {
            const isLoggedIn = req.cookies.accessToken !== undefined;
            const productId = req.params.pid;
            const product = await this.productRepository.getProductById(productId);

            const productData = new ProductViewDTO({ ...product, isLoggedIn });
            console.log(req.user.cart);

            res.status(200).render('product', {
                product: [productData],
                titlePage: `Productos | ${product.title}`,
                style: ['styles.css'],
                isLoggedIn,
                isNotLoggedIn: !isLoggedIn,
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async addProductToCart(req, res) {
        try {
            const productId = req.params.pid;
            const cartId = req.user.cart;
            await new CartRepository().addProductToCart(productId, cartId);
            res.status(301).redirect('/products');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async addProduct(req, res) {
        try {
            const { title, description, price, thumbnail, code, status, stock, category } = req.body;
            await new daoProducts().addProduct(title, description, price, thumbnail, code, status, stock, category);
            res.status(301).redirect('/products');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = { Controller };
