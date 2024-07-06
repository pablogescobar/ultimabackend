const mongoose = require('mongoose');
const { CartRepository } = require('../../src/repository/carts.repository');
const { ProductRepository } = require('../../src/repository/products.repository');

describe('Testing Carts', () => {
    let chai;
    let expect;
    const cartRepository = new CartRepository();
    const productRepository = new ProductRepository();
    let connection = null;

    before(async function () {
        chai = await import('chai');
        expect = chai.expect;

        // Se ejecuta UNA ÚNICA vez, antes de todos los test de la suite
        this.timeout(10000); // Configurar el tiempo de espera para la conexión
        const mongooseConnection = await mongoose.connect('mongodb://localhost:27017/', { dbName: 'testing' });
        connection = mongooseConnection.connection;
    });

    after(async () => {
        // Se ejecuta UNA ÚNICA vez, luego de todos los test de la suite
        await connection.db.dropDatabase();
        await connection.close();
    });

    beforeEach(function () {
        // Se ejecuta antes de cada test dentro de esta suite
        this.timeout(10000); // Configurar el test para que mocha lo espere durante 10 segundos
    });

    afterEach(async () => {
        // Se ejecuta luego de cada test dentro de esta suite
    });

    it('El resultado del get debe ser un array', async () => {
        const result = await cartRepository.getCarts();
        expect(Array.isArray(result)).to.be.ok;
    });

    it('Se debe obtener un carrito según su ID', async () => {
        const cart = await cartRepository.addCart();
        const findedCart = await cartRepository.getCartById(cart._id);

        expect(findedCart).to.be.ok;
    });

    it('Se debe crear el carrito con un array vacio de productos', async () => {
        const result = await cartRepository.addCart();
        expect(Array.isArray(result.products)).to.be.ok;
    })

    it('Se debe agregar un producto al arreglo de products del carrito', async () => {
        const mockProduct = {
            title: 'test',
            description: 'Descripcion para el produdcto',
            price: 200,
            code: 'abc128',
            stock: 20,
            category: 'almacenamiento',
        }

        const newProduct = await productRepository.addProduct(mockProduct);

        const cart = await cartRepository.addCart();

        const result = await cartRepository.addProductToCart(newProduct.id, cart._id, 'test@test.com');

        const updatedCart = await cartRepository.getCartById(cart._id);

        expect(result).to.be.ok;
        expect(updatedCart.products[0].product._id.toString()).to.be.equal(newProduct.id);
    })
});
