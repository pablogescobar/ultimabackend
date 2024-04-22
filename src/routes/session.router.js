const { Router } = require('express'); // Importa la clase Router de Express para definir las rutas
const router = Router(); // Crea un enrutador

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: 'Debe ingresar un mail y una contraseña.' });
        }

        const userManager = req.app.get('userManager');
        const user = await userManager.loginUser(email, password);

        if (!user) {
            return res.status(400).json({ error: 'Email o contraseña incorrectas.' });
        }

        req.session.user = { email, _id: user._id.toString(), rol: user.rol, firstName: user.firstName, lastName: user.lastName }
        res.redirect('/api/products');
    } catch (err) {
        res.status(500).json({ error: err.message })
    }

});

router.get('/logout', (req, res) => {
    req.session.destroy(_ => {
        res.redirect('/');
    })
})

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, age, email, password } = req.body;

        const userManager = req.app.get('userManager');
        await userManager.registerUser(firstName, lastName, age, email, password);

        res.redirect('/');
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }

});


module.exports = router;