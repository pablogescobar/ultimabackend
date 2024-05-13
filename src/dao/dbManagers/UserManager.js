const { hashPassword, isValidPassword } = require('../../utils/hashing');
const { Users } = require('../models');
const CartManager = require('./CartManager');
const { generateToken } = require('../../utils/jwt');

class UserManager {
    constructor() {
        this.adminUser = {
            _id: 'admin',
            firstName: 'Romina',
            lastName: 'Molina',
            age: 18,
            email: 'adminCoder@coder.com',
            password: 'adminCod3r123',
            rol: 'admin',
            cart: '6619078c94d150818d996ec7'
        };
    }

    async prepare() {
        // No hacer nada. 
        // Podríamos chequear que la conexión existe y está funcionando
        if (Users.db.readyState !== 1) {
            throw new Error('must connect to mongodb!')
        }
    }

    async loginUser(email, password) {
        try {
            if (!email || !password) {
                throw new Error('Debe ingresar su usuario y contraseña');
            }

            if (email === this.adminUser.email && password === this.adminUser.password) {
                return this.adminUser;
            }

            const user = await Users.findOne({ email });

            if (!user) {
                throw new Error('El usuario no existe');
            }

            if (isValidPassword(password, user.password)) {
                return user;
            } else {
                throw new Error('Credenciales inválidas');
            }

        } catch {
            throw new Error('El usuario o contraseña son incorrectos');
        }

    }

    async registerUser(firstName, lastName, age, email, password) {
        try {
            if (!email || !password) {
                throw new Error('El email y la contraseña son obligatorios.');
            }

            if (email === this.adminUser.email) {
                throw new Error('Error al registrar el usuario');
            }

            const existingUser = await Users.findOne({ email });
            if (existingUser) {
                throw new Error('El email ya está registrado');
            }

            if (age <= 0) {
                throw new Error('La edad debe ser mayor a 1');
            }

            const firstNameManager = firstName ? firstName : 'Usuario'
            const lastNameManager = lastName ? lastName : 'Sin Identificar'
            const newCartPromise = new CartManager().addCart();
            const newCart = await newCartPromise;
            const numericAge = age ? parseInt(age) : age = ""
            const hashedPassword = hashPassword(password);

            const user = await Users.create({
                firstName: firstNameManager,
                lastName: lastNameManager,
                age: numericAge,
                email,
                password: hashedPassword,
                cart: newCart
            })
            console.log(user);
            return user;
        } catch (err) {
            console.error('Error al registrar el usuario: ', err);
            throw new Error('Error al registrar el ususario.');
        }
    }

    async getUser(id) {
        try {

            if (id === this.adminUser._id) {
                return this.adminUser
            } else {
                const user = await Users.findOne({ _id: id })
                return user
            }

        } catch {
            throw new Error('Error al cargar la sesion de usuario')
        }
    }

    async resetPassword(email, password) {
        try {
            if (!email || !password) {
                throw new Error('Credenciales invalidas.');
            }
            const user = await Users.findOne({ email });
            if (!user) {
                throw new Error('El usuario no existe.');
            }

            if (email === this.adminUser.email) {
                throw new Error('No tiene permisos para actualizar ese email.');
            }

            await Users.updateOne({ email }, { $set: { password: hashPassword(password) } });

            const userUpdated = await Users.findOne({ email });
            return userUpdated;

        } catch (error) {
            throw new Error('No se pudo actualizar la contraseña');
        }
    }

    async githubLogin(profile) {
        try {
            const user = await Users.findOne({ email: profile._json.email });

            if (!user) {
                const fullName = profile._json.name;
                const firstName = fullName.substring(0, fullName.lastIndexOf(' '));
                const lastName = fullName.substring(fullName.lastIndexOf(' ') + 1);
                const age = 18;
                const password = '123';

                const newUser = await this.registerUser(firstName, lastName, age, profile._json.email, password);
                const accessToken = generateToken({ email: newUser.email, _id: newUser._id.toString(), rol: newUser.rol, firstName: newUser.firstName, lastName: newUser.lastName, age: newUser.age, cart: newUser.cart._id });

                return { accessToken, user: newUser };
            }

            const accessToken = generateToken({ email: user.email, _id: user._id.toString(), rol: user.rol, firstName: user.firstName, lastName: user.lastName, age: user.age, cart: user.cart._id });

            return { accessToken, user };

        } catch (e) {
            console.error('Error al loguearse con GitHub: ', e);
            throw new Error('Hubo un problema al loguearse.');
        }
    }

    async deleteUser(email) {
        try {
            const user = await Users.findOne({ email });
            const cartManager = new CartManager();
            await cartManager.deleteCart(user.cart);
            await Users.deleteOne({ email });
        } catch {
            throw new Error('Hubo un error al eliminar el usuario');
        }
    }
}

module.exports = UserManager;
