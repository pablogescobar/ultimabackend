require('dotenv').config(); // Carga las variables de entorno desde .env
const jwt = require('jsonwebtoken')

const PRIVATE_KEY = process.env.JWT_SECRET

module.exports = {
    generateToken: credentials => {
        const token = jwt.sign(credentials, PRIVATE_KEY, { expiresIn: '24h' })
        return token
    },

    verifyToken: (req, res, next) => {
        const authHeader = req.header.authorization
        if (!authHeader) {
            return res.status(401).json({ error: 'No funciona el token' });
        }

        const [, token] = authHeader.split(' ');
        jwt.verify(token, PRIVATE_KEY, (err, credentials) => {
            if (err) {
                return res.status(401).json({ error: 'Token Inválido' });
            }
            req.authUser = credentials;
            next();
        })
    }
}