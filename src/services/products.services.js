const { ProductRepository } = require('../repository/products.repository')

class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    async validateAndFormatAddProduct(title, description, price, thumbnail, code, status, stock, category) {
        const product = {
            title,
            description,
            price,
            thumbnail: thumbnail || 'Sin Imagen',
            code,
            status: status !== undefined ? status : true,
            stock,
            category
        };
        return product;
    }

    async createProduct(data) {
        const product = await this.validateAndFormatAddProduct(data.title, data.description, data.price, data.thumbnail, data.code, data.status, data.stock, data.category);
        return await this.productRepository.save(product);
    }

    async getProducts(page, limit, sort, category, availability) {
        const { query, options } = await this.validateAndFormatGetProductsParams(page, limit, sort, category, availability);
        return await this.productRepository.findAll(query, options);
    }

    async getProductById(id) {
        return await this.productRepository.findById(id);
    }

    async updateProduct(id, data) {
        return await this.productRepository.update(id, data);
    }

    async deleteProduct(id) {
        return await this.productRepository.delete(id);
    }

    async validateAndFormatGetProductsParams(page, limit, sort, category, availability) {
        const query = {
            ...(category && { category }),
            ...(availability && { status: availability === 'true' })
        };

        const options = {
            limit: limit ? parseInt(limit) : 1000,
            page: parseInt(page),
            sort: sort ? { price: sort } : undefined,
            lean: true
        };

        if (isNaN(page)) {
            throw new Error('Número de página no válido');
        }

        return { query, options };
    }
}

module.exports = { ProductService };
