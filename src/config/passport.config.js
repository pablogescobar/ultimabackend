const passport = require('passport');
const { Strategy } = require('passport-local');
const { Users } = require('../dao/models');
const { hashPassword, isValidPassword } = require('../utils/hashing');

const inicializeStrategy = () => {
    passport.use('register', new Strategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { firstName, lastName, email, age } = req.body;
            try {
                const user = await Users.findOne({ email: username });
                if (user) {
                    console.log('El usuario ya existe.');
                    return done(null, false);
                } else {
                    const newUser = {
                        firstName,
                        lastName,
                        email,
                        age: +age,
                        password: hashPassword(password)
                    }

                    // Nuevo usuario creado exitosamente
                    const result = await Users.create(newUser);
                    return done(null, result);
                }
            } catch (err) {
                done(err);
            }
        }
    ))

    passport.use('login', new Strategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await Users.findOne({ email: username })
            if (!user) {
                console.log('User not found!')
                return done(null, false)
            }

            if (!isValidPassword(password, user.password)) {
                return done(null, false)
            }

            return done(null, user)
        }
        catch (err) {
            done(err)
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

module.exports = inicializeStrategy