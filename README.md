# Pre Entrega 1 - Coderhouse Backend

Este producto se encuentra en construcción.

Este proyecto fue creado con el fin de cumplir con los requisitos de la pre entrega número 1 del curso de backend de CoderHouse.

## Correr de manera local
```bash
git clone https://github.com/Fede-Diiorio/backend_preEntrega1_Di-Iorio.git
cd backend_preEntrega1_Di-Iorio
npm install
nodemon src/app
```

## Construido usando

- [Express](https://www.npmjs.com/package/express)

## Endponints

### `getProducts`

Busca todos los productos disponibles en el archivo.

[**URL:**](http://localhost:8080/api/products) `http://localhost:8080/api/products`

**Método** `GET`

### `getProductsLimit`

Indica un limite en la URL para mostrar la cantidad de productos deseada.

[**URL:**](http://localhost:8080/api/products?limit=5) `http://localhost:8080/api/products?limit=5`

**Método** `GET`

### `getProductById`

Busca el producto deseado según su ID.

[**URL:**](http://localhost:8080/api/products/2) `http://localhost:8080/api/products/2`

**Método** `GET`

### `addProduct`

Añade un nuevo producto al sistema.

[**URL:**](http://localhost:8080/api/products) `http://localhost:8080/api/products`

**Método:** `POST`

**Cuerpo de la Solicitud (Ejemplo para `addProduct`):**
```json
{
    "title": "Test",
    "description": "Descripción de testeo",
    "price": 200,
    "code": "zad258",
    "stock": 50
}
````

### `updateProduct`

Selecciona un producto según su ID y se editan los campos deseados.

[**URL:**](http://localhost:8080/api/products/11) `http://localhost:8080/api/products/11

**Método:** `PUT`

**Cuerpo de la Solicitud (Ejemplo para `updateProduct`):**
```json
{
    "title": "TitleActualizado",
    "thumbnail": "./imagen.webp",
    "status": true
}
````

### `deleteProduct`

Selecciona un producto según su ID para eliminarlo.

[**URL:**](http://localhost:8080/api/products/11) `http://localhost:8080/api/products/11`

**Método:** `DELETE`

### `addCart`

Crea un nuevo carrito en el archivo.

[**URL:**](http://localhost:8080/api/cart) `http://localhost:8080/api/cart`

**Método** `POST`

### `getCarts`

Busca y muestra todos los carritos existentes en el archivo.

[**URL:**](http://localhost:8080/api/cart) `http://localhost:8080/api/cart`

**Método** `GET`

### `getCartById`

Busca un carrito según su ID.

[**URL:**](http://localhost:8080/api/cart/1) `http://localhost:8080/api/cart/1`

**Método** `GET`

### `addProductToCart`

Se indica en la URL el ID del producto a actualizar, así como el ID del carrito donde se desea realizar la actualización.

[**URL:**](http://localhost:8080/api/cart/1/product/5) `http://localhost:8080/api/cart/1/product/5`

**Método** `POST`