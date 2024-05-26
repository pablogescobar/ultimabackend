const { UserService } = require('../services/Users.services');

class Controller {
    constructor() {
        this.userService = new UserService();
    }

    async registerUser(req, res) {
        try {
            const { firstName, lastName, age, email, password } = req.body;
            const user = await this.userService.registerUser(firstName, lastName, age, email, password);
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.userService.loginUser(email, password);
            res.status(200).json(user);
        } catch (err) {
            res.status(401).json({ error: err.message });
        }
    }

    async resetPassword(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.userService.resetPassword(email, password);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async githubLogin(req, res) {
        try {
            const profile = req.user;
            const { accessToken, user } = await this.userService.githubLogin(profile);
            res.status(200).json({ accessToken, user });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { email } = req.body;
            await this.userService.deleteUser(email);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = { Controller };