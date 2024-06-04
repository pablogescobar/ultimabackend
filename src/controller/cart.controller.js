const { CartRepository } = require('../repository/carts.repository');
const { TicketRepository } = require('../repository/ticket.repository');

class Controller {
    constructor() {
        this.cartRepository = new CartRepository();
        this.ticketRepository = new TicketRepository();
    }

    async getCarts(res) {
        try {
            const carts = await this.cartRepository.getCarts();
            res.status(200).json(carts);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    async getCartById(req, res) {
        try {
            const cartId = req.params.cid;
            const cart = await this.cartRepository.getCartById(cartId);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    async createCart(res) {
        try {
            const cart = await this.cartRepository.addCart();
            res.status(201).json(cart);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    async addProductToCart(req, res) {
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
            const cart = await this.cartRepository.addProductToCart(productId, cartId);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    async deleteProductFromCart(req, res) {
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid
            await this.cartRepository.deleteProductFromCart(productId, cartId);
            res.status(200).json({ message: 'Producto eliminado del carrito' });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    async updateCart(req, res) {
        try {
            const cartId = req.params.cid;
            const products = req.body;
            const cart = await this.cartRepository.updateCart(cartId, products);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    async updateProductQuantity(req, res) {
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
            const { quantity } = req.body;
            const cart = await this.cartRepository.updateProductQuantity(cartId, productId, quantity);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    async clearCart(req, res) {
        try {
            const cartId = req.params.cid;
            await this.cartRepository.clearCart(cartId);
            res.status(200).json({ message: 'Carrito vaciado' });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    async deleteCartById(req, res) {
        try {
            const cartId = req.params.cid;
            await this.cartRepository.deleteCartById(cartId);
            res.status(200).json({ message: 'Carrito eliminado' });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    async generateTicket(req, res) {
        try {
            const { cid } = req.params;
            const userEmail = req.user.email;

            const ticket = await this.ticketRepository.generateTicket(cid, userEmail);

            res.status(200).json({
                message: 'Compra realizada con éxito',
                ticket
            });
        } catch (erroror) {
            res.status(400).json({ erroror: erroror.message });
        }
    }
}

module.exports = { Controller };
