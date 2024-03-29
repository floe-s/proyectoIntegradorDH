const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController')

const path = require('path')
const multer = require('multer');
const { body } = require('express-validator');


const configuracionImg = multer.diskStorage({

    destination:function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/img/perfil'));
    },
    filename:function(req,file,cb){
        let imgName =  "moidih" + Date.now() + file.originalname;
        cb(null, imgName);
    }
})

const uploadfile = multer({storage:configuracionImg});
const validacionRegistro = require('../middleware/validacionRegistro');
const validacionLogin = require('../middleware/validacionLogin');

// Validation
let validacionReg = [
    body('nombre').notEmpty().withMessage('Campo vacio'),
    body('apellido').notEmpty().withMessage('Campo vacio'),
    body('telefono').notEmpty().withMessage('Campo vacio'),
    body('email').isEmail(),
    body('contrasena').isLength({ min: 4, max:10 }).withMessage('Debe contener entre 4 y 10 caracteres')

];

let validacionLog = [
    body('email').isEmail(),
    body('password').isLength({ min: 4, max:10 }).withMessage('Debe contener entre 4 y 10 caracteres')
];

/* let validacionUsu = [
    body('nombres').notEmpty().withMessage('Campo vacio'),
    body('apellidos').notEmpty().withMessage('Campo vacio'),
    body('email').isEmail(),
    body('telefono').notEmpty().withMessage('Campo vacio'),
    body('oldpassword').isLength({ min: 4, max:10 }).withMessage('Debe contener entre 4 y 10 caracteres')
]; */

router.get('/registro',usuarioController.registro);
router.post('/registro', uploadfile.single('img'), validacionRegistro, validacionReg, usuarioController.registrar);

router.get('/login', usuarioController.login);
router.post('/perfil', validacionLogin, validacionLog, usuarioController.perfil);
router.get('/vista-perfil',usuarioController.vistaPerfil );
router.get('/datosUsuario', usuarioController.vistaDatos);
router.get('/ayuda', usuarioController.visataAyuda);

// router.get('/editar-usuario', usuarioController.editar);
router.put('/editar-Usuarios/:id',uploadfile.single('img'), usuarioController.update);

router.post('/salir/:id', usuarioController.salir);
router.get('/cargarProfesro', usuarioController.cargarProf);
router.post('/ragiProfe',uploadfile.single('img'), usuarioController.registrarPro);
router.delete('/eliminar/:id', usuarioController.eliminar);
router.get('/registrar-administradores', usuarioController.registrarAdministradores);
router.post('/cargar-admin', uploadfile.single('img'),usuarioController.cargarAdmin);
router.delete('/eliminarAdmin/:id', usuarioController.eliminarAdmin);
router.post('/agregar-rol', usuarioController.agreRol);
router.post("/filtrar",usuarioController.filtrar)
module.exports = router;