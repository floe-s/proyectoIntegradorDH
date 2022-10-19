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

    let icon;
    if(req.body.nivel == "basico"){
      icon = "fire3.svg";
    }else if(req.body.nivel == "intermedio"){
      icon = "fire2.svg"
    }else{
      icon = "fire.svg"
    }

    let productoNuevo ={
      id:idNuevo,
      titule: req.body.titulo,
      estudiantes: req.body.estudiantes,
      profesor: req.body.profesor,
      precio: req.body.precio,
      nivel: req.body.nivel,
      lecciones: req.body.lecciones,
      horas: req.body.horas,
      puntuacion: req.body.puntuacion,
      img: nombreImg,
      imgNivel: icon,
      des: req.body.descripcion,
      idinput: nombreImg
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
