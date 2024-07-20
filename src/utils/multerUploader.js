const multer = require('multer');
const path = require('path');

const productStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dest = path.join(__dirname, '../../public/products');
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const productUploader = multer({ storage: productStorage });

const documentStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dest = path.join(__dirname, '../../public/documents');
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        // Obtén el userId desde los parámetros de la solicitud o el objeto req.user
        const userId = req.user.id; // Asegúrate de que el userId esté disponible en req.user

        // Genera el nuevo nombre del archivo basado en el campo y el userId
        const fileExtension = path.extname(file.originalname); // Obtén la extensión del archivo
        const baseName = path.basename(file.originalname, fileExtension); // Obtén el nombre base sin extensión
        const newFileName = `${file.fieldname}-${userId}-${baseName}${fileExtension}`;

        cb(null, newFileName);
    }
});

const documentUploader = multer({
    storage: documentStorage,
    fileFilter: function (req, file, cb) {
        const allowedFields = ['identification', 'proofOfAddress', 'proofOfAccount'];
        if (allowedFields.includes(file.fieldname)) {
            cb(null, true);
        } else {
            cb(new Error('Unexpected field'), false);
        }
    }
});

module.exports = { productUploader, documentUploader };
