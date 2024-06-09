require('dotenv').config(); // Carga las variables de entorno desde .env
const { Router } = require('express'); // Importa la clase Router de Express para definir las rutas
const router = Router(); // Crea un enrutador
const passport = require('passport');
const { Controller } = require('../controller/sessions.controller');
const { verifyToken } = require('../middlewares/jwt.middleware');
const { isSuperAdmin } = require('../middlewares/auth.middleware');

router.post('/register', passport.authenticate('register', { failureRedirect: '/', session: false }), (_, res) => new Controller().redirect(res));

router.post('/login', passport.authenticate('login', { failureRedirect: '/', session: false }), async (req, res) => new Controller().loginUser(req, res));

router.get('/current', passport.authenticate('current', { session: false }), (req, res) => new Controller().current(req, res));

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/githubcallback', passport.authenticate('github', { session: false, failureRedirect: '/login' }), (req, res) => new Controller().githubCb(req, res));

router.post('/resetPassword', passport.authenticate('resetPassword', { failureRedirect: '/' }), async (_, res) => new Controller().redirect(res));

router.get('/logout', (req, res) => new Controller().logout(req, res));

router.delete('/', verifyToken, isSuperAdmin, (req, res) => new Controller().deleteUser(req, res));

module.exports = router;