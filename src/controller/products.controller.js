const { ProductRepository } = require('../repository/products.repository');
const { generateProduct } = require('../utils/generatePoduct');

class Controller {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    async getProducts(req, res) {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            const sort = req.query.sort;
            const category = req.query.category;
            const availability = req.query.availability;

            const products = await this.productRepository.getProducts(page, limit, sort, category, availability);
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({ err });
        }
    }

    async getProductById(req, res) {
        try {
            const productId = req.params.pid;
            const product = await this.productRepository.getProductById(productId);

            const productData = {
                title: product.title,
                thumbnail: product.thumbnail,
                description: product.description,
                price: product.price,
                stock: product.stock,
                code: product.code,
                id: product._id,
            };

            res.status(200).json(productData);
        } catch (err) {
            res.status(500).json({ err });
        }
    }

    async getMockingProducts(res) {
        try {
            const products = [];
            for (let i = 0; i < 100; i++) {
                products.push(generateProduct());
            }
            res.json(products);
        } catch (err) {
            res.status(500).json({ err });
        }
    }

    async addProduct(req, res) {
        try {
            const { title, description, price, thumbnail, code, status, stock, category } = req.body;
            const product = await this.productRepository.addProduct({ title, description, price, thumbnail, code, status, stock, category });
            res.status(200).json({ message: 'Producto agregado correctamente', product });
        } catch (err) {
            res.status(500).json({ err });
        }
    }

    async updateProduct(req, res) {
        try {
            const productId = req.params.pid;
            const updatedProduct = await this.productRepository.updateProduct(productId, req.body);
            res.status(200).json({ message: 'Producto actualizado', updatedProduct });
        } catch (err) {
            res.status(500).json({ err });
        }
    }

    async deleteProduct(req, res) {
        try {
            const productId = req.params.pid;
            await this.productRepository.deleteProduct(productId);
            res.status(200).json({ message: 'Producto eliminado' });
        } catch (err) {
            res.status(500).json({ err });
        }
    }

    // async addProductToCart(req, res) {
    //     try {
    //         const productId = req.params.pid;
    //         const cartId = req.user.cart;
    //         const cartManager = req.app.get('cartManager');
    //         await cartManager.addProductToCart(productId, cartId);
    //         res.status(301).redirect('/products');
    //     } catch (err) {
    //         res.status(500).json({ err: err.message });
    //     }
    // }
}

module.exports = { Controller };
