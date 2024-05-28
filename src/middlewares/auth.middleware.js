// module.exports = {

//     userIsLoggedIn: (req, res, next) => {
//         // el usuario debe tener una sesión iniciada
//         const isLoggedIn = ![null, undefined].includes(req.session.user)
//         if (!isLoggedIn) {
//             return res.status(401).json({ error: 'User should be logged in!' })
//         }

//         next()
//     },

//     userIsNotLoggedIn: (req, res, next) => {
//         // el usuario no debe tener una sesión iniciada
//         const isLoggedIn = ![null, undefined].includes(req.session.user)
//         if (isLoggedIn) {
//             return res.status(401).json({ error: 'User should not be logged in!' })
//         }

//         next()
//     }
// }

module.exports = {
    isAdmin: (req, res, next) => {
        if (req.user && req.user.rol === 'admin') {
            return next();
        }
        return res.status(403).json({ message: 'Access forbidden: admins only' });
    },

    isUser: (req, res, next) => {
        if (req.user && req.user.rol === 'user') {
            return next();
        }
        return res.status(403).json({ message: 'Access forbidden: users only' });
    }
}



