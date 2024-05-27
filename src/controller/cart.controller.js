const { CartService } = require('../services/cart.service');

class Controller {
    constructor() {
        this.cartService = new CartService();
    }

    async getCarts(res) {
        try {
            const carts = await this.cartService.getCarts();
            res.status(200).json(carts);
        } catch (err) {
            res.status(500).json({ Error: err.message });
        }
    }

    async getCartById(req, res) {
        try {
            const cartId = req.params.cid;
            const cart = await this.cartService.getCartById(cartId);
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json({ Error: err.message });
        }
    }

    async createCart(res) {
        try {
            const cart = await this.cartService.createCart();
            res.status(201).json(cart);
        } catch (err) {
            res.status(500).json({ Error: err.message });
        }
    }

    async addProductToCart(req, res) {
        try {
            const { productId, cartId } = req.body;
            const cart = await this.cartService.addProductToCart(productId, cartId);
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json({ Error: err.message });
        }
    }

    async deleteProductFromCart(req, res) {
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid
            await this.cartService.deleteProductFromCart(productId, cartId);
            res.status(200).json({ message: 'Producto eliminado del carrito' });
        } catch (err) {
            res.status(500).json({ Error: err.message });
        }
    }

    async updateCart(req, res) {
        try {
            const cartId = req.params.cid;
            const products = req.body;
            const cart = await this.cartService.updateCart(cartId, products);
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json({ Error: err.message });
        }
    }

    async updateProductQuantity(req, res) {
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
            const { quantity } = req.body;
            const cart = await this.cartService.updateProductQuantity(cartId, productId, quantity);
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json({ Error: err.message });
        }
    }

    async clearCart(req, res) {
        try {
            const cartId = req.params.cid;
            await this.cartService.clearCart(cartId);
            res.status(200).json({ message: 'Carrito vaciado' });
        } catch (err) {
            res.status(500).json({ Error: err.message });
        }
    }

    async deleteCartById(req, res) {
        try {
            const cartId = req.params.cid;
            await this.cartService.deleteCartById(cartId);
            res.status(200).json({ message: 'Carrito eliminado' });
        } catch (err) {
            res.status(500).json({ Error: err.message });
        }
    }
}

module.exports = { Controller };
