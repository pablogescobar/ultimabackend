const { Messages } = require('../models');

class ChatManager {
    constructor() { }

    async prepare() {
        // No hacer nada. 
        // Podríamos chequear que la conexión existe y está funcionando
        if (Messages.db.readyState !== 1) {
            throw new Error('must connect to mongodb!')
        }
    }

    async createUser(username) {
        try {
            const existingUser = await Messages.find({ user: username });
            if (!existingUser) {
                await Messages.create({
                    username,
                    messages: []
                })
            }
        } catch {
            throw new Error('Error al crear el usuario')
        }
    }
}

module.exports = ChatManager;