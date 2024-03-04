const fs = require('fs');

class CartManager {
    #cart;
    #lastCartId;
    path;

    constructor(path) {
        this.#cart = [];
        this.path = path;
        this.#lastCartId = 1;
        this.#readFile();
    }

    async #readFile() {
        try {
            const fileData = await fs.readFile(this.path, 'utf-8');
            this.#cart = JSON.parse(fileData);
            this.#updateLastCartId();
        } catch (error) {
            await this.#saveFile();
        }
    }

    #updateLastCartId() {
        const lastCart = this.#cart[this.#cart.length - 1];
        if (lastProduct) {
            this.#lastCartId = lastCart.id + 1;
        }
    }

    async #saveFile() {
        await fs.promises.writeFile(this.path, JSON.stringify(this.#cart, null, 2), 'utf-8');
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
};

module.exports = CartManager;