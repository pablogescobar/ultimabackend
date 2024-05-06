require('dotenv').config(); // Carga las variables de entorno desde .env
const { Users } = require('../dao/models');
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const cookieExtractor = req => req && req.cookies ? req.cookies['accessToken'] : null;

const initializePassport = () => {

    passport.use('jwt', new Strategy({
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor])
    }, async (jwtPayload, done) => {
        try {
            return done(null, jwtPayload.user);
        } catch (err) {
            done(err);
        }
    }
    ))

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