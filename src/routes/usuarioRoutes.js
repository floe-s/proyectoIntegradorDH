
const usuarioController = require('../controllers/usuarioController')
const express = require('express');
const { Router } = require('express');
const router = express.Router();

router.get('/registro',usuarioController.registro)
router.post('/regitro', usuarioController.registrar)

router.get('/login',usuarioController.login)
router.post('/login2',usuarioController.logeado)

router.post('/perfil',usuarioController.perfil)

router.get('/editarUsuario', usuarioController.editar)


module.exports = router;