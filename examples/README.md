# Guía de endpoints

Todos los endpoints deben ser ejecutados desde Postman A continuación, se presenta la lista completa de todos los endpoints disponibles.

## Testing

### `logger`

Permite probar todos los loggers del proyecto dependiendo de si el mismo se encuentra en un entorno productivo o de desarrollo.

[**URL:**](http://localhost:8080/loggertest) `http://localhost:8080/loggertest`

**Método** `GET`

## Users

### `register`

Registra un usuario nuevo en la base de datos.

[**URL:**](http://localhost:8080/api/sessions/register) `http://localhost:8080/api/sessions/register`

**Método** `POST`

**Cuerpo de la Solicitud (Ejemplo para `register`):**

```json
{
    "firstName": "Ejemplo",
    "lastName": "Tester",
    "age": 18,
    "email": "ejemplo@hotmail.com",
    "password": "contraseña"
}
````

### `login`

Loguea un usuario existente en la base de datos. Hecho esto, mediante un middleware se comprobará tener los correspondientes permisos para ingresar a los distintos endpoints. En caso de no se así, utilizando **JWT**, se genera un token que podrás encontrar en los headers de Postman como `accessToken`, figurando como una cookie. Dicha cookie puede utilizarse en otros endpoints para obtener ciertos permisos. Para esto, tendrás que ingresar a la sección de **Authorization** en tu Postman y configurar el **Auth Type** como **Bearer Token**. Seguidamente, deberás pegar el token obtenido en la cookie en el campo de **token** en el endpoint donde se soliciten permisos de acceso.

[**URL:**](http://localhost:8080/api/sessions/login) `http://localhost:8080/api/sessions/login`

**Método** `POST`

**Cuerpo de la Solicitud (Ejemplo para `login`):**

```json
{
    "email": "ejemplo@hotmail.com",
    "password": "contraseña"
}
````
### `resetPassword`

Envia un email al usuario ingresado para poder recuperar su contraseña.

[**URL:**](http://localhost:8080/api/sessions/resetPassword) `http://localhost:8080/api/sessions/resetPassword`

**Método** `POST`

**Cuerpo de la Solicitud (Ejemplo para `resetPassword`):**

```json
{
    "email": "ejemplo@hotmail.com",
}
````

### `resetPasswordWarning`

Avisa al usuario que el mail se ha enviado a su cuenta de correo o bien avisa que el link de recuperación ha expirado.

[**URL:**](http://localhost:8080/resetPasswordWarning) `http://localhost:8080/resetPasswordWarning`

**Método** `GET`

### `verifyResetPassword`

Deberá ingresar una nueva contraseña y confirmarla para poder realizar la actualización. Tenga en cuenta que el link expira y `uid` varía dependiendo lo que reciba en su mail.

[**URL:**](http://localhost:8080/api/sessions/resetPassword/9950531852) `http://localhost:8080/api/sessions/resetPassword/:uid`

**Método** `POST`

**Cuerpo de la Solicitud (Ejemplo para `resetPassword`):**

```json
{
    "newPassword": "nuevaContraseña",
    "confirmPassword": "nuevaContraseña"
}
````

### `curretUser`

Muestra la información que contiene el token de logeo del usuario.

[**URL:**](http://localhost:8080/api/sessions/current) `http://localhost:8080/api/sessions/current`

**Método** `GET`

### `logout`

Elimina la cookie `accessToken` la cual contiene la información del usuario.

[**URL:**](http://localhost:8080/api/sessions/logout) `http://localhost:8080/api/sessions/logout`

**Método** `GET`

### `deleteUser`

Elimina el usuario y su carrito según el email.

[**URL:**](http://localhost:8080/api/sessions) `http://localhost:8080/api/sessions`

**Método** `DELETE`

**Cuerpo de la Solicitud (Ejemplo para `deleteUser`):**

```json
{
    "email": "correo@ejemplo.com"
}
````

### `changeRole`

La URL debe contener el ID del usuario para poder variar el rol del mismo entre **user** y **premium**. Para mantener la tendencia de los demás endpoint y tipificar con la consiga, `changeRole` tiene dos variantes en la URL

[**URL:**](http://localhost:8080/api/sessions/premium/6664aa9e60d9638a4b0b2859) `http://localhost:8080/api/sessions/premium/6664aa9e60d9638a4b0b2859`

[**URL:**](http://localhost:8080/api/users/premium/6664aa9e60d9638a4b0b2859) `http://localhost:8080/api/users/premium/6664aa9e60d9638a4b0b2859`

**Método** `POST`

## Carts

### `getCarts`

Busca y muestra todos los carritos existentes en la base de datos.

[**URL:**](http://localhost:8080/api/cart) `http://localhost:8080/api/cart`

**Método** `GET`

### `getCartById`

La URL debe incluir el ID del carrito que se desea visualizar. Además, puedes acceder a la vista de este endpoint mediante la URL que se proporciona a continuación. En este caso, se utiliza populate para obtener información detallada sobre los productos agregados. 

[**URL:**](http://localhost:8080/api/cart/6619078c94d150818d996ec7) `http://localhost:8080/api/cart/6619078c94d150818d996ec7`

**Método** `GET`

### `addCart`

Crea un nuevo carrito en la base de datos.

[**URL:**](http://localhost:8080/api/cart) `http://localhost:8080/api/cart`

**Método** `POST`

### `addProductToCart`

La URL debe incluir el ID del producto que se agregará y el ID del carrito al que se desea agregar. Una vez completada esta operación solamente se añadirá el ID del producto y la cantidad en el carrito. Los demás detalles del producto se verán al acceder a `getCartById` mediante **populate**. 

[**URL:**](http://localhost:8080/api/cart/6619078c94d150818d996ec7/product/661c232d10ed064a3bd5185f) `http://localhost:8080/api/cart/6619078c94d150818d996ec7/product/661c232d10ed064a3bd5185f`

**Método** `POST`

### `updateCart`

La URL debe incluir el ID del carrito en el cual se realizará la actualización. Esta debe recibir como parámetros el ID del producto y la cantidad que se desea agregar. 

[**URL:**](http://localhost:8080/api/cart/6619078c94d150818d996ec7) `http://localhost:8080/api/cart/6619078c94d150818d996ec7`

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

### `deleteProductFromCart`

La URL debe incluir el ID del producto que se eliminará y el ID del carrito en el que se desea eliminar el producto.

[**URL:**](http://localhost:8080/api/cart/6619078c94d150818d996ec7/product/661c21d010ed064a3bd51854) `http://localhost:8080/api/cart/6619078c94d150818d996ec7/product/661c21d010ed064a3bd51854`

**Método** `DELETE`

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

### `generateTicket`

La URL debe incluir el ID del carrito en el que se desea ejecutar la compra para generar el ticket.

[**URL:**](http://localhost:8080/api/cart/6644d99b675b7a6dfb9fec6b/purchase) `http://localhost:8080/api/cart/6644d99b675b7a6dfb9fec6b/purchase`

**Método** `POST`

## Products

### `getProducts`

Busca todos los productos disponibles en la base de datos.

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

La URL debe incluir el ID del producto que desea buscar.

[**URL:**](http://localhost:8080/api/products/6619078c94d150818d996ec7) `http://localhost:8080/api/products/6619078c94d150818d996ec7`

**Método** `GET`

### `getMockingProducts`

Genera productos aleatorios mediante **faker-js**

[**URL:**](http://localhost:8080/mockingproducts) `http://localhost:8080/mockingproducts`

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

### Nota:

Si tienes problemas al conectar con la base de datos de Mongo Atlas, te aconsejo que reemplaces la dirección de Atlas por la de tu MongoDB local para probar la aplicación. Ten en cuenta que esta dirección es una variable de entorno, así que deberás reemplazar el enlace que figura en `MONGO_URL=` por el de tu MongoDB local.