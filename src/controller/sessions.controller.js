const { UserRepository } = require('../repository/user.repository');

class Controller {

    #userRepository

    constructor() {
        this.#userRepository = new UserRepository();
    }

    async registerUser(req, res) {
        try {
            const { firstName, lastName, age, email, password } = req.body;
            const user = await this.#userRepository.registerUser(firstName, lastName, age, email, password);
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.#userRepository.loginUser(email, password);
            res.cookie('accessToken', user.accessToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
            res.redirect('/');
            // res.status(200).json(user);
        } catch (err) {
            res.status(401).json({ error: err.message });
        }
    }

    async resetPassword(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.#userRepository.resetPassword(email, password);
            res.redirect('/');
            // res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async githubLogin(req, res) {
        try {
            const profile = req.user;
            const { accessToken, user } = await this.#userRepository.githubLogin(profile);
            res.status(200).json({ accessToken, user });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    githubCb(req, res) {
        try {
            res.cookie('accessToken', req.user.accessToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
            res.redirect('/');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    logout(res) {
        try {
            res.clearCookie('accessToken'); // Elimina la cookie llamada 'accessToken'
            res.redirect('/');
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    redirect(res) {
        try {
            res.redirect('/');
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { email } = req.body;
            await this.#userRepository.deleteUser(email);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = { Controller };