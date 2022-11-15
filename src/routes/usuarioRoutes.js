
const usuarioController = require('../controllers/usuarioController')
const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path')
const { body } = require('express-validator');


const configuracionImg = multer.diskStorage({

    destination:function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/img/perfil'));
    },
    filename:function(req,file,cb){
        let imgName = Date.now() + file.originalname;
        cb(null, imgName);
    }
})

const uploadfile = multer({storage:configuracionImg});
const validacionRegitro = require('../middleware/validacionRegistro');
const validacionLogin = require('../middleware/validacionLogin');

// Validation
let validacionReg = [
    body('nombre').notEmpty().withMessage('Campo vacio'),
    body('apellido').notEmpty().withMessage('Campo vacio'),
    body('telefono').notEmpty().withMessage('Campo vacio'),
    body('email').isEmail(),
    body('contrasena').isLength({ min: 5, max:10 }).withMessage('Debe contener entre 5 y 10 caracteres')

];

let validacionLog = [
    body('email').isEmail,
    body('password').isLength({ min: 5, max:10 }).withMessage('Debe contener entre 5 y 10 caracteres')
];

router.get('/registro',usuarioController.registro);
router.post('/regitro', uploadfile.single('img'), validacionRegitro, validacionReg, usuarioController.registrar);

router.get('/login', usuarioController.login);
router.post('/login', validacionLog, usuarioController.login);
router.post('/perfil',validacionLogin, usuarioController.perfil);
router.get('/vista-perfil',usuarioController.vistaPerfil )

router.get('/editar-usuario', usuarioController.editar);
router.put('/editar-usuario', uploadfile.single('img'), usuarioController.update);


router.post('/salir/:id', usuarioController.salir);


module.exports = router;