
const productosController = require('../controllers/productosController')
const express = require('express');
const router = express.Router();

router.get('/cursos', productosController.cursos)

router.get('/descargables', productosController.descargables)

router.get('/suscripciones', productosController.suscripciones)

router.get('/carrito-compras', productosController.carrito)

router.get('/cargar', productosController.cargar)

router.get('/editar', productosController.editar)


module.exports = router;

//Ejemplo que mostro Jero
/* router.get('/product', productosController.product)

router.get("/productos/:id", function(req, res) {
  var p = req.params.id;
  console.log("el numero dado es el " + p);
  res.send("el numero dado es el " + p);
}); */