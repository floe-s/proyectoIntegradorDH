
const usuarioController = require('../controllers/usuarioController')
const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path')


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


router.get('/registro',usuarioController.registro);
router.post('/regitro', uploadfile.single('img'), validacionRegitro ,usuarioController.registrar);

router.get('/login',usuarioController.login);
router.post('/login',usuarioController.logeado); //esta ruta va?

router.post('/perfil',usuarioController.perfil);

router.get('/editar-usuario', usuarioController.editar);
router.put('/editar-usuario/:id', usuarioController.update);

module.exports = router;