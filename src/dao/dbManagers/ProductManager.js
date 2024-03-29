const ProductModel = require('../models/product.model');

class ProductManager {
    constructor() { }

    async prepare() {
        if (ProductModel.db.readyState !== 1) {
            throw new Error('must connect to mongodb!');
        }
    }
}

module.exports = ProductManager;