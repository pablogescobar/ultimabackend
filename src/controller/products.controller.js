const { ProductService } = require('../services/products.services');

class Controller {
    constructor() {
        this.productService = new ProductService();
    }

    async getProducts(req, res) {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            const sort = req.query.sort;
            const category = req.query.category;
            const availability = req.query.availability;

            const products = await this.productService.getProducts(page, limit, sort, category, availability);
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getProductById(req, res) {
        try {
            const productId = req.params.pid;
            const product = await this.productService.getProductById(productId);

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
            res.status(500).json({ error: err.message });
        }
    }

    async addProduct(req, res) {
        try {
            const { title, description, price, thumbnail, code, status, stock, category } = req.body;
            const product = await this.productService.createProduct({ title, description, price, thumbnail, code, status, stock, category });
            res.status(200).json({ message: 'Producto agregado correctamente', product });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const productId = req.params.pid;
            const updatedProduct = await this.productService.updateProduct(productId, req.body);
            res.status(200).json({ message: 'Producto actualizado', updatedProduct });
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar el producto' });
        }
    }

    async deleteProduct(req, res) {
        try {
            const productId = req.params.pid;
            await this.productService.deleteProduct(productId);
            res.status(200).json({ message: 'Producto eliminado' });
        } catch (err) {
            res.status(500).json({ error: err.message });
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
    //         res.status(500).json({ error: err.message });
    //     }
    // }
}

module.exports = { Controller };
