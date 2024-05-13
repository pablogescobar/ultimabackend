require('dotenv').config(); // Carga las variables de entorno desde .env
const { Users } = require('../dao/models');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const githubStrategy = require('passport-github2').Strategy;
const { Strategy, ExtractJwt } = require('passport-jwt');
const { clientID, clientSecret, callbackURL } = require('./github.private');
const { verifyToken } = require('../utils/jwt');
const UserManager = require('../dao/dbManagers/UserManager');

const cookieExtractor = req => req && req.cookies ? req.cookies['accessToken'] : null;

const initializeStrategy = () => {
    passport.use('register', new localStrategy({ passReqToCallback: true, usernameField: 'email', passwordField: 'password' },
        async (req, email, password, done) => {
            const { firstName, lastName, age } = req.body;
            try {
                const userManager = new UserManager();
                const user = await userManager.registerUser(firstName, lastName, age, email, password);
                done(null, user, { message: 'Registrado correctamente.' });
            } catch (error) {
                done(error);
            }
        }
    ));

    passport.use('login', new localStrategy({ usernameField: 'email' },
        async (username, password, done) => {
            try {
                const userManager = new UserManager();
                const user = await userManager.loginUser(username, password);
                done(null, user, { message: 'Logueado correctamente.' })
            } catch (e) {
                done(e)
            }
        }
    ))

    passport.use('resetPassword', new localStrategy({ usernameField: 'email' },
        async (username, password, done) => {
            try {
                const userManager = new UserManager();
                const userUpdated = await userManager.resetPassword(username, password);
                done(null, userUpdated, { message: 'Contraseña actualizada.' })
            } catch (e) {
                done(e)
            }
        }
    ))

    passport.use('github', new githubStrategy({ clientID, clientSecret, callbackURL },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                const userManager = new UserManager();
                const { accessToken, user } = await userManager.githubLogin(profile);

                verifyToken({ cookies: { accessToken } }, null, (err) => {
                    if (err) {
                        return done(err);
                    }

                    return done(null, { accessToken, user }, { message: 'Authentication successful' });
                });
            } catch (e) {
                done(e);
            }
        }
    ));

    passport.use('current', new Strategy({ secretOrKey: process.env.JWT_SECRET, jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]) },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (e) {
                done(e)
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

module.exports = initializeStrategy;
