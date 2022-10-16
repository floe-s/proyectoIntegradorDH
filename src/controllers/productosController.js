const fs = require('fs');
const path = require('path');

const cursoPath = path.join(__dirname, '../data/cursosData.json');// ruta del JSON
let curso = JSON.parse(fs.readFileSync(cursoPath, 'utf-8')); 

const controlador = {
  
  cursos: (req, res) => {
    curso = JSON.parse(fs.readFileSync(cursoPath, 'utf-8')); // El JSON vuelve a leer los datos
    res.render('./products/cursos', { ps: curso}); // Se cargan los nuevos datos en la vista
  },

  registrar:(req, res) => {
    let idNuevo = 1;

    for(let s of curso){
        if(idNuevo < s.id){
            idNuevo = s.id
        }
    }

    idNuevo++
    
    // llamamos el dato de la img de file que queremos 

    let nombreImg = req.file.filename;

    let productoNuevo ={
      id:idNuevo,
      titule:req.body.titulo,
      profesorBasico: req.body.basico,
      precioBaisco: req.body.precioBaisco,
      profesormedio: req.body.medio,
      precioMedio: req.body.precioMedio,
      profesorAvanzado: req.body.avanzado,
      precioAvanzado: req.body.precioAvanzado,
      img: nombreImg
    }

    curso.push(productoNuevo); // Se guardan los datos logicamente

    fs.writeFileSync(cursoPath,JSON.stringify(curso,null," ")); // Se guarda los datos al JSON 
  
    res.redirect('/producto/cursos'); // Redirecciona a la vista cursos (productosRoutes)
  },


  descargables: (req, res) => {
    res.render('./descargables');
  },

  suscripciones: (req, res) => {
    res.render('./suscripciones');
  },

  carrito: (req, res) => {
    res.render('./carrito-compras');
  },

  cargar: (req, res) => {
    res.render('./products/cargar');
  },

  editar: (req, res) => {
    res.render('./products/editar');
  },

  eliminar: (req, res) => {
    res.render('./products/eliminar');
  },

  

}

module.exports = controlador;
