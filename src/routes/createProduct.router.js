const { Router } = require('express');
const { verifyToken } = require('../utils/jwt');
const router = Router();
const { Controller } = require('../controller/addProductView.controller');
const { isAdmin } = require('../middlewares/access.middleware');

router.get('/', verifyToken, isAdmin, (req, res) => new Controller().viewForm(req, res));

router.post('/', isAdmin, (req, res) => new Controller().addProduct(req, res));

module.exports = router;