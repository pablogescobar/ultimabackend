const { Messages } = require('../models');

class ChatManager {
    constructor(io) {
        this.io = io;
        // Agregar el listener de mensaje una vez al crear una nueva instancia de ChatManager
        this.io.on('connection', async (socket) => {
            try {
                // Obtener todos los mensajes ordenados por fecha y enviarlos al cliente recién conectado
                const allMessages = await Messages.find().sort({ createdAt: 1 });
                socket.emit('allMessages', allMessages);

                // Escuchar los mensajes entrantes del cliente y emitirlos a todos los clientes conectados
                socket.on('message', async (data) => {
                    await this.handleMessage(data);
                    // Emitir el mensaje a todos los clientes conectados (broadcast)
                    this.io.emit('message', data);
                });
            } catch (error) {
                console.error('Error en la conexión del cliente:', error);
            }
        });
    }

    async handleMessage(data) {
        try {
            // Verificar si el usuario ya existe en la base de datos
            let existingUser = await Messages.findOne({ user: data.user });
            if (existingUser) {
                // Si el usuario existe, actualizar su documento agregando el nuevo mensaje
                await Messages.updateOne(
                    { user: data.user },
                    { $push: { messages: data.message } }
                );
            } else {
                // Si el usuario no existe, crear un nuevo documento con el mensaje
                await Messages.create({
                    user: data.user,
                    messages: [data.message]
                });
            }
            console.log({ Usuario: data.user }, { Mensaje: data.message });
        } catch (error) {
            console.error('Error al guardar el mensaje en la base de datos:', error);
        }
    }

    async prepare() {
        // No hacer nada. 
        // Podríamos chequear que la conexión existe y está funcionando
        if (Messages.db.readyState !== 1) {
            throw new Error('must connect to mongodb!')
        }
    }
}

module.exports = ChatManager;