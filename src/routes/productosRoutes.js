const express = require('express');
const router = express.Router();

const productosController = require('../controllers/productosController');

//llamar la libreria multer
const multer = require('multer');
const path = require('path');

// configuracion de multer
const configuracionImg = multer.diskStorage({
  // donde va a ir la img que vamos a guardar 
  destination: function(req, file, cb){
    cb(null,path.join(__dirname, '../../public/img/paises') );
  },

   // con que nombre se va gurdar la img que guardamos
  filename: function(req, file, cb){
    let imgName = Date.now() + file.originalname;
    cb(null, imgName);
  }
});

// llamamos a multer y pasamos el objeto;
const uploadFile = multer({storage: configuracionImg});

//rutas especificas
router.get('/cursos', productosController.cursos); // Se dirige a ese controlador

router.get('/descargables', productosController.descargables);

router.get('/suscripciones', productosController.suscripciones);

router.get('/carrito-compras', productosController.carrito);

router.get('/cargar', productosController.cargar);
router.post('/cargar', uploadFile.single('imgProduct') ,productosController.registrar);

router.get('/editar', productosController.edit);
router.put('/editar/:id', productosController.update);

router.delete('/eliminar/:id', productosController.destroy)


module.exports = router;
