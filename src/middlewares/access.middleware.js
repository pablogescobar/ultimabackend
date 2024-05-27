function isAdmin(req, res, next) {
    if (req.user && req.user.rol === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Access forbidden: admins only' });
}

function isUser(req, res, next) {
    if (req.user && req.user.rol === 'user') {
        return next();
    }
    return res.status(403).json({ message: 'Access forbidden: users only' });
}

module.exports = { isAdmin, isUser };
