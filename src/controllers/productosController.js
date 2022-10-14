const fs = require('fs');
const path = require('path');

const cursoPath = path.join(__dirname, '../data/cursosData.json');// ruta del json
const curso = JSON.parse(fs.readFileSync(cursoPath, 'utf-8')); 

const controlador = {
  
  cursos: (req, res) => {
    const curso = JSON.parse(fs.readFileSync(cursoPath, 'utf-8'));
    res.render('./products/cursos', { ps: curso});
  },

  descargables: (req, res) => {
    res.render('./descargables')
  },

  suscripciones: (req, res) => {
    res.render('./suscripciones')
  },

  carrito: (req, res) => {
    res.render('./carrito-compras')
  },

  cargar: (req, res) => {
    res.render('./products/cargar')
  },

  editar: (req, res) => {
    res.render('./products/editar')
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