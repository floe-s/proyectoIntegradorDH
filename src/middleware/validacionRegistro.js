const db = require('../database/models');


function validacionRegistro(req, res, next){

    db.Usuario_dbs.findAll().then((usuario)=>{
        let email = req.body.email;
        let listaUsuario = [];
        for(f of usuario){
            listaUsuario.push(f.email);
        }

        let registro = listaUsuario.find(usuarios => {
            return usuarios == email;
        });
        if(registro != undefined){   
            res.render('users/registro',{email: true, usu:false, admi:false, title: 'Registro'});
        }else{
           next();
        }
    })
}

module.exports = validacionRegistro;