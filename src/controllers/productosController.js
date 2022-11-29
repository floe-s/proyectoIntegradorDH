const fs = require('fs');
const path = require('path');

const cursoPath = path.join(__dirname, '../data/cursosData.json'); // ruta del JSON
let curso = JSON.parse(fs.readFileSync(cursoPath, 'utf-8')); 
const { validationResult } = require('express-validator');

//const db = require('../database/models');

const controlador = {
  
  cursos: (req, res) => {

// De los modelos que tengo, elegir curso. Traer todos los datos e incluir en la consulta la relacion con usuario (lo saca del alias)
    /* db.curso_db.findAll({include: [{association: 'Usuario_dbs'}]}).then((courses) => { 
      let listaCursos = [];

      for (course of courses) {
        listaCursos.push(course.nombre);
      }

      res.render('./products/cursos', {Allcursos: listaCursos});
    }); */


    let usu=false
    let admi = false
    if(req.session.profile){
      usu =true;
      if(req.session.profile.tipoUsuario == "admin"){
        admi=true
      }
    }
    curso = JSON.parse(fs.readFileSync(cursoPath, 'utf-8')); // El JSON vuelve a leer los datos
    res.render('./products/cursos', { ps: curso, usu:usu, admi:admi}); // Se cargan los nuevos datos en la vista
  },

  cargar: (req, res) => {
    let usu=false
    let admi=false;
    if(req.session.profile){
           usu =true;
           if(req.session.profile.tipoUsuario == "admin"){
            admi=true
          }
    }
    res.render('./products/cargar',{usu:usu , admi:admi});
  },

  registrar: (req, res) => {

    let usu=false
    let admi = false
    if(req.session.profile){
      usu =true;
      if(req.session.profile.tipoUsuario == "admin"){
        admi=true
      }
    }

    let errors = validationResult(req);
        if( errors.isEmpty() ) {

    let idNuevo = 1;

    for(let s of curso){
        if(idNuevo < s.id){
            idNuevo = s.id
        }
    }
    idNuevo++
    
    // llamamos el dato de la img de file que queremos 
    let nombreImg = req.file.filename;
    //const fecha = new Date();

    let icon;
    if(req.body.nivel == "basico"){
      icon = "fire3.svg";
    }else if(req.body.nivel == "intermedio"){
      icon = "fire2.svg"
    }else{
      icon = "fire.svg"
    }

   /*  db.Curso_dbs.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      cantidad_horas: req.body.horas,
      precio: req.body.precio,
      fecha_creacion: fecha.toDateString(),
      fecha_modificacion: fecha.toDateString(),
      fecha_eliminacion: fecha.toDateString(),
      imagen: imgName,
      Tematica_id: 1,
      Administrador_id: 1,
      Profesor_id: 2,
      Nivel_curso_id: 3,
      Tipo_curso_id: 2,

  }).then((resul)=>{
      res.redirect('/producto/cursos');
  }) */

    let productoNuevo ={
      id:idNuevo,
      titulo: req.body.titulo,
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

    } else {
            res.render('./products/cargar', {errors: errors.array(), usu:usu , admi:admi} ); 
        }
  },

  descargables: (req, res) => {
    let usu=false;
    let admi = false;
    if(req.session.profile){
           usu =true;
           if(req.session.profile.tipoUsuario == "admin"){
            admi=true
          }
    }
    res.render('./descargables',{usu:usu, admi:admi});
  },

  suscripciones: (req, res) => {
    let usu=false
    let admi = false;
    if(req.session.profile){
           usu =true;
           if(req.session.profile.tipoUsuario == "admin"){
            admi=true
          }
    }
    res.render('./suscripciones',{usu:usu, admi:admi});
  },

  carrito: (req, res) => {
    let usu=false;
    let admi = false;
    if(req.session.profile){
           usu =true;
           if(req.session.profile.tipoUsuario == "admin"){
            admi=true
          }
    }
    res.render('./carrito-compras',{usu:usu, admi:admi});
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
    let usu=false
    let admi = false;
    if(req.session.profile){
           usu =true;
           if(req.session.profile.tipoUsuario == "admin"){
            admi=true
          }
    }
    res.render('./products/editar', {ps: objCurso,usu:usu, admi:admi});
  },

  update: (req, res) => {

    let idCurso = req.params.id;
    let nombreImg = req.file.filename;
     
    // para elegir que icono usar;
    let icon;
    if(req.body.nivel == "basico"){
      icon = "fire3.svg";
    }else if(req.body.nivel == "intermedio"){
      icon = "fire2.svg"
    }else{
      icon = "fire.svg"
  
    }
  


    for(let o of curso) {
      if(idCurso == o.id) {
        o.titulo = req.body.titulo;
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
    let cursoEncontrado;

    let arrayCursos = curso.filter(function(elemento) {
      return elemento.id != idCurso;
    })

    for(let cursoss of curso){
      if(cursoss.id == idCurso){
        cursoEncontrado = cursoss;
      }
    }
    fs.unlinkSync(path.join(__dirname, '../../public/img/paises', cursoEncontrado.img));

    fs.writeFileSync(cursoPath,JSON.stringify(arrayCursos,null," ")); 

    res.redirect('/producto/cursos');
  },
};

module.exports = controlador;
