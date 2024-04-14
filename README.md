# Segunda Pre-entrega - Coderhouse Backend

Este producto se encuentra en construcción.

Este proyecto fue creado con el fin de cumplir con los requisitos de la segunda pre-entrega del proyecto final del curso de backend de CoderHouse. 
Para esta entrega, se eliminaron el chat y el sistema de fileManager con el fin de simplificar el código y hacer la navegación y corrección más sencilla. Si bien el fileManager ya no cumple ninguna función, aún se pueden revisar los archivos, ya que no han sido eliminados. No obstante, dado el enfoque de la entrega, estos archivos han quedado obsoletos. Si desea ver el funcionamiento de los archivos, puede moverse a la rama 'opcional' del repositorio, en la cual todavía se encuentra ese sistema funcional. 
Se han agregado vistas para los productos y los carritos. 
Tanto en el método como en el modelo para agregar un producto a la base de datos, se agregó el campo 'category' con el fin de cumplir mejor la consigna dada. Si bien los endpoints apuntan a /api/..., no solamente se devuelve JSON en los mismos. Pero se optó por hacer esto de esta forma para facilitar la corrección y ajustarse a lo pactado en las consignas.

## Correr de manera local
```bash
git clone https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio.git
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

Todos los endpoints deben ser ejecutados desde Postman, a menos que se indique lo contrario en el endpoint específico. A continuación, se presenta la lista completa de todos los endpoints disponibles.

### `getProducts`

Busca todos los productos disponibles en el archivo.

[**URL:**](http://localhost:8080/api/products) `http://localhost:8080/api/products`

**Método** `GET`

#### **Parámetros de consulta opcionales:**

- `page` (número): Indica la página deseada. Por defecto, es la página 1.
- `limit` (número): Especifica el número máximo de productos por página. Por defecto, es 10.
- `sort` (cadena): Ordena los productos por precio en orden ascendente (asc) o descendente (desc).
- `category` (cadena): Filtra los productos por categoría.
- `availability` (booleano): Filtra los productos por disponibilidad. true muestra solo productos disponibles, false - muestra solo productos no disponibles.

#### Ejemplo de uso:

```http
GET http://localhost:8080/api/products?page=2&limit=20&sort=asc&category=electronics&availability=true
````

### `getProductById`

La URL debe incluir el ID del producto que desea buscar.

[**URL:**](http://localhost:8080/api/products/660867f537dbc33df4aab5a6) `http://localhost:8080/api/products/660867f537dbc33df4aab5a6`

**Método** `GET`

### `addProduct`

Añade un nuevo producto a la base de datos.

[**URL:**](http://localhost:8080/api/products) `http://localhost:8080/api/products`

**Método:** `POST`

**Cuerpo de la Solicitud (Ejemplo para `addProduct`):**
```json
{
    "title": "Test",
    "description": "Descripción de testeo",
    "price": 200,
    "code": "zad258",
    "stock": 50,
    "category": "test"
}
````
También es posible añadir un nuevo producto completando el formulario en: [localhost:8080/api/createProduct](http://localhost:8080/api/createProduct)

**Ejemplo:**

![Imagen del formulario](https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio/blob/sec/public/img/imagenEjemplo1.png?raw=true)

### `updateProduct`

La URL debe incluir el ID del producto y recibir como parámetros los campos que desea modificar.

[**URL:**](http://localhost:8080/api/products/661c21d010ed064a3bd51854) `http://localhost:8080/api/products/661c21d010ed064a3bd51854`

**Método:** `PUT`

**Cuerpo de la Solicitud (Ejemplo para `updateProduct`):**
```json
{
    "title": "TitleActualizado",
    "thumbnail": "../img/GTX1630.webp",
    "category": "grafica"
}
````

### `deleteProduct`

La URL debe incluir el ID del producto que desea eliminar.

[**URL:**](http://localhost:8080/api/products/661c21d010ed064a3bd51854) `http://localhost:8080/api/products/661c21d010ed064a3bd51854`

**Método:** `DELETE`

### `addCart`

Crea un nuevo carrito en la base de datos.

[**URL:**](http://localhost:8080/api/cart) `http://localhost:8080/api/cart`

**Método** `POST`

### `getCarts`

Busca y muestra todos los carritos existentes en la base de datos.
Además, puedes acceder a la vista de este endpoint con la siguiente URL.

[**URL:**](http://localhost:8080/api/cart) `http://localhost:8080/api/cart`

**Método** `GET`

### `getCartById`

La URL debe incluir el ID del carrito que se desea visualizar. Además, puedes acceder a la vista de este endpoint mediante la URL que se proporciona a continuación. En este caso, se utiliza populate para obtener información detallada sobre los productos agregados.

[**URL:**](http://localhost:8080/api/cart/6619078c94d150818d996ec7) `http://localhost:8080/api/cart/6619078c94d150818d996ec7`

**Método** `GET`

### `addProductToCart`

La URL debe incluir el ID del producto que se agregará y el ID del carrito al que se desea agregar.
También puedes usar el botón 'Agregar al carrito' al acceder al endpoint `getProductById`. Por defecto, el producto se agregará al carrito con el ID: **6619078c94d150818d996ec7**. Una vez completada esta operación solamente se añadirá el ID del producto y la cantidad en el carrito. Los demás detalles del producto se verán al acceder a `getCartById` mediante **populate**.

[**URL:**](http://localhost:8080/api/cart/6619078c94d150818d996ec7/product/661c232d10ed064a3bd5185f) `http://localhost:8080/api/cart/6619078c94d150818d996ec7/product/661c232d10ed064a3bd5185f`

**Método** `POST`

### `deleteProductFromCart`

La URL debe incluir el ID del producto que se eliminará y el ID del carrito en el que se desea eliminar el producto.

[**URL:**](http://localhost:8080/api/cart/6619078c94d150818d996ec7/product/661c21d010ed064a3bd51854)

**Método** `DELETE`

### `updateCart`

La URL debe incluir el ID del carrito en el cual se realizará la actualización. Esta debe recibir como parámetros el ID del producto y la cantidad que se desea agregar.

[**URL:**](http://localhost:8080/api/cart/661b091c818ef788075fdb89) `http://localhost:8080/api/cart/661b091c818ef788075fdb89`

**Método** `PUT`

**Cuerpo de la Solicitud (Ejemplo para `updateCart`):**
```json
{
    "products": [
        {
            "product": "660867f537dbc33df4aab5a6",
            "quantity": 8
        },
        {
            "product": "6608686137dbc33df4aab5aa",
            "quantity": 6
        }
    ]
}
````

### `updateProductQuantityFromCart`

La URL debe incluir el ID del carrito y el ID del producto que desea modificar. Esta debe recibir como parámetro la cantidad a la cual desea actualizar.

[**URL:**](http://localhost:8080/api/cart/6619078c94d150818d996ec7/product/6608689a37dbc33df4aab5ac) `http://localhost:8080/api/cart/6619078c94d150818d996ec7/product/6608689a37dbc33df4aab5ac`

**Método** `PUT`

**Cuerpo de la Solicitud (Ejemplo para `updateProductQuantityFromCart`):**
```json
{
    "quantity": 8
}
````

### `clearCart`

La URL debe incluir el ID del carrito que desea vaciar.

[**URL:**](http://localhost:8080/api/cart/6619078c94d150818d996ec7) `http://localhost:8080/api/cart/6619078c94d150818d996ec7`

**Método** `DELETE`

### Nota:

Si tienes problemas al conectar con la base de datos de Mongo Atlas te aconsejo que reemplaces la dirección de Altas por la de tu mongo local con el fin de probar la aplicación.