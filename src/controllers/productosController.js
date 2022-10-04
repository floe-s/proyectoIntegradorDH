const path = require('path');

const controlador = {
  index: (req, res) => {
    res.sendFile(path.resolve('', './views/index.html'));
  },

  cursos: (req, res) => {
    res.sendFile(path.resolve('', './views/cursos.html'));
  },

  descargables: (req, res) => {
    res.sendFile(path.resolve('', './views/descargables.html'));
  },

  traductor: (req, res) => {
    res.sendFile(path.resolve('', './views/traductor.html'));
  },

  suscripciones: (req, res) => {
    res.sendFile(path.resolve('', './views/suscripciones.html'));
  },

  contacto: (req, res) => {
    res.sendFile(path.resolve('', './views/contacto.html'));
  },

  registro: (req, res) => {
    res.sendFile(path.resolve('', './views/registro.html'));
  },

  login: (req, res) => {
    res.sendFile(path.resolve('', './views/login.html'));
  },

  carrito: (req, res) => {
    res.sendFile(path.resolve('', './views/carrito-compras.html'));
  }

}

module.exports = controlador;

//Ejemplo que mostro Jero
/* const controlador = {
  index: (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
  },

  product: (req, res) => {
    res.send("Producto223");
  }
} */