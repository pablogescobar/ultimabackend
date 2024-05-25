require('dotenv').config();
const daoUsers = require('../dao/mongo/users.dao');

class getUsersDTO {
    #adminUser;
    #superAdminUser;

    constructor() {
        this.#adminUser = {
            _id: 'admin',
            firstName: 'Luciano',
            lastName: 'Staniszewski',
            age: 18,
            email: process.env.ADMIN_USER,
            password: process.env.ADMIN_PASS,
            rol: 'admin',
            cart: process.env.ADMIN_CART
        };

        this.#superAdminUser = {
            _id: 'superAdmin',
            firstName: 'Federico',
            lastName: 'Di Iorio',
            age: 28,
            email: process.env.SADMIN_USER,
            password: process.env.SADMIN_PASS,
            rol: 'superAdmin',
            cart: process.env.SADMIN_CART
        };

    }

    #getAdminUser(email, password) {
        if (email === this.#adminUser.email && password === this.#adminUser.password) {
            const adminUser = {
                firstName: this.#adminUser.firstName,
                lastName: this.#adminUser.lastName,
                age: this.#adminUser.age,
                email: this.#adminUser.email,
                rol: this.#adminUser.rol
            }
            return adminUser
        }
    }

    #getSuperAdminUser(email, password) {
        if (email === this.#superAdminUser.email && password === this.#superAdminUser.password) {
            const superAdminUser = {
                firstName: this.#superAdminUser.firstName,
                lastName: this.#superAdminUser.lastName,
                age: this.#superAdminUser.age,
                email: this.#superAdminUser.email,
                rol: this.#superAdminUser.rol
            }
            return superAdminUser
        }
    }

    async getUser(email, password) {

        this.#getAdminUser(email, password);
        this.#getSuperAdminUser(email, password);

        const user = await new daoUsers().loginUser(email, password)
        return user;
    }
}

module.exports = { getUsersDTO };