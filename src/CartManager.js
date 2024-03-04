const fs = require('fs');

class CartManager {
    #carts;
    #lastCartId;
    path;

    constructor(path) {
        this.#carts = [];
        this.path = path;
        this.#lastCartId = 1;
        this.#readFile();
    }

    async #readFile() {
        try {
            const fileData = await fs.readFile(this.path, 'utf-8');
            this.#carts = JSON.parse(fileData);
            this.#updateLastCartId();
        } catch (error) {
            await this.#saveFile();
        }
    }

    #updateLastCartId() {
        const lastCart = this.#carts[this.#carts.length - 1];
        if (lastProduct) {
            this.#lastCartId = lastCart.id + 1;
        }
    }

    async #saveFile() {
        await fs.promises.writeFile(this.path, JSON.stringify(this.#carts, null, 2), 'utf-8');
    }

    #getNewId() {
        return this.#lastCartId++;
    }

    async getCarts() {
        try {
            const fileContents = await fs.readFile(this.path, 'utf-8');
            const existingCart = JSON.parse(fileContents);
            return existingCart
        } catch (err) {
            return [];
        }
    }

    async addCart() {
        try {
            const cart = { id: this.#getNewId() }
            this.#carts.push(cart);
            await this.#saveFile();
            console.log('Nuevo carrito creado')
        } catch {
            throw new Error('Hubo un error al generar el carrito');
        }
    }
};

module.exports = CartManager;