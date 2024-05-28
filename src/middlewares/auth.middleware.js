module.exports = {
    isSuperAdmin: (req, res, next) => {
        if (req.user && req.user.rol === 'superAdmin') {
            return next();
        }
        return res.status(403).json({ message: 'Acceso denegado: Solamente super administradores' });
    },

    isAdmin: (req, res, next) => {
        if (req.user && (req.user.rol === 'admin' || req.user.rol === 'superAdmin')) {
            return next();
        }
        return res.status(403).json({ message: 'Acceso denegado: Solamente administradores' });
    },

    isUser: (req, res, next) => {
        if (req.user && req.user.rol === 'user') {
            return next();
        }
        return res.status(403).json({ message: 'Acceso denegado: Solamente usuarios' });
    }
}



