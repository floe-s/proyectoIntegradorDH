const fs = require('fs');
const path = require('path');

const usuarioPath = path.join(__dirname, '../data/usuarioData.json');
const usuarios = JSON.parse(fs.readFileSync(usuarioPath, 'utf-8'));

const controller = {

    registro: (req,res) => {
        res.render('./users/registro');
    },

    // para crear registro
    registrar:(req, res)=>{
        //console.log(req.body)

        let idNuevo = 1;

        for(let s of usuarios){
            if(idNuevo == s.id){
                idNuevo = s.id
            }
        }

        idNuevo++;

        let usuarioNuevo ={
            id:idNuevo,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            contrasena: req.body.contrasena
        }

        usuarios.push(usuarioNuevo);

        fs.writeFileSync(usuarioPath,JSON.stringify(usuarios,null," "));
  
        res.redirect('/');
    },

    login:(req,res) => {
        res.render('./users/login');
    },

    logeado:(req,res) => {
        res.redirect('/usuario/login2');
    },

    perfil:(req,res) => {
        res.render('./users/perfil', {nombre: "Pepito"});
    },
    
    editar:(req,res) => {
        res.render('./users/editarUsuario');
    }
}


module.exports = controller;