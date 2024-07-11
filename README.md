# Desafío Opcional 4 - Coderhouse Backend

### Nuevos Cambios

- Se crearon tests para probar los diferentes endpoints de la aplicación.
- Se crearon tests unitarios para probar algunas funcionalidades del proyecto.

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

Una vez ejecutados estos comandos en la consola de tu editor de texto aparecerá una URL con la que podrás ver los productos. y podrás acceder a la documentación y a los testeos.

## Testing

Para poder correr los tests de la aplicación deberás haber levantado el servidor en primer lugar. Una vez hecho esto, deberás abrir una nueva consola y ejecutar:

````bash
npm test
````

Luego de eso, podrás ver cómo corren los tests unitarios y los supertests sobre los diferentes endpoints de la aplicación. Es importante que tengas en cuenta que debes tener abierta la carpeta del proyecto en tu Visual Studio Code para que los tests corran de forma correcta, de lo contrario podrías tener errores al tratar de correrlos.

## Documentación

Para revisar la docuemtación parcial de los **endpoints** lo puedes hacer desde [http://localhost:8080/apidocs/](http://localhost:8080/apidocs/) o bien desde [aquí](https://github.com/Fede-Diiorio/backend_Entregas_Di-Iorio/tree/main/examples) donde ya se encuentran listados todos los endpoint sumado a una breve descripción.

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

#### Dependencias

- [@faker-js/faker](https://fakerjs.dev/guide/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Connet-mongo](https://www.npmjs.com/package/connect-mongo)
- [Cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Express](https://www.npmjs.com/package/express)
- [Express-handlebars](https://handlebarsjs.com/guide/#what-is-handlebars)
- [Express-session](https://www.npmjs.com/package/express-session)
- [Helmet](https://www.npmjs.com/package/helmet)
- [Jsonwebtoken](https://jwt.io/)
- [Mongoose](https://mongoosejs.com/docs/guide.html)
- [Mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2)
- [Nodemailer](https://nodemailer.com/about/)
- [Passport](https://www.passportjs.org/docs/)
- [Passport-github2](https://www.passportjs.org/packages/passport-github2/)
- [Passport-jwt](https://www.passportjs.org/packages/passport-jwt/)
- [Passport-local](https://www.passportjs.org/packages/passport-local/)
- [Socket.io](https://socket.io/docs/v4/)
- [Swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
- [Swagger-ui-express](https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/)
- [Winston](https://www.npmjs.com/package/winston)

#### Dependencias de Desarrollo
- [Chai](https://www.chaijs.com/)
- [Mocha](https://mochajs.org/)
- [Supertest](https://www.npmjs.com/package/supertest)