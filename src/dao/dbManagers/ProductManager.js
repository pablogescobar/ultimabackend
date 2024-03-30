const { Products } = require('../models');

class ProductManager {

    constructor() { }

    async prepare() {
        // No hacer nada. 
        // Podríamos chequear que la conexión existe y está funcionando
        if (Products.db.readyState !== 1) {
            throw new Error('must connect to mongodb!')
        }
    }

    async getProducts() {
        try {
            // Se obtienen los productos 
            const allProducts = await Products.find();
            return allProducts;
        } catch (err) {
            // En caso de que no haya productos se retorna un array vacio
            return [];
        }
    }

    // async getProductById(id) {

    //     // Se utiliza el método para obtener todos los productos
    //     const existingProducts = await this.getProducts();

    //     // Se filtran todos los productos buscando el ID pasado por parámetros
    //     const filterProductById = existingProducts.find(el => el.id === id);

    //     if (filterProductById) {
    //         return filterProductById;
    //     } else {
    //         throw new Error('Not Found: El ID solicitado no existe.');
    //     }
    // }

    // Agregar un nuevo producto
    async addProduct(title, description, price, thumbnail, code, status, stock) {
        // Validaciones y asignaciones de valores predeterminados

        const invalidOptions = isNaN(+price) || +price <= 0 || isNaN(+stock) || +stock < 0;

        if (!title || !description || !code || invalidOptions) {
            throw new Error('Error al validar los datos');
        };

        const finalThumbnail = thumbnail ? thumbnail : 'Sin Imagen';

        // Si no se carga nada en este parámetro se generará como true por defecto
        if (typeof status === 'undefined' || status === true || status === 'true') {
            status = true;
        } else {
            status = false;
        }

        try {
            await Products.create({
                title,
                description,
                price,
                thumbnail: finalThumbnail,
                code,
                status,
                stock
            });

            console.log('Producto agregado correctamente');
        } catch (error) {
            console.error('Error al agregar el producto desde DB:', error);
            throw new Error('Error al agregar el producto desde DB');
        }
    }


    // async updateProduct(id, updatedProduct) {

    //     // Se busca si el ID existe
    //     const indexToUpdate = this.#products.findIndex(el => el.id === id);

    //     // En caso de existir se actualiza el producto
    //     if (indexToUpdate !== -1) {
    //         const { id: updatedId, stock, price } = updatedProduct;

    //         // Comprobaciones para precio y stock
    //         if (stock <= 0 || price <= 0) {
    //             throw new Error('Asegúrese de que stock y price sean valores de tipo "number" superiores a 0');
    //         }

    //         // Comprobación para no atualizar el ID
    //         if (updatedId && updatedId !== id) {
    //             throw new Error('No se permite modificar el ID del producto');
    //         }

    //         // Se genera el producto actualizado
    //         this.#products[indexToUpdate] = { ...this.#products[indexToUpdate], ...updatedProduct, id };

    //         // Se guarda el nuevo producto en el archivo
    //         await this.#saveFile();
    //         console.log('Producto actualizado correctamente');
    //     } else {
    //         throw new Error('Not found: El ID solicitado no existe');
    //     }
    // }

    // async deleteProduct(id) {

    //     // Se busca el ID existente
    //     const indexToDelete = this.#products.findIndex(el => el.id === id);

    //     // En caso de que el ID exista se elimina el producto con 'splice'
    //     if (indexToDelete !== -1) {
    //         this.#products.splice(indexToDelete, 1);
    //         await this.#saveFile();
    //         console.log('Producto eliminado correctamente');
    //     } else {
    //         throw new Error('Not found: El ID solicitado no existe');
    //     }
    // }
}

module.exports = ProductManager;