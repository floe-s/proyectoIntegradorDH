const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const { profile } = require('console');

const controller = {

    registro: (req,res) => {
        let usu = false
        let admi = false;
        if(req.session.profile){
               usu = true;
               if(req.session.profile.tipoUsuario == "admin"){
                admi = true
              }
        }
        res.render('./users/registro',{email: false,usu: usu, admi: admi, title: 'Registrarse'});
    },

    // para crear registro
    registrar:(req, res)=>{
        //console.log(req.body)

        let usu = false
        let admi = false;
        if(req.session.profile){
            usu = true;
            if(req.session.profile.Rol_id == 1){
                admi = true
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
            }).then(() => {
                res.redirect('/usuario/login');
            })

        } else {
        console.log(errors.array())
            res.render('./users/registro', {errors: errors.array(), error: false, email: false, usu: usu, admi: admi, title: 'Registrarse'}); 
        }
    },

    login:(req,res) => {

            let usu = false
            let admi = false;

            if(req.session.profile){
                usu = true;
                if(req.session.profile.Rol_id == 1 || req.session.profile.Rol_id == 4){
                    admi = true
                }
            }
            res.render('./users/login',{ error:false,usu: usu, admi: admi, title: 'Iniciar Sesión'});
    },

    perfil:(req,res) => {

        let usu = false
        let admi = false;
        if(req.session.profile){
            usu = true;
            if(req.session.profile.Rol_id == 1|| req.session.profile.Rol_id == 4){
                admi = true
            }
        }

        let errors = validationResult(req);
        if( errors.isEmpty() ) {

            let email = req.body.email

            db.Usuario_dbs.findAll().then((usuario) => {
                let listaUsuarios = [];
                for(g of usuario){
                    listaUsuarios.push(g);
                }
    
                let usuarioInicio = listaUsuarios.find(usuario => {
                    return usuario.email == email 
                    
                });
                

                req.session.profile = usuarioInicio;

                return res.redirect('/usuario/vista-perfil')
            });

        } else {
            res.render('./users/login', {errors: errors.array(), error: false, usu: usu, admi: admi, title: 'Iniciar Sesión'}); 
        }
    },

    vistaPerfil:(req,res)=>{
        let usu = false
        let admi = false;
   

        if(req.session.profile){
            usu = true
            if(req.session.profile.Rol_id == 1 || req.session.profile.Rol_id == 4){
                admi = true
                db.Usuario_dbs.findAll({include:[{association: 'tematicas'}]}).then((usuario) => {
                    let list = [];
                    let listaUSU = [];
                    for(g of usuario){
                        list.push(g);
                       
                        let obj = {
                            id: g.id,
                            nombre: g.nombre,
                            apellido: g.apellido,
                            rol: g.Rol_id,
                            email: g.email,
                            imagen: g.imagen,
                            tematica: g.tematicas.nombre
                        }
                        
                        listaUSU.push(obj);
                        
                    }
                    let listPro = listaUSU.filter(ele => {
                        return ele.rol == 2
                    });
                    
                    if(req.session.profile.Rol_id == 1){
                        db.Usuario_dbs.findAll().then((usu) => {
                            
                            
                            let enviar = [];
                            
                          
                            for(g of usu){
                                let obj = {
                                    id: g.id,
                                    nombre: g.nombre,
                                    apellido: g.apellido,
                                    rol: g.Rol_id,
                                    email: g.email,
                                    imagen: g.imagen,
                                }
                                
                                enviar.push(obj);
                            }

                            enviar = enviar.filter(ele =>{
                                return ele.rol !=1
                            })
                            let roli;
                            let cant = enviar.length
                            res.render('users/vista-admin',{i:req.session.profile, usu: usu, admi: admi, list: enviar, title: 'Perfil Administrador', titulo: roli,cantidad:cant});
                        })
                        
                    }else if(req.session.profile.Rol_id == 4){
                        res.render('users/administradores',{i: req.session.profile, usu: usu, admi: admi, list: listPro, title: 'Perfil Administrador'});
                    }
                   

                })
            
            }else if(req.session.profile.Rol_id == 3){

                db.Curso_dbs.findAll({include:[{association: 'usuario_Profe'},{association: 'nivel_curso'}]}).then((courses)=>{
                    let clase;
                    let listadoCursos = [];
                    for(g of courses){
                        let profesor = g.usuario_Profe.nombre + ' ' + g.usuario_Profe.apellido;

                        if(g.id%2 == 0){
                            clase = "virtual"
                        }else {
                            clase = "precensial"
                        }
                        let cur ={
                            titulo: g.nombre,
                            profesor: profesor,
                            nivel: g.nivel_curso.nombre,
                            img: g.imagen,
                            clase: clase

                        }

                        listadoCursos.push(cur);

                    }
                    let virtual = listadoCursos.filter(c =>{
                        return c.clase == "virtual"
                    })

                    let precensial = listadoCursos.filter(p =>{
                        return p.clase == "precensial"
                    })
                    res.render('users/perfil',{i: req.session.profile, usu: usu, admi: admi, title: 'Perfil',cursosPre: precensial,cursoVirtual:virtual });
                })
    
            }else if(req.session.profile.Rol_id == 2){
                db.Curso_dbs.findAll().then(cursos =>{
                    
                    let lisCurso = []
                    for(n of cursos){
                        let nivel ;
                        if(n.Nivel_curso_id == 1){
                            nivel = 'Basico';
                        }else if(n.Nivel_curso_id == 2){
                            nivel = 'Intermedio'
                        }else {
                            nivel = 'Avanzado'
                        }
                        let jet ={
                            titulo: n.nombre,
                            imagen: n.imagen,
                            profesor: n.Profesor_id,
                            nivel: nivel,
                            lecciones: n.lecciones,
                            horas: n.cantidad_horas,
                            puntuacion: n.puntuacion,
                            estudiantes: n.estudiantes
                        }

                        lisCurso.push(jet)
                    }
                    
                    let misCursos = lisCurso.filter(ele =>{
                        return req.session.profile.id == ele.profesor;
                    });

                    
                    res.render('users/vistaProfesores',{i:req.session.profile, usu:usu, admi:admi, cursos:misCursos, title: 'Perfil - Profesor'});
                })
            }

        } else {
            delete req.session.profile;
            
            res.redirect('/')
        }
    },
    vistaDatos:(req,res) => {
        let usu = false
        let admi = false;
        if(req.session.profile){
            usu = true;
            if(req.session.profile.Rol_id == 1 || req.session.profile.Rol_id == 4){
                admi = true
            }
            res.render('users/perfiles/mi-datos',{i: req.session.profile, usu: usu, admi: admi, title: 'Perfil - Mis Datos'});
        }else {
            delete req.session.profile;
            
            res.redirect('/')
        }
    },

    visataAyuda:(req,res)=>{
        let usu = false
        let admi = false;
        if(req.session.profile.Rol_id == 3 || req.session.profile.Rol_id == 2){
            usu = true;
            if(req.session.profile.Rol_id == 1){
                admi = true
            }
            res.render('users/perfiles/ayuda',{i: req.session.profile, usu: usu, admi: admi, title:'Perfil - Ayuda'});
        }else {
            delete req.session.profile;
            
            res.redirect('/')
        }
    },

    update: (req,res) => {
        let id = req.params.id;
        let imgName = req.file;
        if(imgName == undefined){
               
            let nombre = req.session.profile.nombre
            let apellido = req.session.profile.apellido
            let  email = req.session.profile.email
            let  telefono =  req.session.profile.telefono
            
            if(req.body.nombre != ""){
                nombre = req.body.nombre;
            }else if(req.body.apellido != ""){
                apellido = req.body.apellido
            }else if(req.body.email != ""){
                email = req.body.email
            }else if(req.body.telefono != ""){
                telefono = req.body.telefono
            }

            db.Usuario_dbs.update(
                {
                    nombre: nombre,
                    apellido:apellido,
                    email: email,
                    telefono:telefono,
                },
                {
                    where:{id}
                }
            ).then(()=> {
                req.session.profile.nombre = nombre;
                req.session.profile.apellido = apellido;
                req.session.profile.email = email;
                req.session.profile.telefono = telefono;
                res.redirect('/usuario/datosUsuario');
            })
        }else{
            let nombre = req.session.profile.nombre
            let apellido = req.session.profile.apellido
            let  email = req.session.profile.email
            let  telefono =  req.session.profile.telefono
            fs.unlinkSync(path.join(__dirname, './../../public/img/perfil', req.session.profile.imagen ));
            if(req.body.nombre != ""){
                nombre.req.body.nombre;
            }else if(req.body.apellido != ""){
                apellido = req.body.apellido
            }else if(req.body.email != ""){
                email = req.body.email
            }else if(req.body.telefono != ""){
                telefono = req.body.telefono
            }

            db.Usuario_dbs.update(
                {
                    nombre: nombre,
                    apellido:apellido,
                    email: email,
                    telefono:telefono,
                    imagen: imgName.filename
                },
                {
                    where:{id}
                }
            ).then(()=> {
                req.session.profile.nombre = nombre;
                req.session.profile.apellido = apellido;
                req.session.profile.email = email;
                req.session.profile.telefono = telefono;
                req.session.profile.imagen = imgName.filename
                res.redirect('/usuario/datosUsuario');
            })
        }
       

    },

    salir:(req,res)=>{
        let id = req.params.id
        if(id == "delete"){
            delete req.session.profile
            res.redirect('/')
        }
    },

    cargarProf:(req,res) => {
        let usu = false
        let admi = false;
        db.Tematicas.findAll().then((Tematicas) => {
            let listTema = []
            for(g of Tematicas){
                listTema.push(g);
            }
            if(req.session.profile){
                usu = true;
                if(req.session.profile.Rol_id == 1 || req.session.profile.Rol_id == 4){
                    admi = true
                }
                res.render('users/perfiles/cargarProfesor',{i: req.session.profile, usu: usu, admi: admi, tematicas: listTema, title:'Cargar Profesor'});
            }else {
                delete req.session.profile;
                
                res.redirect('/')
            }  
        })
    },

    registrarPro:(req,res) => {

            let imgName = req.file.filename;
            let password = req.body.clave;
            let nuevaPasword = bcryptjs.hashSync(password, 10)
            const fecha = new Date();

            db.Tematicas.findOne({where:{nombre: req.body.tematica}}).then((tematica) => {
               
                db.Usuario_dbs.create({
                    nombre: req.body.nombre.charAt(0).toUpperCase() + req.body.nombre.slice(1),
                    apellido: req.body.apellido.charAt(0).toUpperCase() + req.body.nombre.slice(1),
                    email: req.body.email,
                    clave: nuevaPasword,
                    telefono: req.body.telefono,
                    fecha_creacion: fecha.toDateString(),
                    fecha_eliminacion: fecha.toDateString(),
                    imagen: imgName,
                    Rol_id: 2,
                    Tematica_id: tematica.id,
                    Administrador_id: 1
                }).then((resul) => {
                    res.redirect('/usuario/vista-perfil');
                })
            });
    },

    eliminar:(req, res) => {
        let id = req.params.id;
        db.Usuario_dbs.findByPk(id).then((resultado) => {
            let name = resultado.imagen;
            fs.unlinkSync(path.join(__dirname, '../../public/img/perfil', name));
            db.Usuario_dbs.destroy({
                where:{id}
            }).then((re) => {
                res.redirect('/usuario/vista-perfil');
    
            });
        })
    },

    registrarAdministradores:(req,res) => {
        let usu = false
        let admi = false;
        if(req.session.profile.Rol_id == 1){
            usu = true
            admi = true;

            db.Rols.findAll().then((Tematicas) => {
                let listTema = []
                for(g of Tematicas){
                    listTema.push(g);
                }
                    res.render('users/perfiles/cargarAdministrador', {i: req.session.profile, usu: usu, admi: admi, rol: listTema, title:'Cargar Administrador'})
            })
            
        }
    },

    cargarAdmin:(req,res) => {
        
        let imgName = req.file.filename;
        let password = req.body.clave;
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
            Rol_id: 4,
            Tematica_id: 1,
            Administrador_id: 1
        }).then((el)=>{
            res.redirect('/usuario/vista-perfil')
        });
    },

    eliminarAdmin:(req,res) => {
        let id = req.params.id;
        db.Usuario_dbs.findByPk(id).then((resultado) => {
            let name = resultado.imagen;
            fs.unlinkSync(path.join(__dirname, '../../public/img/perfil', name));
            db.Usuario_dbs.destroy({
                where:{id}
            }).then((re) => {
                res.redirect('/usuario/vista-perfil');
            });
        })
    },

    agreRol:(req,res)=>{
        db.Rols.create({
            nombre: req.body.nombre
        }).then(()=>{
            res.redirect('/usuario/registrar-administradores');
        })
    },

    filtrar:(req,res)=>{
        let usu=false;
        let admi = false;
        if(req.session.profile){
               usu =true;
               if(req.session.profile.Rol_id == 1 || req.session.profile.Rol_id == 4){
                admi=true
              }
        }

        db.Usuario_dbs.findAll().then((ca) => {
                            
                            
            let enviar = [];
            
          
            for(g of ca){
                
                let obj = {
                    id: g.id,
                    nombre: g.nombre,
                    apellido: g.apellido,
                    rol: g.Rol_id,
                    email: g.email,
                    imagen: g.imagen,
                }
                
                enviar.push(obj);
            }
            let ides = req.body.roles;
            let listFiltRol = enviar.filter(elemento =>{
                return elemento.rol == parseInt(ides);
            })
            let roli ;
            console.log(ides)
            if(ides == 2){
                roli = "Profesores"
            }else if( ides == 3){
                roli = "Estudiantes"
            }else{
                roli = "Administrador"
            }
            let cant = listFiltRol.length
            
            res.render('users/vista-admin',{i:req.session.profile, usu: usu, admi: admi, list: listFiltRol, title: 'Perfil Administrador', titulo: roli, cantidad: cant});
        })
    }
    
}


module.exports = controller;