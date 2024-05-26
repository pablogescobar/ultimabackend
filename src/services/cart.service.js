const { ProductRepository } = require('../repository/products.repository')
const { CartRepository } = require('../repository/carts.repository')

class CartService {
    constructor() {
        this.cartRepository = new CartRepository();
        this.productRepository = new ProductRepository();
    }

    async getCarts() {
        return await this.cartRepository.findAll();
    }

    async getCartById(cartId) {
        return await this.cartRepository.findById(cartId);
    }

    async createCart() {
        return await this.cartRepository.save({ products: [] });
    }

    async addProductToCart(productId, cartId) {
        const product = await this.productRepository.findById(productId);
        if (!product) throw new Error('El producto no existe.');

        const cart = await this.cartRepository.findById(cartId);
        if (!cart) throw new Error('El carrito no existe.');

        const existingProductIndex = cart.products.findIndex(p => p.product.equals(productId));
        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        return await this.cartRepository.update(cartId, cart);
    }

    async deleteProductFromCart(productId, cartId) {
        return await this.cartRepository.deleteProductFromCart(productId, cartId);
    }

    async updateCart(cartId, products) {
        return await this.cartRepository.update(cartId, products);
    }

    async updateProductQuantity(cartId, productId, quantity) {
        return await this.cartRepository.updateProductQuantity(cartId, productId, quantity);
    }

    async clearCart(cartId) {
        return await this.cartRepository.clearCart(cartId);
    }

    async deleteCartById(cartId) {
        return await this.cartRepository.delete(cartId);
    }
}

module.exports = { CartService };
