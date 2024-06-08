const { logger } = require('../utils/logger');

module.exports = {
    useLogger: (req, res, next) => {
        req.logger = logger;
        // req.logger.http(`Metodo: ${req.method}, en ${req.url}`);
        next();
    }
}