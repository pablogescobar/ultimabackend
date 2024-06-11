require('dotenv').config();
const { CustomError } = require('../utils/errors/customErrors');
const { ErrorCodes } = require('../utils/errors/errorCodes');
const { hashPassword, isValidPassword } = require('./hashing');
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

    // async verifyEmailExist(email) {
    //     if (!email) {
    //         throw CustomError.createError({
    //             name: 'Sin email',
    //             cause: 'Es necesario que ingrese un email para poder continuar con el cambio de contraseña',
    //             message: 'Debe ingresar un email',
    //             code: ErrorCodes.UNDEFINED_USER
    //         })
    //     }

    //     const user = await this.#userDAO.findByEmail(email);

    //     if (!user) {
    //         if (!user) {
    //             throw CustomError.createError({
    //                 name: 'Email desconocido',
    //                 cause: 'Está intentando cambiar la contraseña de un email que no se encuentra registrado',
    //                 message: 'El email no se encuentra registrado',
    //                 code: ErrorCodes.UNDEFINED_USER
    //             })
    //         }
    //     }

    //     const passToken = await this.#sendMail(email);

    //     const userPayload = new UserDTO(user);
    //     return { userPayload, passToken };
    // }
}

module.exports = { MailingService };