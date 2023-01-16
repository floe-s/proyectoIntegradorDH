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
                res.render('index', {usu: usu, admi: admi, title: 'MOIDI HOUSE'});       
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
                res.render('./traductor',{usu: usu,admi: admi, title: 'Traductor'});
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

               
                res.render('./contacto',{usu: usu,admi: admi, title: 'Contacto'});
        },
}

module.exports = controller;