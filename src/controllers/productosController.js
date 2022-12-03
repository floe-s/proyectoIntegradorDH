const fs = require('fs');
const path = require('path');

const cursoPath = path.join(__dirname, '../data/cursosData.json'); // ruta del JSON
let curso = JSON.parse(fs.readFileSync(cursoPath, 'utf-8')); 
const { validationResult } = require('express-validator');

const db = require('../database/models');

const controlador = {
  
  cursos: (req, res) => {
    let usu=false
    let admi = false
    if(req.session.profile){
      usu =true;
      if(req.session.profile.Rol_id == 1){
        admi=true
      }
    } 

  db.Curso_dbs.findAll({include:[{association: 'usuario_Profe'},{association: 'nivel_curso'}]}).then((courses)=>{

      let listaCursos = [];
      let curso = [];
      
      for(g of courses){
        listaCursos.push(g);
        let profesor = g.usuario_Profe.nombre + ' ' + g.usuario_Profe.apellido;
        let obj = {
          nombre: g.nombre,
          descripcion: g.descripcion,
          estudiantes: g.estudiantes,
          lecciones: g.lecciones,
          puntuacion: g.puntuacion,
          cantidad_horas: g.cantidad_horas,
          precio: g.precio,
          imagen: g.imagen,
          img_nivel: g.img_nivel,
          Profesor_id: profesor,
          Nivel_curso_id: g.nivel_curso.nombre,
        }
        curso.push(obj)
      }

      res.render('./products/cursos', {ps:curso, usu:usu, admi:admi});
    }); 

  },

  cargar: (req, res) => {
    let usu=false
    let admi=false;
    if(req.session.profile){
           usu =true;
           if(req.session.profile.Rol_id == 1){
            admi=true
            res.render('./products/cargar',{usu:usu , admi:admi});
          }
    }
  },

  registrar: (req, res) => {

    let usu=false
    let admi = false
    if(req.session.profile){
      usu =true;
      if(req.session.profile.Rol_id == 1){
        admi=true
      }
    }

    let errors = validationResult(req);
        if( errors.isEmpty() ) {

    
    // llamamos el dato de la img de file que queremos 
    let nombreImg = req.file.filename;
    const fecha = new Date();

    let icon;
    let nivel
    if(req.body.nivel == "basico"){
      icon = "fire3.svg";
      nivel = 1;
    }else if(req.body.nivel == "intermedio"){
      icon = "fire2.svg";
      nivel = 2;
    }else{
      icon = "fire.svg"
      nivel = 3;
    }
    

    db.Curso_dbs.create({
      nombre: req.body.titulo,
      descripcion: req.body.descripcion,
      estudiantes: req.body.estudiantes,
      lecciones: req.body.lecciones,
      puntuacion: req.body.puntuacion,
      cantidad_horas: req.body.horas,
      precio: req.body.precio,
      fecha_creacion: fecha.toDateString(),
      fecha_modificacion: fecha.toDateString(),
      fecha_eliminacion: fecha.toDateString(),
      imagen: nombreImg,
      img_nivel: icon,
      Tematica_id: null,
      Administrador_id: 1,
      Profesor_id: req.body.profesor,
      Nivel_curso_id: nivel,
      Tipo_curso_id: null

    }).then(()=>{
        res.redirect('/producto/cursos');
    })

  } else {
      res.render('./products/cargar', {errors: errors.array(), usu:usu , admi:admi} ); 
  }
  },

  descargables: (req, res) => {
    let usu=false;
    let admi = false;
    if(req.session.profile){
           usu =true;
           if(req.session.profile.Rol_id == 1){
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
           if(req.session.profile.Rol_id == 1){
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
           if(req.session.profile.Rol_id == 1){
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
           if(req.session.profile.Rol_id == 1){
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
