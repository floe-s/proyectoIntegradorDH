const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const db = require('../database/models');

const controlador = {
  
  cursos: (req, res) => {
    let usu=false
    let admi = false
    if(req.session.profile){
      usu =true;
      if(req.session.profile.Rol_id == 1 || req.session.profile.Rol_id == 4){
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
          id:g.id,
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

      res.render('./products/cursos', {ps:curso, usu:usu, admi:admi, title: 'Cursos'});
    }); 

  },

  cargar: (req, res) => {
    let usu=false
    let admi=false;
    if(req.session.profile){
           usu =true;
           if(req.session.profile.Rol_id == 1 || req.session.profile.Rol_id == 4){
            admi=true
            res.render('./products/cargar',{usu:usu , admi:admi, title: 'Cargar Curso'}); 
          }
    }
  },

  registrar: (req, res) => {

    let usu=false
    let admi = false
    if(req.session.profile){
      usu =true;
      if(req.session.profile.Rol_id == 1 || req.session.profile.Rol_id == 4){
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
      nombre: req.body.titulo.charAt(0).toUpperCase() + req.body.titulo.slice(1) ,
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
      res.render('./products/cargar', {errors: errors.array(), usu :usu , admi :admi, title: 'Cargar Curso'} ); 
  }
  },


  descargables: (req, res) => {
    let usu=false;
    let admi = false;
    if(req.session.profile){
           usu =true;
           if(req.session.profile.Rol_id == 1 || req.session.profile.Rol_id == 4){
            admi=true
          }
    }
    res.render('./descargables',{usu:usu, admi:admi, title: 'Descargables'});
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
    res.render('./suscripciones',{usu:usu, admi:admi, title: 'Suscripciones'});
  },

  carrito: (req, res) => {
    let usu=false;
    let admi = false;
    if(req.session.profile){
           usu =true;
           if(req.session.profile.Rol_id == 1 || req.session.profile.Rol_id == 4){
            admi=true
          }
    }
    res.render('./carrito-compras',{usu:usu, admi:admi, title: 'Carrito de Compras'});
  },

  edit: (req, res) => {

    let idCurso = req.params.id;
    let usu=false
    let admi = false;
    if(req.session.profile){
           usu =true;
           if(req.session.profile.Rol_id == 1 || req.session.profile.Rol_id == 4){
            admi=true
          }
    }

    db.Curso_dbs.findByPk(idCurso).then((curso)=>{
      res.render('./products/editar', {ps: curso,usu:usu, admi:admi, title: 'Editar Curso'});
    });

    
  },

  update: (req, res) => {

    let id = req.params.id;
    let nombreImg = req.file;
    let nombreImgagenes = req.body.imgenes
    // para elegir que icono usar;
    let icon;
    let nivel;
    if(req.body.nivel == "basico"){
      icon = "fire3.svg";
      nivel = 1
    }else if(req.body.nivel == "intermedio"){
      icon = "fire2.svg"
      nivel = 2
    }else{
      icon = "fire.svg"
      nivel = 3
    }
    if(nombreImg == undefined){
      db.Curso_dbs.update({
        nombre: req.body.titulo.charAt(0).toUpperCase() + req.body.titulo.slice(1),
        Profesor_id: req.body.profesor,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        cantidad_horas: req.body.horas,
        estudiantes: req.body.estudiantes,
        lecciones: req.body.lecciones,
        puntuacion: req.body.puntuacion,
        img_nivel: icon,
        nivel: nivel,
        imagen: nombreImgagenes
      },
      {
        where:{id}
      }
      ).then(()=>{
        res.redirect('/producto/cursos')
      })
    }else{
      db.Curso_dbs.update({
        nombre: req.body.titulo,
        Profesor_id: req.body.profesor,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        cantidad_horas: req.body.horas,
        estudiantes: req.body.estudiantes,
        lecciones: req.body.lecciones,
        puntuacion: req.body.puntuacion,
        img_nivel: icon,
        nivel: nivel,
        imagen: nombreImg.filename
      },
      {
        where:{id}
      }
      ).then(()=>{
        // fs.unlinkSync(`./public/img/paises/${nombreImgagenes}`);
        res.redirect('/producto/cursos')
      })
    }
      
    
    
  },

  destroy: (req, res) => {

    let id = req.params.id;

    db.Curso_dbs.findByPk(id).then((resul)=>{
      let name = resul.imagen;
      fs.unlinkSync(path.join(__dirname, '../../public/img/paises', name));
      db.Curso_dbs.destroy({
        where:{id}
      }).then(()=>{
        res.redirect('/producto/cursos')
      });
    });
  },


  tematica: (req,res)=>{
    db.Tematicas.findAll().then((el)=>{
      let list = [];
      let n = false;
      for(g of el){
        list.push(g.nombre)
      }
      for(p of list){
        if(req.body.tema == p){
          n = true
          break;
        }
      }
      if(n == false){
        db.Tematicas.create({
          nombre:req.body.tema
        }).then(()=>{
          res.redirect('/usuario/cargarProfesro');
        });
      }else{
        res.redirect('/usuario/cargarProfesro');
      }
    })
  },

  filtro:(req,res)=>{
    let buscar = req.body.search;

    let usu=false
    let admi = false;
    if(req.session.profile){
           usu =true;
           if(req.session.profile.Rol_id == 1 || req.session.profile.Rol_id == 4){
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
          id:g.id,
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
      let lista = [];
      curso.forEach(el =>{

        if(buscar.charAt(0) != buscar.charAt(0).toUpperCase()){
          buscar = buscar.charAt(0).toUpperCase() + buscar.slice(1);
        }
   
        let encotrado = el.nombre.indexOf(buscar)
        let nivel = el.Nivel_curso_id.indexOf(buscar);
        let profesro = el.Profesor_id.indexOf(buscar);
        // console.log(buscar == buscar.letra.toLowerCase())
        if(encotrado > -1){
          lista.push(el)
        }else if( nivel > -1){
          lista.push(el)
        }else if(profesro > -1){
          lista.push(el)
        }
        
      })
      // console.log(lista);
      res.render('products/filtroCurso', {ps:lista, usu:usu, admi:admi, title: 'Cursos'});
    }); 
  }

};

module.exports = controlador;
