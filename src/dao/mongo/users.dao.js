const { Users } = require('./models');
const { hashPassword } = require('../../utils/hashing');

class UserDAO {
    async findByEmail(email) {
        return await Users.findOne({ email });
    }

    async create(user) {
        return await Users.create(user);
    }

    async updatePassword(email, password) {
        return await Users.updateOne({ email }, { $set: { password: hashPassword(password) } });
    }

    async deleteByEmail(email) {
        return await Users.deleteOne({ email });
    }

    async findById(id) {
        return await Users.findOne({ _id: id });
    }

    async findAll() {
        return await Users.find();
    }
}

module.exports = UserDAO;
