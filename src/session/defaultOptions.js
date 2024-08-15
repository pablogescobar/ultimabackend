require('dotenv').config();

module.exports = {
    secret: process.env.SESSION_SECRET || 'default-secret', // Usa una clave secreta por defecto para desarrollo
    resave: false, // No es necesario volver a guardar la sesión si no ha habido cambios
    saveUninitialized: false // No guardar sesiones nuevas que aún no se han modificado
};
