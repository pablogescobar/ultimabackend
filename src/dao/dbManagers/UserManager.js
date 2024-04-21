const { Users } = require('../models');

class UserManager {
    constructor() { }

    async prepare() {
        // No hacer nada. 
        // Podríamos chequear que la conexión existe y está funcionando
        if (Users.db.readyState !== 1) {
            throw new Error('must connect to mongodb!')
        }
    }

    async registerUser(firstName, lastName, age, email, password) {
        try {
            if (!email || !password) {
                throw new Error('El email y la contraseña son obligatorios.')
            }

            const firstNameManager = firstName ? firstName : 'Usuario'
            const lastNameManager = lastName ? lastName : 'Sin Identificar'

            const numericAge = age ? parseInt(age) : age = 1

            if (age <= 0) {
                throw new Error('La edad debe ser mayor a 1')
            }


            await Users.create({
                firstName: firstNameManager,
                lastName: lastNameManager,
                age: numericAge,
                email,
                password
            })
        } catch {
            throw new Error('Error al registrar el ususario.')
        }
    }
}

module.exports = UserManager