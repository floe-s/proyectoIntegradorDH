
const usuarioController = require('../controllers/usuarioController')
const express = require('express');

const router = express.Router();

router.get('/registro',usuarioController.registro);
router.post('/regitro', usuarioController.registrar);

router.get('/login',usuarioController.login);
router.post('/login',usuarioController.logeado); //esta ruta va?

router.post('/perfil',usuarioController.perfil);

router.get('/editar-usuario', usuarioController.editar);
router.put('/editar-usuario/:id', usuarioController.update);

module.exports = router;