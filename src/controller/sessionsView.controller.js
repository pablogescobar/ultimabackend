const { Router } = require('express');
const router = Router();
const cookieParser = require('cookie-parser');

router.use(cookieParser());

class Controller {
    constructor() { }

    index(req, res) {
        try {
            const isLoggedIn = req.cookies.accessToken !== undefined;

            if (isLoggedIn) {
                const cartId = req.user.cart
                res.render('sessionStart', {
                    titlePage: 'Login/Register',
                    isLoggedIn,
                    isNotLoggedIn: !isLoggedIn,
                    style: ['styles.css'],
                    cartId
                });
            } else {
                res.render('sessionStart', {
                    titlePage: 'Login/Register',
                    isLoggedIn,
                    isNotLoggedIn: !isLoggedIn,
                    style: ['styles.css'],
                });
            }
        } catch (e) {
            res.status(500).json({ error: e.messange });
        }
    }

    login(res) {
        try {
            res.render('login', {
                style: ['styles.css'],
                title: 'Login'
            });
        } catch (e) {
            res.status(500).json({ error: e.messange });
        }
    }

    register(res) {
        try {
            res.render('register', {
                style: ['styles.css'],
                title: 'Register'
            });
        } catch (e) {
            res.status(500).json({ error: e.messange });
        }
    }

    profile(req, res) {
        try {
            const isLoggedIn = req.cookies.accessToken !== undefined;
            const documents = req.user.documents.length === 3 || req.user.rol === 'premium';
            if (isLoggedIn) {
                const cartId = req.user.cart
                const user = {
                    firstName: req.user.firstName,
                    lastName: req.user.lastName,
                    age: req.user.age,
                    email: req.user.email,
                    rol: req.user.rol,
                    id: req.user.id
                }

                res.render('profile', {
                    style: ['styles.css'],
                    titlePage: 'Perfil',
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        age: user.age,
                        email: user.email,
                        rol: user.rol,
                        id: user.id
                    },
                    isLoggedIn,
                    cartId,
                    documents
                });
            } else {
                return res.status(403).json({ Error: 'Debe logearse para poder acceder.' })
            }
        } catch (err) {
            res.status(500).json({ Error: err.message })
        }
    }

    resetPassword(res) {
        try {
            res.render('sendMailToResetPassword', {
                titlePage: 'Send Token',
                style: ['styles.css']
            });
        } catch (err) {
            res.status(500).json({ Error: err.message });
        }
    }

    resetPasswordWarning(req, res) {
        try {
            const passToken = req.cookies.passToken !== undefined;
            res.render('resetPasswordWarning', {
                titlePage: 'Reset Password',
                style: ['styles.css'],
                passToken,
                notPassToken: !passToken
            });
        } catch (err) {
            res.status(500).json({ Error: err.message });
        }
    }

    verifyResetPassword(req, res) {
        try {
            const tid = req.params.tid;
            const passToken = req.cookies.passToken;
            if (!passToken) {
                return res.redirect('/resetPasswordWarning');
            }
            return res.render('resetPassword', {
                titlePage: 'Reset Password',
                style: ['styles.css'],
                tid
            });
        } catch (err) {
            res.status(500).json({ Error: err.message });
        }
    }

    changeRole(req, res) {
        try {
            const isLoggedIn = req.cookies.accessToken !== undefined;
            res.render('changeRole', {
                titlePage: 'Change Role',
                style: ['styles.css'],
                isLoggedIn,
                isNotLoggedIn: !isLoggedIn
            });
        } catch (error) {
            res.status(500).json({ Error: error.message });
        }
    }

    documents(req, res) {
        try {
            const isLoggedIn = req.cookies.accessToken !== undefined;
            const userId = req.user.id;
            res.render('documents', {
                titlePage: 'Actualizar Documentos',
                style: ['styles.css'],
                isLoggedIn,
                isNotLoggedIn: !isLoggedIn,
                userId
            });
        } catch (error) {
            res.status(500).json({ Error: error.message })
        }
    }
}

module.exports = { Controller };