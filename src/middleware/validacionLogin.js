const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');

function validacionLogin (req,res,next){
    const pathUsuario = path.join(__dirname, '../data/usuarioData.json');
    const usuario = JSON.parse(fs.readFileSync(pathUsuario,'utf-8'));

    let email = req.body.email;
    let password = req.body.password;

    let usuarioEncontrado = usuario.find(elemento =>{
        return (elemento.email == email && bcryptjs.compareSync(password,elemento.contrasena) == true);
    });
    

    if(usuarioEncontrado == undefined){
        
        res.render('users/login',{error: true, usu:false, admi:false});
        
    }else {
        next();
    }
}


module.exports= validacionLogin;
