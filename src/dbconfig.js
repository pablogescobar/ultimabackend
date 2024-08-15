require('dotenv').config();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/mydatabase'; // Asegúrate de que la URL sea correcta

module.exports = { mongoUrl };
