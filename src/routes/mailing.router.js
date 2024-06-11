const { Router } = require('express');
const router = Router();
// const { Controller } = require('../controller/mailing.controller');
const { Controller } = require('../controller/sessions.controller');

router.get('/', async (req, res) => new Controller().verifyEmail(req, res));

router.post('/tokencheck', async (req, res) => new Controller().verifyToken(req, res));

module.exports = router;