const ProductModel = require('../models/product.model');
const fs = require('fs');

class ProductManager {

    constructor() { }

    async prepare() {
        // No hacer nada. 
        // Podríamos chequear que la conexión existe y está funcionando
        if (UserModel.db.readyState !== 1) {
            throw new Error('must connect to mongodb!')
        }
    }

    // Agregar un nuevo producto
    async addProduct(title, description, price, thumbnail, code, status, stock) {

        // Se comprueba que estos tres parámetros existan
        if (!title || !description || !code) {
            throw new Error('Debe completar todos los campos');
        }

        // Si no se carga nada en este parámetro se generará como true por defecto
        if (typeof status === 'undefined' || status === true || status === 'true') {
            status = true;
        } else {
            status = false;
        }

        // Si no se carga nada en este parámetro se genera un string 'Sin Imagen' por defecto
        if (!thumbnail) {
            thumbnail = 'Sin Imagen';
        } else {
            thumbnail;
        }

        // Se reciben los correspondientes parámetros y se parsean como tipo number
        const numericPrice = parseFloat(price)
        const numericStock = parseInt(stock)

        // Se hacen las pertinentes comprobaciones para el stock y el precio
        if (numericStock < 0 && numericPrice <= 0) {
            throw new Error('Asegúrese de que stock y price sean valores de tipo "number" superiores o iguales a 0');
        }

        // Se comprueba que el code de cada producto no esté repetido
        const existingProduct = await this.getProducts();
        const findProductCode = existingProduct.find(field => field.code === code)

        // Si todo es correcto se genera el nuevo producto con todas las comprobaciones realizadas
        if (!findProductCode) {

            // Porducto generado
            const product = { id: this.#getNewId(), title, description, price: numericPrice, thumbnail, code, status, stock: numericStock };

            // Se agrega el producto al array
            this.#products.push(product);

            // Se llama al método de guardar para convertir el array en json y guardar la nueva información en el archivo 
            await this.#saveFile();
            console.log('Agregado Correctamente');
        } else {
            throw new Error('El código de producto ya existe');
        }
    }

    async getProducts() {
        try {

            // Se obtienen los productos 
            const fileContents = await fs.promises.readFile(this.path, 'utf-8');

            // Una vez obtenidos se parsean para retornarlos en el método
            const existingProduct = JSON.parse(fileContents);
            return existingProduct;
        } catch (err) {

            // En caso de que no haya productos se retorna un arrazy vacio
            return [];
        }
    }

    async getProductById(id) {

        // Se utiliza el método para obtener todos los productos
        const existingProducts = await this.getProducts();

        // Se filtran todos los productos buscando el ID pasado por parámetros
        const filterProductById = existingProducts.find(el => el.id === id);

        if (filterProductById) {
            return filterProductById;
        } else {
            throw new Error('Not Found: El ID solicitado no existe.');
        }
    }

    async updateProduct(id, updatedProduct) {

        // Se busca si el ID existe
        const indexToUpdate = this.#products.findIndex(el => el.id === id);

        // En caso de existir se actualiza el producto
        if (indexToUpdate !== -1) {
            const { id: updatedId, stock, price } = updatedProduct;

            // Comprobaciones para precio y stock
            if (stock <= 0 || price <= 0) {
                throw new Error('Asegúrese de que stock y price sean valores de tipo "number" superiores a 0');
            }

            // Comprobación para no atualizar el ID
            if (updatedId && updatedId !== id) {
                throw new Error('No se permite modificar el ID del producto');
            }

            // Se genera el producto actualizado
            this.#products[indexToUpdate] = { ...this.#products[indexToUpdate], ...updatedProduct, id };

            // Se guarda el nuevo producto en el archivo
            await this.#saveFile();
            console.log('Producto actualizado correctamente');
        } else {
            throw new Error('Not found: El ID solicitado no existe');
        }
    }

    async deleteProduct(id) {

        // Se busca el ID existente
        const indexToDelete = this.#products.findIndex(el => el.id === id);

        // En caso de que el ID exista se elimina el producto con 'splice'
        if (indexToDelete !== -1) {
            this.#products.splice(indexToDelete, 1);
            await this.#saveFile();
            console.log('Producto eliminado correctamente');
        } else {
            throw new Error('Not found: El ID solicitado no existe');
        }
    }
}

module.exports = ProductManager;