require('dotenv').config();
const { hashPassword, isValidPassword } = require('../utils/hashing');
const { generateToken } = require('../utils/jwt');
const { UserRepository } = require('../repository/user.repository');
const { CartRepository } = require('../repository/carts.repository');
const { ObjectId } = require('mongodb');

class UserService {

    #adminUser;
    #superAdminUser;
    #userRepository;
    #cartRepository;

    constructor() {
        this.#userRepository = new UserRepository();
        this.#cartRepository = new CartRepository();

        this.#adminUser = {
            _id: 'admin',
            firstName: 'Luciano',
            lastName: 'Staniszewski',
            age: 18,
            email: process.env.ADMIN_USER,
            password: process.env.ADMIN_PASS,
            rol: 'admin',
            cart: { _id: new ObjectId(process.env.ADMIN_CART) }
        };

        this.#superAdminUser = {
            _id: 'superAdmin',
            firstName: 'Federico',
            lastName: 'Di Iorio',
            age: 28,
            email: process.env.SADMIN_USER,
            password: process.env.SADMIN_PASS,
            rol: 'superAdmin',
            cart: { _id: new ObjectId(process.env.SADMIN_CART) }
        };
    }

    #validateLoginCredentials(email, password) {
        if (!email || !password) {
            throw new Error('Debe ingresar su usuario y contraseña');
        }
    }

    async #generateNewUser(firstName, lastName, age, email, password, cart) {
        this.#validateLoginCredentials(email, password);
        if (age <= 0) {
            throw new Error('La edad debe ser mayor a 1');
        }
        const hashedPassword = hashPassword(password);

        const user = {
            firstName: firstName || 'Usuario',
            lastName: lastName || 'Sin Identificar',
            age: age ? parseInt(age) : "",
            email,
            password: hashedPassword,
            cart
        };

        return user;
    }

    #generateAccessToken(user) {
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

    async registerUser(firstName, lastName, age, email, password) {
        if (email === this.#adminUser.email || email === this.#superAdminUser.email) {
            throw new Error('Cannot register admin or super admin user this way');
        }

        const existingUser = await this.#userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('Email already registered');
        }

        const cart = await this.#cartRepository.save({ products: [] });
        const user = await this.#generateNewUser(firstName, lastName, age, email, password, cart);

        return await this.#userRepository.save(user);
    }

    async loginUser(email, password) {
        this.#validateLoginCredentials(email, password);

        let user;

        if (email === this.#adminUser.email && password === this.#adminUser.password) {
            user = this.#adminUser;
        } else if (email === this.#superAdminUser.email && password === this.#superAdminUser.password) {
            user = this.#superAdminUser;
        } else {
            user = await this.#userRepository.findByEmail(email);

            if (!user || !isValidPassword(password, user.password)) {
                throw new Error('Invalid credentials');
            }
        }

        const userPayload = {
            email: user.email,
            _id: user._id ? user._id.toString() : null,
            rol: user.rol,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            cart: user.cart ? user.cart._id : null
        };

        console.log(userPayload);

        const accessToken = this.#generateAccessToken(userPayload);

        return { accessToken, userPayload };
    }

    async resetPassword(email, password) {
        this.#validateLoginCredentials(email, password);
        await this.#userRepository.updatePassword(email, password);
    }

    async githubLogin(profile) {
        const user = await this.#userRepository.findByEmail(profile._json.email);

        if (!user) {
            const fullName = profile._json.name;
            const firstName = fullName.substring(0, fullName.lastIndexOf(' '));
            const lastName = fullName.substring(fullName.lastIndexOf(' ') + 1);
            const age = 18;
            const password = '123';

            const newUser = await this.registerUser(firstName, lastName, age, profile._json.email, password);
            const accessToken = this.#generateAccessToken(newUser);

            return { accessToken, user: newUser };
        }

        const accessToken = this.#generateAccessToken(user);
        return { accessToken, user };
    }

    async deleteUser(email) {
        const user = await this.#userRepository.findByEmail(email);
        if (user) {
            await this.#cartRepository.delete(user.cart);
            await this.#userRepository.deleteByEmail(email);
        }
    }
}

module.exports = { UserService };
