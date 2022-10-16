const fs = require('fs');
const path = require('path');

const cursoPath = path.join(__dirname, '../data/cursosData.json');// ruta del JSON
const curso = JSON.parse(fs.readFileSync(cursoPath, 'utf-8')); 

const controlador = {
  
  cursos: (req, res) => {
    const curso = JSON.parse(fs.readFileSync(cursoPath, 'utf-8')); //esta linea es necesaria?
    res.render('./products/cursos', { ps: curso});
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

    curso.push(productoNuevo);

    fs.writeFileSync(cursoPath,JSON.stringify(curso,null," ")); // Guarda datos al JSON 
  
    res.redirect('/producto/cursos');
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
