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

Busca todos los productos disponibles en el archivo

**URL** `http://localhost:8080/api/products`

**Método** `GET`

### `addProduct`

Añade un nuevo producto al sistema.

**URL:** `http://localhost:8080/api/products`

**Método:** `POST`

**Cuerpo de la solicitud:**
```json
{
    "title": "Test",
    "description": "Descripción de testeo",
    "price": 200,
    "code": "zad258",
    "stock": 50
}