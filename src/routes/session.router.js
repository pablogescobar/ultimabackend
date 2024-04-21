const { Router } = require('express'); // Importa la clase Router de Express para definir las rutas
const UserManager = require('../dao/dbManagers/UserManager');
const router = Router(); // Crea un enrutador

router.post('/login', (req, res) => {
    console.log(req.body);



    res.redirect('/api/products');
});

router.post('/register', async (req, res) => {
    try {
        console.log(req.body);

        const { firstName, lastName, age, email, password } = req.body;

        const UserManager = req.app.get('userManager')
        await UserManager.registerUser(firstName, lastName, age, email, password)

        res.redirect('/api/products');
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }

});


module.exports = router;