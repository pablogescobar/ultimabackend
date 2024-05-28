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
            } catch (e) {
                done(e)
            }
        }
    ))

    passport.use('resetPassword', new Strategy({ usernameField: 'email' },
        async (username, password, done) => {
            try {
                const userUpdated = await new UserRepository().resetPassword(username, password);
                done(null, userUpdated, { message: 'Contraseña actualizada.' })
            } catch (e) {
                done(e)
            }
        }
    ))
}

module.exports = localStrategy

// const passport = require('passport');
// const { Strategy } = require('passport-local');
// const { UserService } = require('../../services/Users.services');

// const localStrategy = () => {

//     const userService = new UserService();

//     passport.use('register', new Strategy({ passReqToCallback: true, usernameField: 'email', passwordField: 'password' },
//         async (req, email, password, done) => {
//             const { firstName, lastName, age } = req.body;
//             try {
//                 const user = await userService.registerUser(firstName, lastName, age, email, password);
//                 done(null, user, { message: 'Registrado correctamente.' });
//             } catch (error) {
//                 done(error);
//             }
//         }
//     ));

//     passport.use('login', new Strategy({ usernameField: 'email' },
//         async (username, password, done) => {
//             try {
//                 const user = await userService.loginUser(username, password);
//                 done(null, user, { message: 'Logueado correctamente.' })
//             } catch (e) {
//                 done(e)
//             }
//         }
//     ))

//     passport.use('resetPassword', new Strategy({ usernameField: 'email' },
//         async (username, password, done) => {
//             try {
//                 const userUpdated = await userService.resetPassword(username, password);
//                 done(null, userUpdated, { message: 'Contraseña actualizada.' })
//             } catch (e) {
//                 done(e)
//             }
//         }
//     ))
// }

// module.exports = localStrategy