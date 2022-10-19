const fs = require('fs');
const path = require('path');

const cursoPath = path.join(__dirname, '../data/cursosData.json'); // ruta del JSON
let curso = JSON.parse(fs.readFileSync(cursoPath, 'utf-8')); 

const controlador = {
  
  cursos: (req, res) => {
    curso = JSON.parse(fs.readFileSync(cursoPath, 'utf-8')); // El JSON vuelve a leer los datos
    res.render('./products/cursos', { ps: curso}); // Se cargan los nuevos datos en la vista
  },

  cargar: (req, res) => {
    res.render('./products/cargar');
  },

  registrar: (req, res) => {

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

  edit: (req, res) => {

    let idCurso = req.params.id;
    let objCurso;

    for(let o of curso) {
      if(idCurso == o.id) {
        objCurso = o;
        break;
      }
    }

    res.render('./products/editar', {ps: curso});
  },

  update: (req, res) => {

    let idCurso = req.params.id;

    for(let o of curso) {
      if(idCurso == o.id) {
        o.titule = req.body.titulo;
        o.estudiantes = req.body.estudiantes;
        o.profesor = req.body.profesor;
        o.precio = req.body.precio;
        o.nivel = req.body.nivel;
        o.lecciones = req.body.lecciones;
        o.horas = req.body.horas;
        o.puntuacion = req.body.puntuacion;
        o.img = nombreImg;
        o.imgNivel = icon;
        o.des = req.body.descripcion;
        o.idinput = nombreImg;
        break;
      }
    }

    fs.writeFileSync(cursoPath,JSON.stringify(curso,null," ")); // Se guarda los datos al JSON 
  
    res.redirect('/producto/cursos');
  },

  destroy: (req, res) => {

    let idCurso = req.params.id;
    let arrayCursos = curso.filter(function(elemento) {
      return elemento.id != idCurso;
    })

    fs.writeFileSync(cursoPath,JSON.stringify(arrayCursos,null," ")); 

    res.render('./products/cursos');
  },
};

module.exports = controlador;
