require('dotenv').config(); // Carga las variables de entorno desde .env
const { Users } = require('../dao/models');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const githubStrategy = require('passport-github2').Strategy;
const { Strategy, ExtractJwt } = require('passport-jwt');
const { hashPassword, isValidPassword } = require('../utils/hashing');
const { default: mongoose } = require('mongoose');
const { ObjectId } = mongoose.Types;
const { clientID, clientSectret, callbackURL } = require('./github.private');

const cookieExtractor = req => req && req.cookies ? req.cookies['accessToken'] : null;

const initializeStrategy = () => {
    passport.use('register', new localStrategy({ passReqToCallback: true, usernameField: 'email', passwordField: 'password' },
        async (req, username, password, done) => {
            const { firstName, lastName, email, age } = req.body;
            try {
                const user = await Users.findOne({ email: username });
                if (user || username === 'adminCoder@coder.com') {
                    done(null, false, { message: 'User already exists' });
                } else {
                    const newUser = {
                        firstName,
                        lastName,
                        email,
                        age: +age,
                        password: hashPassword(password)
                    }
                    const result = await Users.create(newUser);
                    return done(null, result, { message: 'Registered successfully' })
                }
            } catch (e) {
                done(e)
            }
        }))

    passport.use('login', new localStrategy({ usernameField: 'email' },
        async (username, password, done) => {
            try {
                if (username === 'adminCoder@coder.com' && password === 'adminCod3r13') {
                    adminUser = {
                        _id: new ObjectId(),
                        firstName: 'Romina',
                        lastName: 'Molina',
                        age: 18,
                        email: 'adminCoder@coder.com',
                        password: 'adminCod3r13',
                        rol: 'admin'
                    };
                    return done(null, adminUser);
                } else {
                    const user = await Users.findOne({ email: username });
                    if (!user) {
                        return done(null, false, { message: 'User not found' });
                    }

                    if (!isValidPassword(password, user.password)) {
                        return done(null, false, { message: 'Wrong password' });
                    }

                    return done(null, user, { message: 'Login successfull' });
                }
            } catch (e) {
                done(e)
            }
        }
    ))

    passport.use('resetPassword', new localStrategy({ usernameField: 'email' },
        async (username, password, done) => {
            if (!username || !password) {
                return done(null, false, { message: 'Invalid credentials' });
            }
            const user = await Users.findOne({ email: username });
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            await Users.updateOne({ email: username }, { $set: { password: hashPassword(password) } });
            const userUpdated = await Users.findOne({ email: username });

            return done(null, userUpdated, { message: 'Updated successfully' });
        }
    ))

    passport.use('github', new githubStrategy({ clientID, clientSectret, callbackURL },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                const user = await Users.findOne({ email: profile._json.email });
                if (user) {
                    return done(null, user, { message: 'Login successfully' });
                }
                const fullName = profile._json.name;
                const firstName = fullName.substring(0, fullName.lastIndexOf(' '));
                const lastName = fullName.substring(fullName.lastIndexOf(' ') + 1);

                const newUser = {
                    firstName,
                    lastName,
                    age: 30,
                    email: profile._json.email,
                    password: ''
                }

                const result = await Users.create(newUser);
                return done(null, result, { message: 'Registered successfully' });
            } catch (e) {
                done(e)
            }
        }
    ))

    passport.use('jwt', new Strategy({ secretOrKey: process.env.JWT_SECRET, jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]) },
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
