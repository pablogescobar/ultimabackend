const ProductManager = require('../dao/dbManagers/ProductManager');

class ProductService {
    constructor() { }

    async addProduct(title, description, price, thumbnail, code, status, stock, category) {
        try {
            // Validaciones y asignaciones de valores predeterminados

            const invalidOptions = isNaN(+price) || +price <= 0 || isNaN(+stock) || +stock < 0;

            if (!title || !description || !code || !category || invalidOptions) {
                throw new Error('Error al validar los datos');
            };

            const finalThumbnail = thumbnail ? thumbnail : 'Sin Imagen';

            // Si no se carga nada en este parámetro se generará como true por defecto
            if (typeof status === 'undefined' || status === true || status === 'true') {
                status = true;
            } else {
                status = false;
            }

            await new ProductManager().addProduct(title, description, price, finalThumbnail, code, status, stock, category)
        } catch (e) {
            console.error('Error al agregar un producto en el servicio.', e);
            throw new Error('Error al agregar un producto en el servicio.');
        }
    }
}

module.exports = { ProductService };
