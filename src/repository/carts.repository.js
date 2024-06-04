const CartDAO = require('../dao/mongo/carts.dao');
const { ProductRepository } = require('./products.repository');
const { CustomError } = require('../utils/errors/customErrors');
const { ErrorCodes } = require('../utils/errors/errorCodes');

class CartRepository {

    #cartDAO;
    #productRepository;

    constructor() {
        this.#cartDAO = new CartDAO();
        this.#productRepository = new ProductRepository();
    }

    async #verifyCartExists(cartId) {
        try {
            const cart = await this.#cartDAO.getCartById(cartId);
            return cart;
        } catch {
            throw CustomError.createError({
                name: 'Error con el carrito',
                cause: 'Debe ingresar un ID válido existente en la base de datos',
                message: 'El carrito no existe',
                code: ErrorCodes.UNDEFINED_CART
            })
        }
    }

    async #verifyProductExists(productId) {
        try {
            const product = await this.#productRepository.getProductById(productId);
            return product;
        } catch {
            throw CustomError.createError({
                name: 'Error con los productos',
                cause: 'Debe ingresar un ID válido existente en la base de datos',
                message: 'El producto no existe',
                code: ErrorCodes.UNDEFINED_PRODUCT
            });
        }
    }

    async getCarts() {
        try {
            return await this.#cartDAO.getCarts();
        } catch {
            throw CustomError.createError({
                name: 'Error con el carrito',
                cause: 'Ocurrió un error al buscar los carritos en la base de datos',
                message: 'Error al obtener los carritos',
                code: ErrorCodes.DATABASE_ERROR
            });
        }
    }

    async getCartById(id) {
        try {
            let cart = await this.#verifyCartExists(id);
            // Se verifica que no se hayan eliminado de la DB los productos cargados en el carrito
            const updatedCart = cart.products.filter(i => i.product !== null);
            if (updatedCart.lenght !== cart.products.length) {
                cart.products = updatedCart;
                await this.#cartDAO.updateCart(id, { products: cart.products })
            }
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async addCart() {
        try {
            const cart = { porducts: [] }
            return await this.#cartDAO.addCart(cart);
        } catch (error) {
            throw CustomError.createError({
                name: 'Error con el carrito',
                cause: 'Hubo un problema al generar un nuevo carrito en la base de datos',
                message: 'Error al agregar el carrito',
                code: ErrorCodes.CART_CREATE_ERROR,
                otherProblems: error
            });
        }

    }

    async addProductToCart(productId, cartId) {
        try {
            await this.#verifyProductExists(productId);
            const cart = await this.#verifyCartExists(cartId);

            // Verificar si el producto ya está en el carrito
            const existingProductIndex = cart.products.findIndex(p => p.product.equals(productId));
            if (existingProductIndex !== -1) {
                // Si el producto existe, aumentar su cantidad en 1
                cart.products[existingProductIndex].quantity += 1;
            } else {
                // Si el producto no existe, agregarlo al carrito con cantidad 1
                cart.products.push({ product: productId, quantity: 1 });
            }

            // Guardar el carrito actualizado
            console.log('Producto agregado al carrito correctamente');
            await this.#cartDAO.updateCart(cartId, { products: cart.products });

            return cart;

        } catch (error) {
            throw CustomError.createError({
                name: 'Error con el carrito',
                cause: 'Hubo un problema ejecutar el ubicar el producto o el carrito en la base de datos',
                message: 'Error al agregar el producto al carrito',
                code: ErrorCodes.CART_UPDATE_ERROR,
                otherProblems: error
            });
        }
    }

    async updateCart(cartId, products) {
        try {
            const cart = await this.#verifyCartExists(cartId);

            // Iterar sobre cada producto en el arreglo de productos
            for (const { product: productId, quantity } of products) {
                await this.#verifyProductExists(productId);

                // Verificar si el producto ya está en el carrito
                const existingProductIndex = cart.products.findIndex(p => p.product.equals(productId));
                if (existingProductIndex !== -1) {
                    // Si el producto ya está en el carrito, actualizar la cantidad
                    cart.products[existingProductIndex].quantity += quantity;
                } else {
                    // Si el producto no está en el carrito, agregarlo
                    cart.products.push({ product: productId, quantity });
                }
            }

            // Guardar los cambios en el carrito utilizando el DAO
            const updatedCart = await this.#cartDAO.updateCart(cartId, { products: cart.products });

            console.log(`Se actualizó el carrito ${cartId}, ${updatedCart}`);
            return updatedCart;
        } catch (error) {
            throw CustomError.createError({
                name: 'Error con el carrito',
                cause: 'Hubo un problema alctualizar el carrito en la base de datos.',
                message: 'Error al actualizar el carrito',
                code: ErrorCodes.CART_UPDATE_ERROR,
                otherProblems: error
            });
        }
    }

    async deleteProductFromCart(productId, cartId) {
        try {
            await this.#verifyProductExists(productId);
            const cart = this.#verifyCartExists(cartId);
            await this.#cartDAO.updateCart(cartId, { products: { product: productId } });
            return cart;
        } catch (error) {
            throw CustomError.createError({
                name: 'Error con el carrito',
                cause: 'Hubo un problema al actualizar el carrito para eliminar el producto del mismo.',
                message: 'Error al eliminar el producto del carrito',
                code: ErrorCodes.CART_UPDATE_ERROR,
                otherProblems: error
            });
        }
    }

    async updateProductQuantity(cartId, productId, quantity) {
        try {
            await this.#verifyProductExists(productId);
            const cart = await this.#verifyCartExists(cartId);
            console.log(cart);

            const existingProductIndex = cart.products.findIndex(p => p.product.equals(productId));
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity = quantity;
                await this.#cartDAO.updateCart(cartId, { products: cart.products });
            }
            return cart;
        } catch (error) {
            throw CustomError.createError({
                name: 'Error con el carrito',
                cause: 'Hubo un problema alctualizar la cantidad de unidades del producto en el carrito.',
                message: 'Error al eliminar el producto del carrito',
                code: ErrorCodes.CART_UPDATE_ERROR,
                otherProblems: error
            });
        }
    }

    async clearCart(cartId) {
        try {
            const cart = await this.#verifyCartExists(cartId);
            await this.#cartDAO.updateCart(cartId, { products: [] });
            return cart;

        } catch (error) {
            throw CustomError.createError({
                name: 'Error con el carrito',
                cause: 'Hubo un problema alctualizar el carrito y no se pudo vaciar',
                message: 'Error al vaciar el carrito',
                code: ErrorCodes.CART_CLEAR_ERROR,
                otherProblems: error
            });
        }

    }
}

module.exports = { CartRepository };
