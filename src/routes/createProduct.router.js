const { Router } = require('express'); // Importa la clase Router de Express para definir las rutas
const { verifyToken } = require('../utils/jwt');
const router = Router(); // Crea un enrutador
const { Controller } = require('../controller/addProductView.controller');

router.get('/', verifyToken, (req, res) => new Controller().viewForm(req, res));

router.post('/', (req, res) => new Controller().addProduct(req, res));

module.exports = router;