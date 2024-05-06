require('dotenv').config(); // Carga las variables de entorno desde .env
module.exports = {
    dbName: 'ecommerce',
    mongoUrl: process.env.MONGO_URL
}
