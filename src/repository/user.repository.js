const UserDAO = require('../dao/mongo/users.dao');
const { IRepository } = require('./IRepository.repository');

class UserRepository extends IRepository {
    constructor() {
        super();
        this.userDAO = new UserDAO();
    }

    async findAll() {
        return await this.userDAO.findAll();
    }

    async findById(id) {
        return await this.userDAO.findById(id);
    }

    async findByEmail(email) {
        return await this.userDAO.findByEmail(email);
    }

    async save(user) {
        return await this.userDAO.create(user);
    }

    async updatePassword(email, password) {
        return await this.userDAO.updatePassword(email, password);
    }

    async deleteByEmail(email) {
        return await this.userDAO.deleteByEmail(email);
    }
}

module.exports = { UserRepository };
