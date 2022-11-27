const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const usuarioPath = path.join(__dirname, '../data/usuarioData.json');
const cursosPath = path.join(__dirname, '../data/cursosData.json');
let cursos = JSON.parse(fs.readFileSync(cursosPath, 'utf-8'));
let usuarios = JSON.parse(fs.readFileSync(usuarioPath, 'utf-8'));
const { validationResult } = require('express-validator');
const db = require('../database/models');


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

        let usu=false
        let admi =false;
        if(req.session.profile){
            usu =true;
            if(req.session.profile.Rol_id == 1){
                admi=true
            }
        }

        let errors = validationResult(req);
    
        if( errors.isEmpty() ) {

            let imgName = req.file.filename;
            let password = req.body.contrasena;
            let nuevaPasword = bcryptjs.hashSync(password, 10)
            const fecha = new Date();

            db.Usuario_dbs.create({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                clave: nuevaPasword,
                telefono: req.body.telefono,
                fecha_creacion: fecha.toDateString(),
                fecha_eliminacion: fecha.toDateString(),
                imagen: imgName,
                Rol_id: 3,
                Tematica_id: 1,
                Administrador_id: 1
            }).then((resul)=>{
                res.redirect('/usuario/login');
            })

        } else {
        console.log(errors.array())
            res.render('./users/registro', {errors: errors.array(), error:false, email: false, usu:usu, admi:admi } ); 
        }
    },

    login:(req,res) => {

            let usu=false
            let admi = false;
            if(req.session.profile){
                usu =true;
                if(req.session.profile.Rol_id == 1){
                    admi=true
                }
            }
            res.render('./users/login',{ error:false,usu:usu,admi:admi});
    },

    perfil:(req,res) => {

        let usu=false
        let admi =false;
        if(req.session.profile){
            usu =true;
            if(req.session.profile.Rol_id == 1){
                admi=true
            }
        }

        let errors = validationResult(req);
        if( errors.isEmpty() ) {

            let email=req.body.email

            db.Usuario_dbs.findAll().then((usuario)=>{
                let listaUsuarios=[];
                for(g of usuario){
                    listaUsuarios.push(g);
                }
    
                let usuarioInicio = listaUsuarios.find(usuario =>{
                    return usuario.email == email 
                    
                });
                

                req.session.profile = usuarioInicio;

                return res.redirect('/usuario/vista-perfil')
            });

        } else {
            res.render('./users/login', {errors: errors.array(), error:false, usu:usu, admi:admi } ); 
        }
    },

    vistaPerfil:(req,res)=>{
        let usu =false
        let admi = false;
        let cursoPresencal = cursos.filter(elemento =>{
            return elemento.curso == 'precencial';
        });

        let cursoVirtual = cursos.filter(elemento =>{
            return elemento.curso !== 'precencial';
        });

        if(req.session.profile){
            usu = true
            if(req.session.profile.Rol_id == 1){
                admi=true
            }
            res.render('users/perfil',{i:req.session.profile, usu:usu, admi:admi, cursosPre: cursoPresencal, cursoVirtual: cursoVirtual});
        }else {
            delete req.session.profile;
            
            res.redirect('/')
        }
    },
    vistaDatos:(req,res) =>{
        let usu =false
        let admi = false;
        if(req.session.profile){
            usu =true;
            if(req.session.profile.Rol_id == 1){
                admi=true
            }
            res.render('users/perfiles/mi-datos',{i:req.session.profile, usu:usu, admi:admi, cursos:cursos});
        }else {
            delete req.session.profile;
            
            res.redirect('/')
        }
    },

    visataAyuda:(req,res)=>{
        let usu =false
        let admi = false;
        if(req.session.profile){
            usu =true;
            if(req.session.profile.Rol_id == 1){
                admi=true
            }
            res.render('users/perfiles/ayuda',{i:req.session.profile, usu:usu, admi:admi, cursos:cursos});
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

        /* let errors = validationResult(req);
        if( errors.isEmpty() ) { */

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
    
        /* } else {
            res.render('./users/editar-usuario', {errors: errors.array(), error:false, usu:usu, admi:admi } ); 
        } */
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