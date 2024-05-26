const UserDAO = require('../dao/mongo/users.dao');
const { IRepository } = require('./IRepository.repository');

class UserRepository extends IRepository {
    constructor() {
        super();
        this.userDAO = new UserDAO();
    }

    async findAll() {
        return await this.userDAO.getUsers();
    }

    async findById(id) {
        return await this.userDAO.getUser(id);
    }

    async findByEmail(email) {
        return await this.userDAO.findByEmail(email);
    }

    async save(user) {
        return await this.userDAO.registerUser(user);
    }

    async update(id, user) {
        return await this.userDAO.updateUser(id, user);
    }

    async delete(id) {
        return await this.userDAO.deleteUser(id);
    }

    async loginUser(email, password) {
        return await this.userDAO.loginUser(email, password);
    }

    async resetPassword(email, password) {
        return await this.userDAO.resetPassword(email, password);
    }

    async githubLogin(profile) {
        return await this.userDAO.githubLogin(profile);
    }
}

module.exports = { UserRepository };
