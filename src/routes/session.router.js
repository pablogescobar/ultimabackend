const { Router } = require('express'); // Importa la clase Router de Express para definir las rutas
const router = Router(); // Crea un enrutador
const passport = require('passport');

router.post('/login', passport.authenticate('login', { failureRedirect: 'api/sessions/failogin' }), async (req, res) => {
    try {
        req.session.user = { email: req.user.email, _id: req.user._id.toString(), rol: req.user.rol, firstName: req.user.firstName, lastName: req.user.lastName }
        res.redirect('/api/products');
    } catch (err) {
        res.status(500).json({ error: err.message })
    }

});

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { })

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = { _id: req.user._id };
    res.redirect('/');
})

router.get('/faillogin', (_, res) => {
    res.send('Hubo un error de logeo.');
})

router.get('/resetPassword', async (_, res) => {
    try {

        res.render('reset_password', {
            titlePage: 'Reset Password',
            style: ['styles.css']
        });
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
})

router.post('/resetPassword', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: 'Debe establecer un email y una nueva contraseña.' });
        }
        const userManager = req.app.get('userManager');
        await userManager.resetPassword(email, password);
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/logout', (req, res) => {
    req.session.destroy(_ => {
        res.redirect('/');
    })
})

router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }), (req, res) => {
    console.log('Usuario:', req.body);
    res.redirect('/');
});

router.get('/failregister', (_, res) => {
    res.send('Hubo un error de registro.');
})

module.exports = router;
