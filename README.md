# Desafío Opcional - Coderhouse Backend

Este producto se encuentra en construcción.

Este proyecto fue creado con el fin de cumplir con los requisitos de la segunda pre-entrega del proyecto final del curso de backend de CoderHouse. 
Para esta entrega, se eliminaron el chat y el sistema de fileManager con el fin de simplificar el código y hacer la navegación y corrección más sencilla. Si bien el fileManager ya no cumple ninguna función, aún se pueden revisar los archivos, ya que no han sido eliminados. No obstante, dado el enfoque de la entrega, estos archivos han quedado obsoletos. Si desea ver el funcionamiento de los archivos, puede moverse a la rama 'opcional' del repositorio, en la cual todavía se encuentra ese sistema funcional. 
Se han agregado vistas para los productos y los carritos. 
Tanto en el método como en el modelo para agregar un producto a la base de datos, se agregó el campo 'category' con el fin de cumplir mejor la consigna dada. Si bien los endpoints apuntan a /api/..., no solamente se devuelve JSON en los mismos. Pero se optó por hacer esto de esta forma para facilitar la corrección y ajustarse a lo pactado en las consignas.

## Correr de manera local
```bash
git clone https://github.com/Fede-Diiorio/backend_preEntrega1_Di-Iorio.git
cd backend_preEntrega1_Di-Iorio
npm install
nodemon src/app
```

Una vez ejecutados estos comandos en la consola de tu editor de texto aparecerá una URL con la que podrás ver los productos.

## Construido usando

- [Express](https://www.npmjs.com/package/express)
- [Express-handlebars](https://handlebarsjs.com/guide/#what-is-handlebars)
- [Mongoose](https://mongoosejs.com/docs/guide.html)
- [Mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2)
- [socket.io](https://socket.io/docs/v4/)

## Endponints

Todos los endpoints deberán ejecutarse desde Postman, a menos que se indique lo contrario en la documentación presentada..

### `getProducts`

Busca todos los productos disponibles en el archivo.

[**URL:**](http://localhost:8080/api/products) `http://localhost:8080/api/products`

**Método** `GET`

####

### `getProductById`

Busca el producto deseado según su ID.

[**URL:**](http://localhost:8080/api/products/6608682b37dbc33df4aab5a7) `http://localhost:8080/api/products/6608682b37dbc33df4aab5a7`

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
También es posible añadir un nuevo producto completando el formulario en: [localhost:8080/api/createProduct](http://localhost:8080/api/createProduct)

**Ejemplo:**

![Imagen del formulario](https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio/blob/optional/public/img/ejemploForm.png?raw=true)

### `updateProduct`

Selecciona un producto según su ID y se editan los campos deseados.

[**URL:**](http://localhost:8080/api/products/660bd12abd245b906eb85700) `http://localhost:8080/api/products/660bd12abd245b906eb85700`

**Método:** `PUT`

**Cuerpo de la Solicitud (Ejemplo para `updateProduct`):**
```json
{
    "title": "TitleActualizado",
    "thumbnail": "../img/GTX1630.webp",
    "status": true
}
````

### `deleteProduct`

Selecciona un producto según su ID para eliminarlo.

[**URL:**](http://localhost:8080/api/products/660bd12abd245b906eb85700) `http://localhost:8080/api/products/660bd12abd245b906eb85700`

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

[**URL:**](http://localhost:8080/api/cart/6608ab9f6d31f4296e5bbde3) `http://localhost:8080/api/cart/6608ab9f6d31f4296e5bbde3`

**Método** `GET`

### `addProductToCart`

Se indica en la URL el ID del producto a actualizar, así como el ID del carrito donde se desea realizar la actualización.

[**URL:**](http://localhost:8080/api/cart/6608ab9f6d31f4296e5bbde3/product/6608682b37dbc33df4aab5a7) `http://localhost:8080/api/cart/6608ab9f6d31f4296e5bbde3/product/6608682b37dbc33df4aab5a7`

**Método** `POST`

### Nota:

Ten en cuenta que todos los endpoints están preparados para funcionar con mongoDB. Para que funcionen con fileSystem se deberán hacer las modificaciones pertinentes explicadas en [**app.js**](https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio/blob/optional/src/app.js)

Si tienes problemas al conectar con la base de datos de Mongo Atlas te aconsejo que reemplaces la dirección de Altas por la de tu mongo local con el fin de probar la aplicación.

## Chat en vivo

Para acceder al chat en vivo debes ingresar en [http://localhost:8080/api/chat](http://localhost:8080/api/chat).

Se te pedirá un username y una vez logueado podrás empezar a utilizar el chat.

### Demostración

[**Ver**](https://youtu.be/FI2g8ZqlydQ)