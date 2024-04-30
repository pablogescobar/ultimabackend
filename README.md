# Desafío 6 - Coderhouse Backend

### Con respecto a esta entrega
- Se implementó `bcrypt` con el fin de hashear las contraseñas.
- Se cambió el método de `userManager` por estrategías de `passport` para el logueo y el registro.
- Con la utilización de `passport` ahora el posible realizar un login con **Github**.

## Correr de manera local
```bash
git clone https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio.git
cd backend_Entregas_Di-Iorio
npm install
```

Para finalizar la instalación deberá crear un archivo `.env` y agregar las respectivas varialbles de entorno. Puedes ver un ejemplo [aquí.](https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio/blob/challenge6/.env.example) Luego de este paso podrás correr el pryecto con el siguiente comando:

````bash
nodemon src/app
````

Una vez ejecutados estos comandos en la consola de tu editor de texto aparecerá una URL con la que podrás ver los productos.

## Construido usando

- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Connet-mongo](https://www.npmjs.com/package/connect-mongo)
- [Cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Express](https://www.npmjs.com/package/express)
- [Express-handlebars](https://handlebarsjs.com/guide/#what-is-handlebars)
- [Express-session](https://www.npmjs.com/package/express-session)
- [Mongoose](https://mongoosejs.com/docs/guide.html)
- [Mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2)
- [Passport](https://www.passportjs.org/docs/)
- [Passport-github2](https://www.passportjs.org/packages/passport-github2/)
- [Passport-local](https://www.passportjs.org/packages/passport-local/)
- [Socket.io](https://socket.io/docs/v4/)

## Vistas

### `Home`

Para esta entrega en especifico, no hace falta el uso de postman dado a que podrás controlar todo desde la interfaz. Si no tienes una sesión iniciada verás los botones de `login` y `register`. Tendrás acceso al listado de productos pero no podrás ver los precios ni podrás ver el botón de **Agregar al carrito**.


[**URL:**](http://localhost:8080) `http://localhost:8080`

### `Register`

Si haces clic en el botón `register`, podrás ver un formulario en el cual deberás completar los campos para ingresar tu información en la base de datos. Es importante aclarar que solo son requeridos los campos de **email** y **contraseña**. En caso de no completar el resto de los campos, estos serán completados automáticamente por el `userManager`.

![Imagen de register](https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio/blob/challengeLogin/public/img/registerExample.png?raw=true)

[**URL:**](http://localhost:8080/register) `http://localhost:8080/register`

### `Login`

Una vez registrado, el usuario deberás iniciar sesión, para lo cual tendrás que hacer clic en el botón `login` y completar con el **email** y la **contraseña**. Ten en cuenta que también podrás iniciar sesión utilizando `github` haciendo clic en el respectivo botón.

![Imagen de login](https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio/blob/sec/public/img/loginExample.png?raw=true)

[**URL:**](http://localhost:8080/login) `http://localhost:8080/login`

### `ResetPassword`

Si has olvidado tu contraseña puedes podrás restablecerla fácilmente. De momento solo bastará con ingresar un **email** registrado y una nueva contraseña dado a que por ahora no se realizan comprobaciones de dos pasos.

![Imagen de resetPass](https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio/blob/sec/public/img/resetPasswordExample.png?raw=true)

[**URL:**](http://localhost:8080/api/sessions/resetPassword) `http://localhost:8080/api/sessions/resetPassword`

### `Sesión Iniciada`

Cuando hayas completado estos pasos, tendrás acceso al resto de las vistas, excepto a la de  **Agregar Producto**, para la que necesitarás permisos de administrador. Para obtener estos permisos, tendrás que completar los campos del `login` con el email `adminCoder@coder.com` y la contraseña `adminCod3er123`. Es importante aclarar que los datos de `administrador` se comprobarán en la estrategía `passport`, dado que este usuario no existe en la base de datos.

![Imagen de loggedIn](https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio/blob/challengeLogin/public/img/ejemploConLogin.png?raw=true)

Con todo esto listo, verás todos los botones habilitados. Si deseas ver las características del usuario, deberás ingresar en `Sesión` y luego en `Perfil`. Allí podrás encontrar información del usuario, como por ejemplo, el rol del usuario.

[**URL:**](http://localhost:8080) `http://localhost:8080`

### `getProducts`

Aquí podrás ver la lista de productos de la base de datos. Debes tener en cuenta que para ver los precios deberás tener una `sesión` iniciada.

[**URL:**](http://localhost:8080/products) `http://localhost:8080/products`

#### **Parámetros de consulta opcionales:**

- `page` (número): Indica la página deseada. Por defecto, es la página 1.
- `limit` (número): Especifica el número máximo de productos por página. Por defecto, es 10.
- `sort` (cadena): Ordena los productos por precio en orden ascendente (asc) o descendente (desc).
- `category` (cadena): Filtra los productos por categoría.
- `availability` (booleano): Filtra los productos por disponibilidad. true muestra solo productos disponibles, false muestra solo productos no disponibles.

#### Ejemplo de uso:

```http
http://localhost:8080/products?page=1&limit=5&sort=asc&category=almacenamiento&availability=true
````

### `getCarts`

Aquí podrás ver la lista de carritos que estan creados en la base de datos. Debes tener en cuenta que para acceder a esta vista deberás tener una `sesion` iniciada.

[**URL:**](http://localhost:8080/cart) `http://localhost:8080/cart`

### `getCartsById`

Aquí podrás acceder a un carrito de manera individual. En esta vista podrás divisar la totalidad de productos agregados al carrito si es que existen. Es importante aclarar que se utiliza `populate` para obtener ciertos datos de los productos.

[**URL:**](http://localhost:8080/cart/6619078c94d150818d996ec7) `http://localhost:8080/cart/6619078c94d150818d996ec7`

### `addProduct`

En esta vista deberás completar un formulario para poder agregar un producto nuevo a la base de datos. Es importante tener en cuenta que para tener acceso a esta vista debes tener permisos de `administrador`.

[**URL:**](http://localhost:8080/createProduct) `http://localhost:8080/createProduct`

**Ejemplo:**

![Imagen del formulario](https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio/blob/sec/public/img/imagenEjemplo1.png?raw=true)

## Endpoints API

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

Si tienes problemas al conectar con la base de datos de Mongo Atlas, te aconsejo que reemplaces la dirección de Atlas por la de tu MongoDB local para probar la aplicación. Ten en cuenta que esta dirección es una variable de entorno, así que deberás reemplazar el enlace que figura en `MONGO_URL=` por el de tu MongoDB local.