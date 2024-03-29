const { Router } = require('express'); // Importa la clase Router de Express para definir las rutas
const router = Router(); // Crea un enrutador

router.get('/', async (_, res) => {
    res.render('createProduct', {
        titlePage: 'Agregar Producto',
        style: ['styles.css'],
        script: ['createProduct.js']
    })
})

module.exports = router;