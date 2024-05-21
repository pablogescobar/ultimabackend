# Desafío 7 - Coderhouse Backend

### Nuevos Cambios

- Se agregó el uso de variables de entorno.
- Se implementó el uso de arquitectura en capas para desestructurar el código en bloques más simples.


### Con respecto a esta entrega
- `Config`: En esta capa se desarrollaron todas las estrategias de passport que tienen que ver con logeo y registro de usuarios.
- `Controller`: En esta capa se lleva a cabo todo el manejo relacionado a los request y response que vienen desde la capa de **router**.
- `DAO`: En esta capa se implementó toda la lógica de uso de base de datos.
- `Models`: En esta capa se agrupan los modelos utilizados por la capa de **DAO** para realizar cambios a la base de datos.
- `Routes`: Esta capa se encarga de enviar el request y el response, tanto desde la API y de las **views**, a la capa de **controller**.
- `Services`: Esta capa se encarga de realizar algunas comprobaciones con el fin de enviar información filtrada previamente a la capa de **DAO** para que esta se ocupe de hacer los cambios pertinentes en la base de datos.
- `Utils`: En esta capa se úbican algunas funciones a modo de "helpers" que se pueden utilizar en el resto del código.
- `Views`: En esta capa se manejan todo lo que tenga que ver con el HTML y CSS que se pueda llegar a devolver en algunos response.

## Correr de manera local
```bash
git clone https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio.git
cd backend_Entregas_Di-Iorio
npm install
```

Para finalizar la instalación deberá crear un archivo `.env` y agregar las respectivas varialbles de entorno. Puedes ver un ejemplo [aquí.](https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio/blob/main/examples/.env.example) 

#### Como ubicar el archivo **.env**:

![Imagen de env](https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio/blob/main/examples/envExample.png)

Luego de este paso podrás correr el proyecto con el siguiente comando:

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