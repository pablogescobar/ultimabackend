require('dotenv').config();
const { hashPassword, isValidPassword } = require('../utils/hashing');
const { generateToken } = require('../utils/jwt');
const { UserRepository } = require('../repository/user.repository');
const { CartRepository } = require('../repository/carts.repository');

class UserService {

    #adminUser;
    #superAdminUser;

    constructor() {
        this.userRepository = new UserRepository();
        this.cartRepository = new CartRepository();

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

    validateLoginCredentials(email, password) {
        if (!email || !password) {
            throw new Error('Debe ingresar su usuario y contraseña');
        }
    }

    #validateRegistrationData(age, email, password) {
        this.validateLoginCredentials(email, password);
        if (age <= 0) {
            throw new Error('La edad debe ser mayor a 1');
        }
    }

    async generateNewUser(firstName, lastName, age, email, password, cart) {
        this.#validateRegistrationData(age, email, password);
        const firstNameManager = firstName || 'Usuario';
        const lastNameManager = lastName || 'Sin Identificar';
        const numericAge = age ? parseInt(age) : "";
        const hashedPassword = hashPassword(password);

        const user = {
            firstName: firstNameManager,
            lastName: lastNameManager,
            age: numericAge,
            email,
            password: hashedPassword,
            cart
        };

        return user;
    }

    generateAccessToken(user) {
        return generateToken({
            email: user.email,
            _id: user._id.toString(),
            rol: user.rol,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            cart: user.cart._id
        });
    }

    #isAdminUser(email, password) {
        return email === this.#adminUser.email && password === this.#adminUser.password;
    }

    #isSuperAdminUser(email, password) {
        return email === this.#superAdminUser.email && password === this.#superAdminUser.password;
    }

    async registerUser(firstName, lastName, age, email, password) {
        if (this.#isAdminUser(email, password) || this.#isSuperAdminUser(email, password)) {
            throw new Error('Cannot register admin or super admin user this way');
        }

        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('Email already registered');
        }

        const cart = await this.cartRepository.save({ products: [] });
        const user = await this.generateNewUser(firstName, lastName, age, email, password, cart);

        return await this.userRepository.save(user);
    }

    async loginUser(email, password) {
        this.validateLoginCredentials(email, password);

        if (this.#isAdminUser(email, password)) {
            return this.#adminUser;
        }

        if (this.#isSuperAdminUser(email, password)) {
            return this.#superAdminUser;
        }

        const user = await this.userRepository.loginUser(email, password);

        if (!user || !isValidPassword(password, user.password)) {
            throw new Error('Invalid credentials');
        }

        return user;
    }

    async resetPassword(email, password) {
        this.validateLoginCredentials(email, password);
        return await this.userRepository.resetPassword(email, password);
    }

    async githubLogin(profile) {
        return await this.userRepository.githubLogin(profile);
    }

    async deleteUser(email) {
        const user = await this.userRepository.findByEmail(email);
        if (user) {
            await this.cartRepository.delete(user.cart);
            await this.userRepository.delete(user._id);
        }
    }
}

module.exports = { UserService };
