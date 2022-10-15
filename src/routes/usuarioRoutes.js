
const usuarioController = require('../controllers/usuarioController')
const express = require('express');
const router = express.Router();

router.get('/registro',usuarioController.registro)
router.post('/regitro', usuarioController.registrar)

router.get('/login',usuarioController.login)

router.get('/perfil',usuarioController.perfil)

module.exports = router;