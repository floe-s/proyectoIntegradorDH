const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const usuarioPath = path.join(__dirname, '../data/usuarioData.json');
let usuarios = JSON.parse(fs.readFileSync(usuarioPath, 'utf-8'));
const { validationResult } = require('express-validator');

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

        let errors = validationResult(req);
        if( errors.isEmpty() ) {

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

        } else {
            res.render('./users/registro', {errors: errors.array() } ); 
        }
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

    /* logueado: (req,res) => {

        

        let usu=false
        let admi = false;
        if(req.session.profile){
               usu =true;
               if(req.session.profile.tipoUsuario == "admin"){
                admi=true
              }
        }
        res.render('./users/login',{ error:false,usu:usu,admi:admi});

    

    }, */


    perfil:(req,res) => {

        let errors = validationResult(req);
        if( errors.isEmpty() ) {

        let email=req.body.email
        
        let usuarioInicio = usuarios.find(usuario =>{
            return usuario.email == email 
        });

        req.session.profile = usuarioInicio;
        
       
        res.redirect('/usuario/vista-perfil');

    } else {
        res.render('./users/login', {errors: errors.array() } ); 
    }
        
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
    
    let usu=false
    let admi = false;
    if(req.session.profile){
           usu =true;
           if(req.session.profile.tipoUsuario == "admin"){
            admi=true
          }
    }
        res.render('./users/editar-usuario',{i:req.session.profile,usu:usu,admi:admi});
    },

    update: (req,res) => {
        let idus = req.params.id;

        for(let o of usuarios) {
            if(idus == o.id) {
                o.nombre = req.body.nombres;
                o.apellido = req.body.estudiantes;
                o.email = req.body.profesor;
                o.telefono = req.body.precio;
                o.img = req.body.img
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