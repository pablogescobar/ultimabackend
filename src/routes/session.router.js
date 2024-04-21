const { Router } = require('express'); // Importa la clase Router de Express para definir las rutas
const router = Router(); // Crea un enrutador

router.post('/login', (req, res) => {
    console.log(req.body);

    res.redirect('/');
});

router.post('/register', (req, res) => {
    console.log(req.body);

    res.redirect('/');
});


module.exports = router;