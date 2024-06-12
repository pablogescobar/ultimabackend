require('dotenv').config();
const { CustomError } = require('../utils/errors/customErrors');
const { ErrorCodes } = require('../utils/errors/errorCodes');
const nodemailer = require('nodemailer');

class MailingService {
    constructor() { }

    async sendMail(email) {
        try {

            const randomNumber = Math.floor(100000 + Math.random() * 900000);

            const transport = nodemailer.createTransport({
                service: 'gmail',
                port: 587,
                auth: {
                    user: process.env.GOOGLE_MAIL,
                    pass: process.env.GOOGLE_PASS
                }
            });

            await transport.sendMail({
                from: 'Servicio Backend App',
                to: email,
                subject: 'BackendApp | Restablecer contraseña',
                html: `
            <div>
                <h2>Clave para cambiar la contraseña</h2>
                <h4>${randomNumber}</h4>
            </div>`,
                attachments: []
            });
            return { randomNumber, email }
        } catch (error) {
            throw CustomError.createError({
                name: 'Error al restablecer contraseña',
                cause: 'Ocurrió un error y no se pudo enviar el email al destinatario.',
                message: 'No se pudo enviar el email',
                code: ErrorCodes.UNDEFINED_USER
            })
        }
    }
}

module.exports = { MailingService };