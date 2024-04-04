const socket = io();

const messageLogs = document.getElementById('messageLogs');
const chatBox = document.getElementById('chatBox');
let user;

socket.on('allMessages', (allMessages) => {
    // Limpiar el contenedor de mensajes
    messageLogs.innerHTML = '';

    // Mostrar todos los mensajes en la interfaz de usuario
    allMessages.forEach((message) => {
        messageLogs.innerHTML += `<p><strong>${message.user}:</strong> ${message.message}</p>`;
    });
});

// Autenticar usuario y configurar eventos de escucha
Swal.fire({
    title: "Identifícate para continuar",
    input: "text",
    text: "Ingresa tu username para identificarte en el chat",
    inputValidator: (value) => {
        if (!value) {
            return "¡Necesitas un nombre de usuario para continuar!";
        }
        return false;
    },
    allowOutsideClick: false
}).then(input => {
    user = input.value;
    // Una vez que se obtiene el nombre de usuario, establecer eventos de escucha y enviar petición para obtener todos los mensajes
    setupListenersAndFetchMessages();
});

// Función para establecer los eventos de escucha y obtener todos los mensajes
function setupListenersAndFetchMessages() {
    // Escuchar todos los mensajes del servidor
    socket.on('allMessages', (allMessages) => {
        // Limpiar el contenedor de mensajes
        messageLogs.innerHTML = '';

        // Mostrar todos los mensajes en la interfaz de usuario
        allMessages.forEach((message) => {
            messageLogs.innerHTML += `<p><strong>${message.user}:</strong> ${message.message}</p>`;
        });
    });

    // Escuchar nuevos mensajes del servidor
    socket.on('message', (message) => {
        // Agregar el nuevo mensaje a la interfaz de usuario
        messageLogs.innerHTML += `<p><strong>${message.user}:</strong> ${message.message}</p>`;
    });

    // Enviar mensajes al presionar Enter
    chatBox.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            const message = chatBox.value.trim();
            if (message.length > 0) {
                socket.emit('message', { user, message });
                chatBox.value = '';
            }
        }
    });
}