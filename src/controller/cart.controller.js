const CartManager = require('../dao/dbManagers/CartManager');

class Controller {
    constructor() { }

    async getCarts(res) {
        try {
            const carts = await new CartManager().getCarts();

            const cartsData = carts.map(c => ({
                id: c.id,
                quantity: c.products.length
            }));

            res.status(200).json(cartsData);
        } catch (err) {
            res.status(500).json({ Error: err.message });
        }
    }

    async getCartById(req, res) {
        try {
            const cartId = req.params.cid;
            const cart = await new CartManager().getCartById(cartId);

            const cartData = {
                id: cart.id,
                products: cart.products.map(p => ({
                    productId: p.product.id,
                    title: p.product.title,
                    code: p.product.code,
                    quantity: p.quantity
                }))
            };

            res.status(200).json(cartData);
        } catch (err) {
            res.status(500).json({ Error: err.message });
        }
    }

    async addCart(res) {
        try {
            const cart = await new CartManager().addCart();
            res.status(200).json({ message: 'Carrito creado con éxito', cart });
        } catch {
            res.status(500).json({ error: 'No se pudo crear el carrito' });
        }
    }

    async addProductToCart(req, res) {
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
            const updatedCart = await new CartManager().addProductToCart(productId, cartId);
            res.status(200).json(updatedCart);
        } catch (error) {
            console.error(error);
            res.status(500).json({ Error: error.message });
        }
    }

    async updatedCart(req, res) {
        try {
            const cartId = req.params.cid;
            const products = req.body;
            await new CartManager().updateCart(cartId, products);
            res.status(200).json({ message: 'Carrito actualizado correctamente.' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteProductFromCart(req, res) {
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
            await new CartManager().deleteProductFromCart(productId, cartId);
            res.status(200).json({ message: `Producto ${productId} eliminado del carrito ${cartId} de manera correcta.` });
        } catch (err) {
            res.status(500).json({ Error: err.message });
        }
    }

    async updateProductQuantityFromCart(req, res) {
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
            const { quantity } = req.body;
            await new CartManager().updateProductQuantityFromCart(productId, cartId, quantity);
            res.status(200).json({ message: `Se actualizó el producto ${productId} en una cantidad de ${quantity} del carrito ${cartId}.` });
        } catch (err) {
            res.status(500).json({ Error: err.message });
        }
    }

    async clearCart(req, res) {
        try {
            const cartId = req.params.cid;
            await new CartManager().clearCart(cartId);
            res.status(200).json({ message: `Carrito ${cartId} vaciado de manera correcta.` });
        } catch (err) {
            res.status(500).json({ Error: err.message });
        }
    }
}

module.exports = { Controller };
