const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    const isLoggedIn = ![null, undefined].includes(req.session.user);

    res.render('sessionStart', {
        titlePage: 'Login/Register',
        isLoggedIn,
        isNotLoggedIn: !isLoggedIn,
        style: ['styles.css']
    });

    router.get('/login', (_, res) => {
        // TODO: agregar middleware, sólo se puede acceder si no está logueado
        res.render('login', {
            style: ['styles.css'],
            title: 'Login'
        });
    });

    router.get('/register', (_, res) => {
        // TODO: agregar middleware, sólo se puede acceder si no está logueado
        res.render('register', {
            style: ['styles.css'],
            title: 'Register'
        });
    });

    router.get('/profile', async (req, res) => {
        const isLoggedIn = ![null, undefined].includes(req.session.user);
        const idFromSession = req.session.user._id

        const userManager = req.app.get('userManager');
        const user = await userManager.getUser(idFromSession);

        res.render('profile', {
            style: ['styles.css'],
            title: 'My profile',
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                email: user.email
            }, isLoggedIn

        });
    });
});

module.exports = router;