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

// Mostrar los mensajes nuevos en la vista
socket.on('message', (data) => {
    const { user, message } = data;
    messageLogs.innerHTML += `<p><strong>${user}:</strong> ${message}</p>`;
});