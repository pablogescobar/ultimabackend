require('dotenv').config(); // Carga las variables de entorno desde .env
const { Users, Carts } = require('../dao/models');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const githubStrategy = require('passport-github2').Strategy;
const { Strategy, ExtractJwt } = require('passport-jwt');
const { clientID, clientSecret, callbackURL } = require('./github.private');
const { generateToken } = require('../utils/jwt');
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
                let user = await Users.findOne({ email: profile._json.email });

                if (!user) {
                    const fullName = profile._json.name;
                    const firstName = fullName.substring(0, fullName.lastIndexOf(' '));
                    const lastName = fullName.substring(fullName.lastIndexOf(' ') + 1);
                    const newCart = await Carts.create({ products: [] });

                    const newUser = {
                        firstName,
                        lastName,
                        age: 30,
                        email: profile._json.email,
                        password: '',
                        cart: newCart._id
                    }

                    user = await Users.create(newUser);
                }

                // Genera el token JWT
                const accessToken = generateToken({ email: user.email, _id: user._id.toString(), rol: user.rol, firstName: user.firstName, lastName: user.lastName, age: user.age, cart: user.cart._id });

                return done(null, { accessToken, user }, { message: 'Authentication successful' });
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
