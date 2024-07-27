const { Router } = require('express');
const router = Router();
const { Controller } = require('../controller/sessionsView.controller');
const { verifyToken } = require('../middlewares/jwt.middleware');
const { isUser } = require('../middlewares/auth.middleware');

router.get('/', verifyToken, (req, res) => new Controller().index(req, res));

router.get('/login', (_, res) => new Controller().login(res));

router.get('/register', (_, res) => new Controller().register(res));

router.get('/profile', verifyToken, (req, res) => new Controller().profile(req, res));

router.get('/resetPassword', (_, res) => new Controller().resetPassword(res));

router.get('/resetPasswordWarning', (req, res) => new Controller().resetPasswordWarning(req, res));

router.get('/resetPassword/:tid', (req, res) => new Controller().verifyResetPassword(req, res));

router.get('/changeRole', verifyToken, (req, res) => new Controller().changeRole(req, res));

router.get('/documents', verifyToken, isUser, (req, res) => new Controller().documents(req, res));

module.exports = router;