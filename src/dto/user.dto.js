class UserDTO {
    constructor({ email, _id, rol, firstName, lastName, age, cart } = {}) {
        this.email = email;
        this._id = _id;
        this.rol = rol;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.cart = cart;
    }

    toPayload() {
        return {
            email: this.email,
            _id: this._id.toString(),
            rol: this.rol,
            firstName: this.firstName,
            lastName: this.lastName,
            age: this.age,
            cart: this.cart ? this.cart.toString() : null
        };
    }


}

module.exports = { UserDTO };
