const { Messages } = require('../models');

class ChatManager {
    constructor(io) {
        this.io = io;
    }

    async prepare() {
        // No hacer nada. 
        // Podríamos chequear que la conexión existe y está funcionando
        if (Messages.db.readyState !== 1) {
            throw new Error('must connect to mongodb!')
        }

        // Escuchar el evento 'message' del cliente
        this.io.on('connection', (socket) => {
            socket.on('message', async (data) => {
                try {
                    // Almacenar el mensaje en la base de datos
                    await Messages.create({
                        user: data.user,
                        message: data.message
                    });
                    console.log({Usuario: data.user}, {Mensaje: data.message})
                } catch (error) {
                    console.error('Error al guardar el mensaje en la base de datos:', error);
                }
            });
        });
    }

    async createUser(username) {
        try {
            const existingUser = await Messages.find({ user: username });
            if (!existingUser) {
                await Messages.create({
                    user: username,
                    messages: []
                });
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            throw new Error('Error al crear el usuario');
        }
    }
}

module.exports = ChatManager;
