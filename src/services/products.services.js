const { ProductRepository } = require('../repository/products.repository')
const { ProductDTO } = require('../dto/product.dto');

class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    async getProducts(page, limit, sort, category, availability) {
        const { query, options } = this.#validateAndFormatGetProductsParams(page, limit, sort, category, availability);
        const products = await this.productRepository.findAll(query, options);
        return products.docs.map(product => new ProductDTO(product));
    }

    async getProductById(id) {
        const product = await this.productRepository.findById(id);
        return new ProductDTO(product);
    }

    async createProduct(productData) {
        const product = await this.productRepository.addProduct(productData);
        return new ProductDTO(product);
    }

    async updateProduct(id, productData) {
        const updatedProduct = await this.productRepository.updateProduct(id, productData);
        return new ProductDTO(updatedProduct);
    }

    async deleteProduct(id) {
        return await this.productRepository.deleteProduct(id);
    }

    #validateAndFormatGetProductsParams(page, limit, sort, category, availability) {
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
