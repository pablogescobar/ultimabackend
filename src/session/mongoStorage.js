const MongoStore = require('connect-mongo');
const { mongoUrl } = require('../dbconfig'); // Asegúrate de que esta ruta sea correcta

const store = MongoStore.create({
  mongoUrl: mongoUrl, // Usa la URL de MongoDB definida en dbconfig.js
  collectionName: 'sessions', // Nombre de la colección para almacenar sesiones
});

module.exports = store;
