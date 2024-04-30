const { Users } = require('../dao/models');
const passport = require('passport');
const jwt = require('passport-jwt');
require('dotenv').config(); // Carga las variables de entorno desde .env

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET,
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (err) {
            return done(err)
        }
    }))

    passport.serializeUser((user, done) => {
        console.log('Serailized: ', user);
        done(null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        console.log('Deserialized: ', id)
        const user = await Users.findById(id);
        done(null, user)
    })
}

module.exports = initializePassport;