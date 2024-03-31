const { Router } = require('express'); // Importa la clase Router de Express para definir las rutas
const router = Router(); // Crea un enrutador

router.get('/', async (_, res) => {
    res.render('chat', {
        titlePage: 'Chat en Vivo',
        useWS: true,
        useSweetAlert: true,
        style: ['styles.css'],
        script: ['chat.js']
    });
});

module.exports = router;