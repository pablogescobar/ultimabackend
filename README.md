# Implementación de login - Coderhouse Backend

Este producto se encuentra en construcción.

### Se corrigieron los siguientes errores marcados en la segunda preentrega
- Se agregó un input select en la vista para crear productos con el fin de evitar posibles errores.
- Se reparó un error que existía al eliminar un producto de la base de datos cuando dicho producto se encontraba agregado en un carrito.

### Con respecto a esta entrega
- Se realizaron los cambios requeridos para la implementación del inicio de sesión.
- Una vez que inicies el proyecto de forma local, accederás a la vista de inicio para iniciar sesión o registrarte.
- Todos los usuarios creados desde el sitio se alojarán en la base de datos de MongoDB con el rol de `usuario`.
- Para poder acceder como administrador, deberás ingresar con el correo electrónico `adminCoder@coder.com` y la contraseña `adminCod3r123`.
- UUna vez que inicies sesión como `usuario`, podrás ver el **precio** en los productos y se habilitarán otras funciones, como el botón **Agregar al carrito** y tendrás acceso a la vista de **carritos**.
- Si inicias sesión como `administrador`, además de tener acceso de `usuario`, se te permitirá acceder al formulario para **agregar productos**.

### Nuevas vistas agregadas

Para esta entrega en especifico, no hace falta el uso de postman dado a que podrás controlar todo desde la interfaz. Si no tienes una sesión iniciada verás los botones de `login` y `register`. Tendrás acceso al listado de productos pero no podrás ver los precios ni podrás ver el botón de **Agregar al carrito**.

![Imagen del inicio](https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio/blob/challengeLogin/public/img/ejemploSinLogin.png?raw=true)


Si haces clic en el botón `register`, podrás ver un formulario en el cual deberás completar los campos para ingresar tu información en la base de datos. Es importante aclarar que solo son requeridos los campos de **email** y **contraseña**. En caso de no completar el resto de los campos, estos serán completados automáticamente por el `userManager`.

![Imagen de register](https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio/blob/challengeLogin/public/img/registerExample.png?raw=true)

Una vez registrado, el usuario deberá iniciar sesión, para lo cual tendrá que hacer clic en el botón `login` y completar con el **email** y la **contraseña**.

![Imagen de login](https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio/blob/challengeLogin/public/img/loginExample.png?raw=true)

Cuando hayas completado estos pasos, tendrás acceso al resto de las vistas, excepto a la de  **Agregar Producto**, para la que necesitarás permisos de administrador. Para obtener estos permisos, tendrás que completar los campos con el email `adminCoder@coder.com` y la contraseña `adminCod3er123`. Es importante aclarar que los datos de `administrador` se comprobarán en el `userManager`, dado que este usuario no existe en la base de datos.

![Imagen de loggedIn](https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio/blob/challengeLogin/public/img/ejemploConLogin.png?raw=true)

Con todo esto listo, verás todos los botones habilitados. Si deseas ver las características del usuario, deberás ingresar en `Sesión` y luego en `Perfil`. Allí podrás encontrar información del usuario, como por ejemplo, el rol del usuario.

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
- [Express-session](https://www.npmjs.com/package/express-session)
- [Cookie-parser](https://www.npmjs.com/package/cookie-parser)

## Endponints

Todos los endpoints deben ser ejecutados desde Postman, a menos que se indique lo contrario en el endpoint específico. A continuación, se presenta la lista completa de todos los endpoints disponibles.

### `getProducts`

Busca todos los productos disponibles en la base de datos. Debes tener en cuenta que para ver los precios deberás tener una `sesión` iniciada.

[**URL:**](http://localhost:8080/api/products) `http://localhost:8080/api/products`

**Método** `GET`

#### **Parámetros de consulta opcionales:**

- `page` (número): Indica la página deseada. Por defecto, es la página 1.
- `limit` (número): Especifica el número máximo de productos por página. Por defecto, es 10.
- `sort` (cadena): Ordena los productos por precio en orden ascendente (asc) o descendente (desc).
- `category` (cadena): Filtra los productos por categoría.
- `availability` (booleano): Filtra los productos por disponibilidad. true muestra solo productos disponibles, false muestra solo productos no disponibles.

#### Ejemplo de uso:

```http
http://localhost:8080/api/products?page=1&limit=5&sort=asc&category=almacenamiento&availability=true
````

### `getProductById`

La URL debe incluir el ID del producto que desea buscar. Debes tener en cuenta que para ver los precios deberás tener una `sesión` iniciada. 

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

**Importante:**

Para poder crear un nuevo producto deberás contar con permisos de `administrador`.

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
Debes tener en cuenta que deberás tener una `sesión` iniciada. 

[**URL:**](http://localhost:8080/api/cart) `http://localhost:8080/api/cart`

**Método** `GET`

### `getCartById`

La URL debe incluir el ID del carrito que se desea visualizar. Además, puedes acceder a la vista de este endpoint mediante la URL que se proporciona a continuación. En este caso, se utiliza populate para obtener información detallada sobre los productos agregados. Debes tener en cuenta que deberás tener una `sesión` iniciada.

[**URL:**](http://localhost:8080/api/cart/6619078c94d150818d996ec7) `http://localhost:8080/api/cart/6619078c94d150818d996ec7`

**Método** `GET`

### `addProductToCart`

La URL debe incluir el ID del producto que se agregará y el ID del carrito al que se desea agregar.
También puedes usar el botón 'Agregar al carrito' al acceder al endpoint `getProductById`. Por defecto, el producto se agregará al carrito con el ID: **6619078c94d150818d996ec7**. Una vez completada esta operación solamente se añadirá el ID del producto y la cantidad en el carrito. Los demás detalles del producto se verán al acceder a `getCartById` mediante **populate**. Debes tener en cuenta que deberás tener una `sesión` iniciada. 

[**URL:**](http://localhost:8080/api/cart/6619078c94d150818d996ec7/product/661c232d10ed064a3bd5185f) `http://localhost:8080/api/cart/6619078c94d150818d996ec7/product/661c232d10ed064a3bd5185f`

**Método** `POST`

### `deleteProductFromCart`

La URL debe incluir el ID del producto que se eliminará y el ID del carrito en el que se desea eliminar el producto.

[**URL:**](http://localhost:8080/api/cart/6619078c94d150818d996ec7/product/661c21d010ed064a3bd51854) `http://localhost:8080/api/cart/6619078c94d150818d996ec7/product/661c21d010ed064a3bd51854`

**Método** `DELETE`

### `updateCart`

La URL debe incluir el ID del carrito en el cual se realizará la actualización. Esta debe recibir como parámetros el ID del producto y la cantidad que se desea agregar. 

[**URL:**](http://localhost:8080/api/cart/661b091c818ef788075fdb89) `http://localhost:8080/api/cart/661b091c818ef788075fdb89`

**Método** `PUT`

**Cuerpo de la Solicitud (Ejemplo para `updateCart`):**
```json
[
        {
            "product": "6608684d37dbc33df4aab5a9",
            "quantity": 10
        },
        {
            "product": "6608682b37dbc33df4aab5a7",
            "quantity": 5
        }
]
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