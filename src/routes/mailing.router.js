const { Router } = require('express');
const router = Router();
const { Controller } = require('../controller/mailing.controller');

router.get('/', async (req, res) => new Controller().sendMail(req, res));

module.exports = router;