const ProductDAO = require('../dao/mongo/products.dao');
const { IRepository } = require('./IRepository.repository');

class ProductRepository extends IRepository {
    constructor() {
        super();
        this.productDAO = new ProductDAO();
    }

    async findAll(query, options) {
        return await this.productDAO.getProducts(query, options);
    }

    async findById(id) {
        return await this.productDAO.getProductById(id);
    }

    async save(product) {
        return await this.productDAO.addProduct(product);
    }

    async update(id, product) {
        return await this.productDAO.updateProduct(id, product);
    }

    async delete(id) {
        return await this.productDAO.deleteProduct(id);
    }
}

module.exports = { ProductRepository };
