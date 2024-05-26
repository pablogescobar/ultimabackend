const daoCart = require('../dao/mongo/carts.dao');
const { IRepository } = require('./IRepository.repository');

class CartRepository extends IRepository {
    constructor() {
        super();
        this.daoCart = new daoCart();
    }

    async findAll() {
        return await this.daoCart.getCarts();
    }

    async findById(id) {
        return await this.daoCart.getCartById(id);
    }

    async save(cart) {
        return await this.daoCart.addCart(cart);
    }

    async update(id, cart) {
        return await this.daoCart.updateCart(id, cart);
    }

    async delete(id) {
        return await this.daoCart.deleteCartById(id);
    }

    async addProductToCart(productId, cartId) {
        return await this.daoCart.addProductToCart(productId, cartId);
    }

    async deleteProductFromCart(productId, cartId) {
        return await this.daoCart.deleteProductFromCart(productId, cartId);
    }

    async updateProductQuantity(cartId, productId, quantity) {
        return await this.daoCart.updateProductQuantityFromCart(cartId, productId, quantity);
    }

    async clearCart(cartId) {
        return await this.daoCart.clearCart(cartId);
    }
}

module.exports = { CartRepository };
