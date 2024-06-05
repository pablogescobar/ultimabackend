# Desafío 8 - Coderhouse Backend

### Nuevos Cambios

- Se agregó un nuevo middleware `errorHandler.middleware`.
- Se creó un nuevo endpoint `/mockingproducts` que genera productos aleatorios.
- Se implementaron practicas de `CustomError` para utilizar errores personalizados donde sean requeridos.

## Correr de manera local
```bash
git clone https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio.git
cd backend_Entregas_Di-Iorio
npm install
```

Para finalizar la instalación deberá crear un archivo `.env` y agregar las respectivas varialbles de entorno. Puedes ver un ejemplo [aquí.](https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio/blob/main/examples/.env.example) 

#### Como ubicar el archivo **.env**:

![Imagen de env](https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio/blob/main/examples/envExample.png?raw=true)

Luego de este paso podrás correr el proyecto con el siguiente comando:

````bash
nodemon src/app
````

Una vez ejecutados estos comandos en la consola de tu editor de texto aparecerá una URL con la que podrás ver los productos.

## División en Capas
- `Config`: En esta capa se desarrollaron todas las estrategias de passport que tienen que ver con logeo y registro de usuarios.
- `Controller`: En esta capa se lleva a cabo todo el manejo relacionado a los request y response que vienen desde la capa de **router**.
- `DAO`: En esta capa se implementó todo lo relacionado con la persistencia en la base de datos.
- `DTO`: Esta capa se ocupa de formatear datos como, por ejemplo, los usuarios.
- `Repository`: Esta capa se encarga de realizar las comprobaciones que tienen que ver con la lógica de negocio para enviar la información al **DAO**.
- `Middlewares`: Ofrece funciones y servicios comunes que se implementan en el código con el fin de hacerlo más performante.
- `Routes`: Esta capa se encarga de enviar el request y el response, tanto desde la API y de las **views**, a la capa de **controller**.
- `Utils`: En esta capa se úbican algunas funciones a modo de "helpers" que se pueden utilizar en el resto del código. Similar a la capa de **middlewares**.
- `Views`: En esta capa se manejan todo lo que tenga que ver con el HTML y CSS que se pueda llegar a devolver en algunos response.

## Construido usando

- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Connet-mongo](https://www.npmjs.com/package/connect-mongo)
- [Cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Express](https://www.npmjs.com/package/express)
- [Express-handlebars](https://handlebarsjs.com/guide/#what-is-handlebars)
- [Express-session](https://www.npmjs.com/package/express-session)
- [Jsonwebtoken](https://jwt.io/)
- [Mongoose](https://mongoosejs.com/docs/guide.html)
- [Mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2)
- [Passport](https://www.passportjs.org/docs/)
- [Passport-github2](https://www.passportjs.org/packages/passport-github2/)
- [Passport-jwt](https://www.passportjs.org/packages/passport-jwt/)
- [Passport-local](https://www.passportjs.org/packages/passport-local/)
- [Socket.io](https://socket.io/docs/v4/)

## Endpoints

Puedes revisar una lista completa de los **endpoints** de la API ingresando [aquí](https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio/tree/main/examples).


### Nota:

Si tienes problemas al conectar con la base de datos de Mongo Atlas, te aconsejo que reemplaces la dirección de Atlas por la de tu MongoDB local para probar la aplicación. Ten en cuenta que esta dirección es una variable de entorno, así que deberás reemplazar el enlace que figura en `MONGO_URL=` por el de tu MongoDB local.