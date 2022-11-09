const fs = require('fs');
const path = require('path');


function validacionRegitro(req, res, next){
    const pathUsuario = path.join(__dirname, '../data/usuarioData.json');
    const usuariosRegistrados = JSON.parse(fs.readFileSync(pathUsuario, 'utf-8'));

    let email = req.body.email;

    let registro = usuariosRegistrados.find(usuario =>{
        return usuario.email == email;
    });
    
    if(registro != undefined){   
        res.render('users/registro',{email: true,usu:false});
    }else{
       next();
    }
}

module.exports = validacionRegitro;