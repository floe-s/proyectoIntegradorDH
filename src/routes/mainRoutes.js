const mainControllers = require('../controllers/mainControllers')

const express = require('express');
const router = express.Router();

router.get('/', mainControllers.index);
router.get('/traductor', mainControllers.traductor);
router.get('/contacto', mainControllers.contacto);

// router.get('/traductor', productosController.traductor)

// router.get('/contacto', productosController.contacto)

module.exports = router;