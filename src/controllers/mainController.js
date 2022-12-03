const { json } = require('sequelize');
const db = require('../database/models');

const controller = {
        index: (req, res) => {
                let usu=false;
                let admi = false;
                if(req.session.profile){
                       usu =true;
                       if(req.session.profile.Rol_id == 1){
                        admi=true
                      }
                }
                res.render('index',{usu:usu, admi: admi});
                        
                
                
        },
        traductor: (req, res) => {
                let usu=false;
                let admi = false;
                if(req.session.profile){
                       usu =true;
                       if(req.session.profile.Rol_id == 1){
                        admi=true
                      }
                }
                res.render('./traductor',{usu:usu,admi:admi});
        },

        contacto: (req, res) => {
                let usu=false;
                let admi = false;
                if(req.session.profile){
                       usu =true;
                       if(req.session.profile.Rol_id == 1){
                        admi=true
                      }
                }

                db.Usuario_dbs.findAll({include:[{association: 'rol'}]}).then(usuarios =>{
                        let usuario= [];
                        let lista = [];
                        for(g of usuarios){
                           
                                let obj={
                                        nombre: g.nombre,
                                        email: g.email,
                                        rol: g.rol.nombre
                                }

                                usuario.push(obj);
                        }       
                        console.log(usuario);
                        res.render('./contacto',{usu:usu,admi:admi});
                });
       

        },


}

module.exports = controller;