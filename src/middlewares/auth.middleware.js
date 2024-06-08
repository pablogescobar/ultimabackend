module.exports = {
    isSuperAdmin: (req, res, next) => {
        if (req.user && req.user.rol === 'superAdmin') {
            return next();
        }
        req.logger.warning('Acceso denegado: Solamente super administradores')
        return res.status(403).json({ message: 'Acceso denegado: Solamente super administradores' });
    },

    isAdmin: (req, res, next) => {
        if (req.user && (req.user.rol === 'admin' || req.user.rol === 'superAdmin')) {
            return next();
        }
        req.logger.warning('Acceso denegado: Solamente administradores')
        return res.status(403).json({ message: 'Acceso denegado: Solamente administradores' });
    },

    isUser: (req, res, next) => {
        if (req.user && req.user.rol === 'user') {
            return next();
        }
        req.logger.warning('Acceso denegado: Solamente usuarios')
        return res.status(403).json({ message: 'Acceso denegado: Solamente usuarios' });
    }
}



