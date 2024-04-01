const socket = io();

const messageLogs = document.getElementById('messageLogs');
const chatBox = document.getElementById('chatBox');
let user;

// Autenticar usuario
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
    // Una vez que se obtiene el nombre de usuario, establece el evento de escucha 'message'
    setupMessageListener();
});

// Función para establecer el evento de escucha 'message'
function setupMessageListener() {
    // Escuchar los mensajes del servidor
    socket.on('message', (data) => {
        const { user, message } = data;
        // Agregar el mensaje recibido a la interfaz de usuario
        messageLogs.innerHTML += `<p><strong>${user}:</strong> ${message}</p>`;
    });
}

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
