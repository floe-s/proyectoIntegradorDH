const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const usuarioPath = path.join(__dirname, '../data/usuarioData.json');
let usuarios = JSON.parse(fs.readFileSync(usuarioPath, 'utf-8'));

const controller = {

    registro: (req,res) => {
        let usu=false
        let admi =false;
        if(req.session.profile){
               usu =true;
               if(req.session.profile.tipoUsuario == "admin"){
                admi=true
              }
        }
        res.render('./users/registro',{email: false,usu:usu, admi:admi});
    },

    // para crear registro
    registrar:(req, res)=>{
        //console.log(req.body)

        let idNuevo = 0;

        for(let s of usuarios){
            if(idNuevo < s.id){
                idNuevo = s.id
            }
        }

        idNuevo++;

        
        let imgName = req.file.filename;
        let password = req.body.contrasena;
        let nuevaPasword = bcryptjs.hashSync(password, 10)

        let usuarioNuevo ={
            id:idNuevo,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            email: req.body.email,
            contrasena: nuevaPasword,
            img: imgName,
            tipoUsuario: "usuario"
        }

        usuarios.push(usuarioNuevo);

        fs.writeFileSync(usuarioPath,JSON.stringify(usuarios,null," "));
  
        res.redirect('/usuario/login');
    },

    login:(req,res) => {
        let usu=false
        let admi = false;
        if(req.session.profile){
               usu =true;
               if(req.session.profile.tipoUsuario == "admin"){
                admi=true
              }
        }
        res.render('./users/login',{ error:false,usu:usu,admi:admi});
    },


    perfil:(req,res) => {
        let email=req.body.email
        
        let usuarioInicio = usuarios.find(usuario =>{
            return usuario.email == email 
        });

        req.session.profile = usuarioInicio;
        
       
        res.redirect('/usuario/vista-perfil')
        
    },

    vistaPerfil:(req,res)=>{
        let usu =false
        let admi = false;
        if(req.session.profile){
            usu = true
            if(req.session.profile.tipoUsuario == "admin"){
                admi=true
            }
            res.render('users/perfil',{i:req.session.profile, usu:usu, admi:admi});
        }else {
            delete req.session.profile;
            
            res.redirect('/')
        }
    },
        
    
    
    editar:(req,res) => {
    
    let idus = req.params.id;
    let objUsuario;

    for(let o of usuarios) {
      if(idus == o.id) {
        objUsuario = o;
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
        res.render('./users/editar-usuario',{us: objUsuario,usu:usu,admi:admi});
    },

    update: (req,res) => {
        let idus = req.params.id;

        for(let o of usuarios) {
            if(idus == o.id) {
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
        fs.writeFileSync(usuarioPath,JSON.stringify(usuarios,null," ")); // Se guarda los datos al JSON 
    
        
    },

    salir:(req,res)=>{
        let id = req.params.id
        if(id == "delete"){
            delete req.session.profile
            res.redirect('/')
        }
    }
}


module.exports = controller;