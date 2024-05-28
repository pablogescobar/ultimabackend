const CartDAO = require('../dao/mongo/carts.dao');
const { ProductRepository } = require('./products.repository');

class CartRepository {
    constructor() {
        this.cartDAO = new CartDAO();
        this.productRepository = new ProductRepository();
    }

    async getCarts() {
        return await this.cartDAO.getCarts();
    }

    async getCartById(id) {
        return await this.cartDAO.getCartById(id);
    }

    async addCart(cart) {
        return await this.cartDAO.addCart(cart);
    }

    async updateCart(id, cart) {
        return await this.cartDAO.updateCart(id, cart);
    }

    async delete(id) {
        return await this.cartDAO.deleteCartById(id);
    }

    async addProductToCart(productId, cartId) {
        return await this.cartDAO.addProductToCart(productId, cartId)
    }

    async deleteProductFromCart(productId, cartId) {
        return await this.cartDAO.deleteProductFromCart(productId, cartId);
    }

    async updateProductQuantity(cartId, productId, quantity) {
        return await this.cartDAO.updateProductQuantityFromCart(cartId, productId, quantity)
    }

    async clearCart(cartId) {
        return await this.cartDAO.clearCart(cartId);
    }
}

module.exports = { CartRepository };
