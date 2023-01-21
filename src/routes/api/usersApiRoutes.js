const express = require('express');
const router = express.Router();

const usersApi = require('../../services/usuariosService');

router.get('/all-users',usersApi.getAllUsers);

module.exports = router;