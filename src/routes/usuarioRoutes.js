
const usuarioController = require('../controllers/usuarioController')
const express = require('express');
const router = express.Router();
router.get('/registro',usuarioController.registro)

router.get('/login',usuarioController.login)


module.exports = router;