const passport = require('passport');
const { Strategy } = require('passport-local');
const { UserRepository } = require('../../repository/user.repository');

const localStrategy = () => {
    passport.use('register', new Strategy({ passReqToCallback: true, usernameField: 'email', passwordField: 'password' },
        async (req, email, password, done) => {
            const { firstName, lastName, age } = req.body;
            try {
                const user = await new UserRepository().registerUser(firstName, lastName, age, email, password);
                done(null, user, { message: 'Registrado correctamente.' });
            } catch (error) {
                done(error);
            }
        }
    ));

    passport.use('login', new Strategy({ usernameField: 'email' },
        async (username, password, done) => {
            try {
                const user = await new UserRepository().loginUser(username, password);
                done(null, user, { message: 'Logueado correctamente.' })
            } catch (error) {
                console.log(e);
                done(error)
            }
        }
    ))

    passport.use('resetPassword', new Strategy({ usernameField: 'email' },
        async (username, password, done) => {
            try {
                const userUpdated = await new UserRepository().resetPassword(username, password);
                done(null, userUpdated, { message: 'Contraseña actualizada.' })
            } catch (error) {
                done(error)
            }
        }
    ))
}

module.exports = localStrategy